import React, { useState, useContext, useEffect } from 'react'
import FriendListItem from './FriendListItem'
import { StoreContext } from '../store'
import axios from 'axios'
import url from '../utils/url'

const FriendListScreen = ({socket}) => {
    const { stateUser, stateActiveChat, dispatchActiveChat } = useContext(StoreContext);
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        loadFriends();
        listenChat();
    }, []);

    const loadFriends = async () => {
        try {
            const {data} = await axios.post(url.post_friend, {token: stateUser.access_token});
            setFriendList([...data.data]);
        } catch (error) {
            const {data} = error.response;
            const errMessage = data.message ? data.message : error.message;
            console.error(errMessage)
        }
    }

    const handleClickFriend = (friend) => {
        dispatchActiveChat({type: 'SET_ACTIVE', payload: friend});
    }

    const listenChat = () => {
        socket.auth = {...stateUser};
        socket.connect();
    }

    return (
        <div>
            {
                friendList.map((friend, idxFriend) => (
                    <FriendListItem 
                        key={idxFriend} 
                        data={friend} 
                        isActive={stateActiveChat.user.id === friend.id} 
                        onClick={() => handleClickFriend(friend)}
                    />
                ))
            }
        </div>
    )
}

export default FriendListScreen
