import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { confirmAlert } from '../utils/alert'


const FriendCardItem = ({data, isFriend}) => {
    const [isBtnAddActive, setIsBtnAddActive] = useState(true)
    const [isBtnRemoveActive, setIsBtnRemoveActive] = useState(true)

    const handleAdd = (id) => {
        setIsBtnAddActive(false);
        confirmAlert("Do you want to add friend?", addFriend, id, () => setIsBtnAddActive(true));
    }

    const addFriend = (id) => {

    }

    const handleRemove = (id) => {
        setIsBtnRemoveActive(false);
        confirmAlert("Do you want to remove friend?", removeFriend, id, () => setIsBtnRemoveActive(true));
    }

    const removeFriend = (id) => {

    }

    return (
        <div className="d-flex person-item flex-wrap">
            <span className="chat-item-pict mt-1">
            </span>
            <div className="d-flex flex-column flex-fill px-2">
                <span>{data.name}</span>
                <span className="mail">{data.email}</span>
                <div className="align-self-end pt-2">
                    {
                        isFriend ? 
                            <Button disabled={!isBtnRemoveActive} onClick={() => handleRemove(data.id)} size="sm" variant="danger">Remove</Button> : 
                            <Button disabled={!isBtnAddActive} onClick={() => handleAdd(data.id)} size="sm" variant="primary">Add</Button>
                        }
                </div>
            </div>
        </div>
    )
}

export default FriendCardItem
