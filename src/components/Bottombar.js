import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const Bottombar = () => {
    return (
        <div className="bottom-bar d-block d-md-none d-lg-none">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <LinkContainer exact to="/">
                                <Nav.Link className="px-2 d-flex flex-column align-items-center justify-content-end">
                                    <i className="far fa-comment-dots"></i>
                                    <span>Chat</span>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer exact to="/community">
                                <Nav.Link className="px-2 d-flex flex-column align-items-center justify-content-end">
                                    <i className="fas fa-users"></i>
                                    <span>Community</span>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer exact to="/profile">
                                <Nav.Link className="px-2 d-flex flex-column align-items-center justify-content-end">
                                    <i className="fas fa-user"></i>
                                    <span>Profile</span>
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Bottombar
