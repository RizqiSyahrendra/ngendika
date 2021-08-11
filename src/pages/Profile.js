import axios from 'axios'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Image, Row, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { StoreContext } from '../store'
import errorMessage from '../utils/errorMessage'
import url from '../utils/url'

const Profile = () => {
    const inputProfileImg = useRef(null);
    const [profileImg, setProfileImg] = useState('/logo512.png');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { stateUser, dispatchUser } = useContext(StoreContext);

    useEffect(() => {
        setEmail(stateUser.email);
        setName(stateUser.name);
    }, [stateUser]);

    const onClickSaveProfile = async () => {
        try {
            const { data } = await axios.put(url.put_auth_update, {
                token: stateUser.access_token,
                name: name
            });

            dispatchUser({type: 'CHANGE_PROFILE', payload: {name}});
            toast.success(data.message);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const onSaveProfile = () => {

    }

    return (
        <div className="main">
            <Header />
                <Container className="py-3">
                    <Row>
                        <Col sm={12} md={12} lg={12} className="text-center py-4">
                            <div className="profile-img-container rounded-circle">
                                <input ref={inputProfileImg} type="file" className="profile-img-button" onChange={e => setProfileImg(URL.createObjectURL(e.target.files[0]))}></input>
                                <Image className="img-cover" onClick={e => inputProfileImg.current.click()} src={profileImg} roundedCircle fluid />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6} lg={6} className="profile-box mx-auto">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={email} readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                                </Form.Group>
                                <div>
                                    <Button variant="primary" onClick={onClickSaveProfile}>
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col sm={12} md={6} lg={6} className="profile-box mx-auto">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" placeholder="Enter confirmation password" onChange={e => setConfirmPassword(e.target.value)} />
                                </Form.Group>
                                <div>
                                    <Button variant="primary" onClick={onSaveProfile}>
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        </div>
    )
}

export default Profile
