import React, { useContext } from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { StoreContext } from '../store'

const Header = () => {
    const { dispatchUser, dispatchActiveChat } = useContext(StoreContext);

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
                    <Nav className="ms-auto">
                        <Button size="sm" variant="danger" onClick={onClickLogout}>Sign Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
