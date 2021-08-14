import React, { useContext, useRef, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Chatitem from './Chatitem'
import { StoreContext } from '../store'

const Chatscreen = () => {
    const { stateActiveChat } = useContext(StoreContext);
    const { user } = stateActiveChat;
    const chatScreenRef = useRef(null);
    
    useEffect(() => {
        chatScreenRef.current?.scrollIntoView();
    }, [stateActiveChat]);

    return (
        <div className="py-2 chat-screen">
            {
                stateActiveChat.chatList.map((item, idxChat) => (
                    <Row key={idxChat} ref={chatScreenRef}>
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
