import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row, InputGroup, Form, Button } from 'react-bootstrap'
import FriendCardItem from '../components/FriendCardItem'
import url from '../utils/url'
import { StoreContext } from '../store'
import errorMessage from '../utils/errorMessage'

const Community = () => {
    const { stateUser, dispatchActiveChat } = useContext(StoreContext);
    const [friendList, setFriendList] = useState([]);
    const [friendRequest, setFriendRequest] = useState([]);
    const [friendSuggestion, setFriendSuggestion] = useState([]);
    const [sFriend, setSFriend] = useState('');
    const [sFriendSug, setSFriendSug] = useState('');

    const loadFriends = async () => {
        try {
            const {data} = await axios.post(url.post_friend, {
                token: stateUser.access_token,
                s: sFriend,
                from: 0,
                size: parseInt(process.env.REACT_APP_FRIEND_LIMIT)
            });
            setFriendList([...data.data]);
        } catch (error) {
            console.error(errorMessage(error));
        }
    }

    const loadFriendSuggestion = async () => {
        try {
            const {data} = await axios.post(url.post_friend_suggestion, {
                token: stateUser.access_token,
                s: sFriendSug,
                from: 0,
                size: parseInt(process.env.REACT_APP_FRIEND_LIMIT)
            });
            setFriendSuggestion([...data.data]);
        } catch (error) {
            console.error(errorMessage(error));
        }
    }

    const loadFriendRequest = async () => {
        try {
            const {data} = await axios.post(url.post_friend_request, {token: stateUser.access_token});
            setFriendRequest([...data.data]);
        } catch (error) {
            console.error(errorMessage(error));
        }
    }

    const cbAddFriend = (id) => {
        setFriendSuggestion([...friendSuggestion.filter(x => x.id !== id)]);
    }

    const cbRemoveFriend = (id) => {
        setFriendList([...friendList.filter(x => x.id !== id)]);
    }

    const cbFriendRequest = (id, type) => {
        let selected = [...friendRequest.filter(x => x.id === id)];

        if (type === 'confirm') {
            setFriendList([...friendList, selected[0]]);
        }
        else if (type === 'deny') {
            setFriendSuggestion([...friendSuggestion, selected[0]]);
        }

        setFriendRequest([...friendRequest.filter(x => x.id !== id)]);
    }

    useEffect(() => {
        loadFriends();
        loadFriendSuggestion();
        loadFriendRequest();
        dispatchActiveChat({type: 'CLEAR_ALL_CHAT'});
    }, []);

    const onSearch = () => {
        loadFriends();
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }

    const onSearchFriends = () => {
        loadFriendSuggestion();
    }

    const handleEnterSearchFriends = (e) => {
        if (e.key === 'Enter') {
            onSearchFriends();
        }
    }

    return (
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
                                    <FriendCardItem data={friend} friendRequest={true} callback={cbFriendRequest}  />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
                <Col sm={12} md={10} lg={9}>
                    <Row className="my-4 community-box">
                        <Col sm={12} md={12} lg={12} className="text-center">
                            <h5>My Friends</h5>
                            <InputGroup className="d-none d-md-flex d-lg-flex w-25 ms-auto">   
                                <Form.Control onChange={e => setSFriend(e.target.value)} onKeyUp={handleEnterSearch} className="search-community" type="text" placeholder="search here" />
                                <Button onClick={onSearch}>
                                    <i className="fas fa-search"></i>
                                </Button> 
                            </InputGroup>
                            <InputGroup className="d-flex d-md-none d-lg-none">   
                                <Form.Control onChange={e => setSFriend(e.target.value)} onKeyUp={handleEnterSearch} className="search-community" type="text" placeholder="search here" />
                                <Button onClick={onSearch}>
                                    <i className="fas fa-search"></i>
                                </Button> 
                            </InputGroup>
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
                            <InputGroup className="d-none d-md-flex d-lg-flex w-25 ms-auto">   
                                <Form.Control onChange={e => setSFriendSug(e.target.value)} onKeyUp={handleEnterSearchFriends} className="search-community" type="text" placeholder="search here" />
                                <Button onClick={onSearchFriends}>
                                    <i className="fas fa-search"></i>
                                </Button> 
                            </InputGroup>
                            <InputGroup className="d-flex d-md-none d-lg-none">   
                                <Form.Control onChange={e => setSFriendSug(e.target.value)} onKeyUp={handleEnterSearchFriends} className="search-community" type="text" placeholder="search here" />
                                <Button onClick={onSearchFriends}>
                                    <i className="fas fa-search"></i>
                                </Button> 
                            </InputGroup>
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
    )
}

export default Community
