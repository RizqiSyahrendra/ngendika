import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Chatitem from './Chatitem'

const Chatscreen = ({data}) => {

    return (
        <div className="py-4 chat-screen">
        {
            data.map((item, idxChat) => (
                <Row key={idxChat}>
                    <Col sm={12} md={12} lg={12} className="px-3 py-1 my-1">
                        <Chatitem data={item} />
                    </Col>
                </Row>
            ))
        }
        </div>
    )
}

export default Chatscreen
