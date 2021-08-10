import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Chatscreen from '../components/Chatscreen';
import Chatinput from '../components/Chatinput';
import FriendListScreen from '../components/FriendListScreen';
import { StoreContext } from '../store';
import WelcomeChatScreen from '../components/WelcomeChatScreen';
import socket, { initSocket } from '../utils/socket';

const Main = () => { 
    const { stateUser, stateActiveChat, dispatchActiveChat } = useContext(StoreContext);

    useEffect(() => {
        initSocket(stateUser);
        socket.on('private-message-incoming', ({from, message}) => {
            dispatchActiveChat({type: 'RECEIVE_CHAT', payload: {from, message}});
        });

    }, [])

    return (
        <div className="main">
            <Header />
            <Container>
                <Row>
                    <Col lg={3} className="py-3 chat-list-box">
                        <FriendListScreen />
                    </Col>
                    <Col lg={9}>
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
        </div>
    )
}

export default Main
