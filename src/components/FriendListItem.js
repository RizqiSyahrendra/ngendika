import React from 'react'


const FriendListItem = ({data, isActive, onClick}) => {

    return (
        <div className={`d-flex chat-list-item ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="chat-item-pict mt-1">
            </span>
            <div className="d-flex ps-1 align-items-center">
                <span>{data.name}</span>
            </div>
        </div>
    )
}

export default FriendListItem
