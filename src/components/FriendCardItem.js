import React from 'react'
import { Button } from 'react-bootstrap'


const FriendCardItem = ({data, isFriend}) => {

    return (
        <div className="d-flex person-item flex-wrap">
            <span className="chat-item-pict mt-1">
            </span>
            <div className="d-flex flex-column flex-fill px-2">
                <span>{data.name}</span>
                <span className="mail">{data.email}</span>
                <div className="align-self-end pt-2">
                    {isFriend ? <Button size="sm" variant="danger">Remove</Button> : <Button size="sm" variant="primary">Add</Button>}
                </div>
            </div>
        </div>
    )
}

export default FriendCardItem
