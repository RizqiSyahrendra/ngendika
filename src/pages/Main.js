import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import React, { useState, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Chatscreen from '../components/Chatscreen';
import Chatinput from '../components/Chatinput';
import FriendListScreen from '../components/FriendListScreen';
import { StoreContext } from '../store';
import WelcomeChatScreen from '../components/WelcomeChatScreen';

const Main = () => { 
    const { stateActiveChat } = useContext(StoreContext);
    
    return (
        <Container>
            <Row>
                <Col sm={12} md={3} lg={3} className={`py-1 chat-list-box ${stateActiveChat.user.id ? 'd-none d-md-block d-lg-block' : 'd-block d-md-block d-lg-block'}`}>
                    <FriendListScreen />
                </Col>
                <Col sm={12} md={9} lg={9} className={stateActiveChat.user.id ? 'd-block d-md-block d-lg-block' : 'd-none d-md-block d-lg-block'}>
                    {
                        stateActiveChat.user.id === 0 ? (
                            <WelcomeChatScreen />
                        ) : (
                            <>
                                <Chatscreen />
                                <Chatinput />
                            </>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Main
