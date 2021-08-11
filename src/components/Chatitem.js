import React, { useContext } from 'react'
import { Image } from 'react-bootstrap'
import { StoreContext } from '../store'
import url from '../utils/url'

const Chatitem = ({data, friend}) => {
    const { stateUser } = useContext(StoreContext);
    const avatarPath = url.uploads + friend.avatar;

    if (data.user_email === stateUser.email) {
        return (
            <div className="d-flex justify-content-end">
                <span className="chat-item-text">
                    {data.text}
                </span>
            </div>
        )
    }

    return (
        <div className="d-flex">
            <span className="chat-item-pict mt-1">
                {friend.avatar ? <Image className="img-cover rounded-circle" src={avatarPath} /> : ''}
            </span>
            <div className="d-flex flex-column">
                <span>{data.user_name}</span>
                <span className="chat-item-text">
                    {data.text}
                </span>
            </div>
        </div>
    )
}

export default Chatitem
