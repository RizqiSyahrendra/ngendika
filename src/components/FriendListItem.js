import React from 'react'
import { Badge, Image } from 'react-bootstrap'
import url from '../utils/url'

const FriendListItem = ({data, isActive, onClick}) => {
    const avatarPath = url.uploads + data.avatar;

    return (
        <div className={`d-flex chat-list-item ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="chat-item-pict mt-1">
                {data.avatar ? <Image className="img-cover rounded-circle" src={avatarPath} /> : ''}
            </span>
            <div className="d-flex flex-column flex-wrap ps-1 justify-content-center">
                <span>{data.name}</span>
                <span className="mail">{data.email}</span>
            </div>
            <div className="pl-2">
                {data.unread_chat > 0 ? <Badge bg="danger">{data.unread_chat}</Badge> : ''}
            </div>
        </div>
    )
}

export default FriendListItem
