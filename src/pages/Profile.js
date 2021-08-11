import React, { useRef, useState } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import Header from '../components/Header'

const Profile = () => {
    const inputProfileImg = useRef(null);
    const [profileImg, setProfileImg] = useState('/logo512.png');

    return (
        <div className="main">
            <Header />
                <Container>
                    <Row>
                        <Col sm={12} md={12} lg={12} className="text-center py-4">
                            <div className="profile-img-container rounded-circle">
                                <input ref={inputProfileImg} type="file" className="profile-img-button" onChange={e => setProfileImg(URL.createObjectURL(e.target.files[0]))}></input>
                                <Image className="img-cover" onClick={e => inputProfileImg.current.click()} src={profileImg} roundedCircle fluid />
                            </div>
                        </Col>
                    </Row>
                </Container>
        </div>
    )
}

export default Profile
