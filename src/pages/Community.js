import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FriendCardItem from '../components/FriendCardItem'
import Header from '../components/Header'

const Community = () => {
    const [friendList, setFriendList] = useState([
        {
            id: 1,
            email: 'uchihatachi@mail.com',
            name: 'uchiha itachi'
        },
        {
            id: 2,
            email: 'uchihaobito@mail.com',
            name: 'uchiha obito'
        },
        {
            id: 3,
            email: 'uchihamadara@mail.com',
            name: 'uchiha madara'
        },
        {
            id: 4,
            email: 'gara@mail.com',
            name: 'gaara'
        }
    ])

    return (
        <div className="main">
            <Header />
            <Container>
                <Row className="my-4 community-box">
                    <Col sm={12} md={12} lg={12} className="text-center">
                        <h5>My Friends</h5>
                    </Col>
                    <Col className="py-2">
                        <Row>
                            {
                                friendList.map((friend, idxFriend) => (
                                    <Col key={idxFriend} sm={12} md={6} lg={3} className="my-2">
                                        <FriendCardItem data={friend} isFriend={true} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
                <Row className="my-4 community-box">
                    <Col sm={12} md={12} lg={12} className="text-center">
                        <h5>Find Friends</h5>
                    </Col>
                    <Col className="py-2">
                        <Row>
                            {
                                friendList.map((friend, idxFriend) => (
                                    <Col key={idxFriend} sm={12} md={6} lg={3} className="my-2">
                                        <FriendCardItem data={friend} isFriend={false} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Community
