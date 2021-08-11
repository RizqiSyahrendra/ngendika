import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Chatscreen from '../components/Chatscreen';
import Chatinput from '../components/Chatinput';
import FriendListScreen from '../components/FriendListScreen';
import { StoreContext } from '../store';
import WelcomeChatScreen from '../components/WelcomeChatScreen';

const Main = () => { 
    const { stateActiveChat } = useContext(StoreContext);

    return (
        <div className="main">
            <Container>
                <Row>
                    <Col lg={3} className="py-2 chat-list-box">
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
