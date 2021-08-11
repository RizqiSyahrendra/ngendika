import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Button, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { confirmAlert } from '../utils/alert'
import url from '../utils/url'
import { StoreContext } from '../store'
import errorMessage from '../utils/errorMessage'


const FriendCardItem = ({data, isFriend, friendRequest, callback}) => {
    const [isBtnAddActive, setIsBtnAddActive] = useState(true)
    const [isBtnRemoveActive, setIsBtnRemoveActive] = useState(true)
    const [isBtnConfirmActive, setIsBtnConfirmActive] = useState(true)
    const { stateUser } = useContext(StoreContext)

    const avatarPath = url.uploads + data.avatar;

    const handleAdd = (id) => {
        setIsBtnAddActive(false);
        confirmAlert("Do you want to add friend?", addFriend, id, () => setIsBtnAddActive(true));
    }

    const addFriend = async (id) => {
        try {
            const {data} = await axios.post(url.post_friend_add, {
                token: stateUser.access_token,
                friend_id: id
            });

            toast.success(data.message);
            callback(id);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const handleRemove = (id) => {
        setIsBtnRemoveActive(false);
        confirmAlert("Do you want to remove friend?", removeFriend, id, () => setIsBtnRemoveActive(true));
    }

    const removeFriend = async (id) => {
        try {
            const {data} = await axios.delete(url.delete_friend_request, {
                headers:{'Content-Type': 'application/json; charset=utf-8'},
                data: {
                    token: stateUser.access_token,
                    friend_id: id
                }
            });

            toast.success(data.message);
            callback(id);
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const handleDeny = (id) => {
        setIsBtnRemoveActive(false);
        confirmAlert("Do you want to remove friend?", denyFriend, id, () => setIsBtnRemoveActive(true));
    }

    const denyFriend = async (id) => {
        try {
            const {data} = await axios.delete(url.delete_friend_request, {
                headers:{'Content-Type': 'application/json; charset=utf-8'},
                data: {
                    token: stateUser.access_token,
                    friend_id: id
                }
            });

            toast.success(data.message);
            callback(id, 'deny');
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    const handleConfirm = (id) => {
        setIsBtnConfirmActive(false);
        confirmAlert("Do you want to confirm friend?", confirmFriend, id, () => setIsBtnConfirmActive(true));
    }

    const confirmFriend = async (id) => {
        try {
            const {data} = await axios.put(url.put_friend_confirm, {
                token: stateUser.access_token,
                friend_id: id
            });

            toast.success(data.message);
            callback(id, 'confirm');
        } catch (error) {
            toast.error(errorMessage(error));
        }
    }

    return (
        <div className="d-flex person-item flex-wrap">
            <span className="chat-item-pict mt-1">
                {data.avatar ? <Image className="img-cover rounded-circle" src={avatarPath} /> : ''}
            </span>
            <div className="d-flex flex-column flex-fill px-2">
                <span>{data.name}</span>
                <span className="mail">{data.email}</span>
                <div className="align-self-end pt-2">
                    {
                        friendRequest ?  (
                            <>
                            <Button disabled={!isBtnConfirmActive} onClick={() => handleConfirm(data.id)} size="sm" variant="primary" className="mx-2">Confirm</Button>
                            <Button disabled={!isBtnRemoveActive} onClick={() => handleDeny(data.id)} size="sm" variant="danger">Remove</Button> 
                            </>
                        ):
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
