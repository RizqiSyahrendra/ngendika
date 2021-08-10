import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FriendCardItem from '../components/FriendCardItem'
import Header from '../components/Header'
import url from '../utils/url'
import { StoreContext } from '../store'

const Community = () => {
    const { stateUser } = useContext(StoreContext);
    const [friendList, setFriendList] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);
    const [friendSuggestion, setFriendSuggestion] = useState([]);

    const loadFriends = async () => {
        try {
            const {data} = await axios.post(url.post_friend, {token: stateUser.access_token});
            setFriendList([...data.data]);
        } catch (error) {
            const {data} = error.response;
            const errMessage = data.message ? data.message : error.message;
            console.error(errMessage)
        }
    }

    const loadFriendSuggestion = async () => {
        try {
            const {data} = await axios.post(url.post_friend_suggestion, {token: stateUser.access_token});
            setFriendSuggestion([...data.data]);
        } catch (error) {
            const {data} = error.response;
            const errMessage = data.message ? data.message : error.message;
            console.error(errMessage)
        }
    }

    const loadFriendRequest = async () => {
        try {
            const {data} = await axios.post(url.post_friend_request, {token: stateUser.access_token});
            setFriendRequest([...data.data]);
        } catch (error) {
            const {data} = error.response;
            const errMessage = data.message ? data.message : error.message;
            console.error(errMessage)
        }
    }

    const cbAddFriend = (id) => {
        setFriendSuggestion([...friendSuggestion.filter(x => x.id !== id)]);
    }

    const cbRemoveFriend = (id) => {
        setFriendList([...friendRequest.filter(x => x.id !== id)]);
    }

    useEffect(() => {
        loadFriends();
        loadFriendSuggestion();
        loadFriendRequest();
    }, []);

    return (
        <div className="main">
            <Header />
            <Container>
                <Row>
                    <Col sm={12} md={2} lg={3} className="pt-4 pe-4">
                        <Row className="community-box">
                            <Col sm={12} md={12} lg={12} className="text-center">
                                <h5>Friend Request</h5>
                            </Col>
                            {
                                friendRequest.map((friend, idxFriend) => (
                                    <Col key={idxFriend} sm={12} md={12} lg={12} className="my-2">
                                        <FriendCardItem data={friend} friendRequest={true} callback={cbRemoveFriend}  />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                    <Col sm={12} md={10} lg={9}>
                        <Row className="my-4 community-box">
                            <Col sm={12} md={12} lg={12} className="text-center">
                                <h5>My Friends</h5>
                            </Col>
                            <Col className="py-2">
                                <Row>
                                    {
                                        friendList.map((friend, idxFriend) => (
                                            <Col key={idxFriend} sm={12} md={6} lg={4} className="my-2">
                                                <FriendCardItem data={friend} isFriend={true} callback={cbRemoveFriend} />
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
                                        friendSuggestion.map((friend, idxFriend) => (
                                            <Col key={idxFriend} sm={12} md={6} lg={4} className="my-2">
                                                <FriendCardItem data={friend} isFriend={false} callback={cbAddFriend} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Community
