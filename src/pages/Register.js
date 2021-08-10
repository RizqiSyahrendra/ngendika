import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form, Row, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import url from '../utils/url'
import errorMessage from '../utils/errorMessage'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onClickLogin = async () => {
        try {
            const dataRegister = {
                email,
                name,
                password,
                confirm_password: confirmPassword,
                token: process.env.REACT_APP_API_SECRET
            };  

            const {data} = await axios.post(url.post_auth_register, dataRegister);
            toast.success(data.message);
            clearInput();
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const clearInput = () => {
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="main">
            <Container className="py-5">
                <Row>
                    <h1 className="text-center">Ngendika</h1>
                </Row>
                <Row>
                    <Col className="authbox mx-auto" sm={6} md={6} lg={6}>
                        <h3 className="text-center my-3">Sign Up</h3>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" placeholder="Password Confirmation" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                            <div>
                                <Button variant="secondary" type="button" onClick={onClickLogin}>
                                    Sign Up
                                </Button>
                            </div>
                            <div className="mt-4 auth-bottom-text d-flex flex-column align-items-center">
                                <span>Already have an account ?</span>
                                <span>
                                    Sign In &nbsp;
                                    <Link to="/signin">here</Link>
                                </span>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
