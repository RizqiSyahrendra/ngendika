import React, { useContext } from 'react'
import { Container, Navbar, Image, Nav } from 'react-bootstrap'
import { StoreContext } from '../store'
import url from '../utils/url'

const HeaderChatRoom = () => {
    const { stateActiveChat, dispatchActiveChat } = useContext(StoreContext);
    const avatarPath = url.uploads + stateActiveChat.user.avatar;

    const clickBack = () => {
        dispatchActiveChat({type: 'CLEAR_ALL_CHAT'});
    }

    return (
        <Navbar sticky="top" bg="dark" variant="dark" className={stateActiveChat.user.id ? 'd-flex d-md-none d-lg-none' : 'd-none'}>
            <Container>
                <Nav>
                    <div className="d-flex navbar-user-item">
                        <span className="d-flex align-items-center me-2 btn-back" onClick={clickBack}>
                            <i className="fas fa-arrow-left"></i>
                        </span>
                        <span className="chat-item-pict mt-1">
                            {stateActiveChat.user.avatar ? <Image className="img-cover rounded-circle" src={avatarPath} /> : ''}
                        </span>
                        <div className="d-flex flex-column flex-wrap ps-1 justify-content-center">
                            <span>{stateActiveChat.user.name}</span>
                        <span className="mail">{stateActiveChat.user.email}</span>
                        </div>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default HeaderChatRoom
