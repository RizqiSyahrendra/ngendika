import React, { useState, useContext } from 'react'
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { StoreContext } from '../store'

const Chatinput = ({socket}) => {
    const { stateUser, dispatchActiveChat } = useContext(StoreContext);
    const [message, setMessage] = useState('');

    const submitMessage = () => {
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
                        Send
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    )
}

export default Chatinput
