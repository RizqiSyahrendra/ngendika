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
    const [profileImgObj, setProfileImgObj] = useState(null);
    const [oldProfileImg, setOldProfileImg] = useState('/logo512.png');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { stateUser, dispatchUser } = useContext(StoreContext);

    useEffect(() => {
        setEmail(stateUser.email);
        setName(stateUser.name);

        if (stateUser.avatar) {
            setProfileImg(url.uploads + stateUser.avatar);
        }
    }, [stateUser]);

    useEffect(() => {
        if (stateUser.avatar) {
            setOldProfileImg(url.uploads + stateUser.avatar);
        }
    }, []);

    const handleChangeImage = (e) => {
        setProfileImg(URL.createObjectURL(e.target.files[0]));
        setProfileImgObj(e.target.files[0]);
    }

    const onClickSaveProfile = async () => {
        try {
            const fd = new FormData();
            fd.append('token', stateUser.access_token);
            fd.append('name', name);
            if (profileImg !== oldProfileImg) {
                fd.append('avatar', profileImgObj);
            }

            const { data } = await axios.put(url.put_auth_update, fd);

            dispatchUser({type: 'CHANGE_PROFILE', payload: {...data.data}});
            toast.success(data.message);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const onSaveProfile = async () => {
        try {
            const { data } = await axios.put(url.put_auth_update_pw, {
                token: stateUser.access_token, 
                old_password: oldPassword,
                new_password: password,
                new_password_confirm: confirmPassword
            });
            
            toast.success(data.message);
            clearInputPassword();
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const clearInputPassword = () => {
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="main">
            <Header />
                <Container className="py-3">
                    <Row>
                        <Col sm={12} md={12} lg={12} className="text-center py-4">
                            <div className="profile-img-container rounded-circle">
                                <input ref={inputProfileImg} type="file" className="profile-img-button" onChange={handleChangeImage}></input>
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
                                    <Form.Label>Old Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter old password" onChange={e => setOldPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>New Password Confirmation</Form.Label>
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
