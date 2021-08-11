import React, { useContext } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { StoreContext } from '../store'

const Header = () => {
    const { stateUser, dispatchUser, dispatchActiveChat } = useContext(StoreContext);

    const onClickLogout = () => {
        dispatchUser({type: 'LOGOUT'});
        dispatchActiveChat({type: 'CLEAR_ALL_CHAT'});
    }

    return (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    Ngendika
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto navbar-center">
                        <LinkContainer exact to="/">
                            <Nav.Link className="px-2 d-flex flex-column align-items-center">
                                <i class="far fa-comment-dots"></i>
                                <span>Chat</span>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/community">
                            <Nav.Link className="px-2 d-flex flex-column align-items-center">
                                <i class="fas fa-users"></i>
                                <span>Community</span>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/profile">
                            <Nav.Link className="px-2 d-flex flex-column align-items-center">
                                <i class="fas fa-user"></i>
                                <span>Profile</span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={`Hi, ${stateUser.name}`} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={onClickLogout}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
