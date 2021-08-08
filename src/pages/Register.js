import React from 'react'
import { Container, Form, Row, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Register = () => {

    const onClickLogin = () => {
        console.log('as');
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
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" placeholder="Password Confirmation" />
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
