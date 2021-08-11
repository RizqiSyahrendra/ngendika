import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Container, Form, Row, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StoreContext } from '../store'
import url from '../utils/url'
import errorMessage from '../utils/errorMessage'

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { stateUser, dispatchUser } = useContext(StoreContext);

    const onClickLogin = async () => {
        const dataLogin = {
            email: email,
            password: password,
            token: process.env.REACT_APP_API_SECRET
        };

        try {
            const {data} = await axios.post(url.post_auth_login, dataLogin);
            dispatchUser({type: 'LOGIN', payload: data.data});
            clearInput();
        } catch (error) {
            toast.error(errorMessage(error));
        }

    }

    const clearInput = () => {
        setEmail("");
        setPassword("");
    }

    if (stateUser.access_token) {
        history.push('/');
    }

    return (
        <div className="main">
            <Container className="py-5">
                <Row>
                    <h1 className="text-center login-heading-text">Ngendika</h1>
                </Row>
                <Row>
                    <Col className="authbox mx-auto" sm={6} md={6} lg={6}>
                        <h3 className="text-center my-3">Sign In</h3>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <div>
                                <Button variant="primary" onClick={onClickLogin}>
                                    Sign In
                                </Button>
                            </div>
                            <div className="mt-4 auth-bottom-text d-flex flex-column align-items-center">
                                <span>Do not have an account yet ?</span>
                                <span>
                                    Sign Up &nbsp;
                                    <Link to="/signup">here</Link>
                                </span>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
