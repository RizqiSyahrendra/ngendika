import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import Chatitem from './Chatitem'
import { StoreContext } from '../store'

const Chatscreen = () => {
    const { stateActiveChat } = useContext(StoreContext);
    const { user } = stateActiveChat;

    return (
        <div className="py-4 chat-screen">
        {
            stateActiveChat.chatList.map((item, idxChat) => (
                <Row key={idxChat}>
                    <Col sm={12} md={12} lg={12} className="px-3 py-1 my-1">
                        <Chatitem data={item} friend={user} />
                    </Col>
                </Row>
            ))
        }
        </div>
    )
}

export default Chatscreen
