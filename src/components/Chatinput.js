import React, { useState, useContext } from 'react'
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { StoreContext } from '../store'
import url from '../utils/url'
import axios from 'axios'
import { toast } from 'react-toastify'
import errorMessage from '../utils/errorMessage'

const Chatinput = () => {
    const { stateUser, stateActiveChat, dispatchActiveChat } = useContext(StoreContext);
    const [message, setMessage] = useState('');

    const submitMessage = () => {
        saveChat();
        dispatchActiveChat({type: 'SEND_CHAT', payload: {
            user: {...stateUser},
            message
        }});
        setMessage('');
    }
    
    const onEnter = (e) => {
        if (e.key === 'Enter') {
            submitMessage();
        }
    }

    const saveChat = async () => {
        try {
            await axios.post(url.post_chat_add, {
                token: stateUser.access_token,
                friend_id: stateActiveChat.user.id,
                message: message
            });
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    return (
        <Row className="my-2 px-2">
            <Col>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Write message here"
                        aria-label="Write message here"
                        aria-describedby="basic-addon2"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyUp={onEnter}
                    />
                    <Button onClick={submitMessage} variant="primary" id="button-addon2">
                        <i class="fas fa-paper-plane"></i>
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    )
}

export default Chatinput
