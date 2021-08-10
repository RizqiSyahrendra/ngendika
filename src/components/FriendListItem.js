import React from 'react'


const FriendListItem = ({data, isActive, onClick}) => {

    return (
        <div className={`d-flex chat-list-item ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="chat-item-pict mt-1">
            </span>
            <div className="d-flex flex-column flex-wrap ps-1 justify-content-center">
                <span>{data.name}</span>
            <span className="mail">{data.email}</span>
            </div>
        </div>
    )
}

export default FriendListItem
