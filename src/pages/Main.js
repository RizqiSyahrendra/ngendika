import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Chatscreen from '../components/Chatscreen';
import Chatinput from '../components/Chatinput';
import FriendListScreen from '../components/FriendListScreen';
import { io } from 'socket.io-client';
import { StoreContext } from '../store';
import WelcomeChatScreen from '../components/WelcomeChatScreen';

const socket = io("ws://localhost:5000", {transports: ["websocket", "polling"], autoConnect: false});
socket.on("connect_error", () => {
    console.error('failed to connect ws server');
    socket.io.opts.transports = ["polling", "websocket"];
});

const Main = () => { 
    const { stateActiveChat } = useContext(StoreContext);

    return (
        <div className="main">
            <Header />
            <Container>
                <Row>
                    <Col lg={3} className="py-3 chat-list-box">
                        <FriendListScreen socket={socket} />
                    </Col>
                    <Col lg={9}>
                        {
                            stateActiveChat.user.id === 0 ? (
                                <WelcomeChatScreen />
                            ) : (
                                <>
                                    <Chatscreen socket={socket} />
                                    <Chatinput socket={socket} />
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
