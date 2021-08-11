import React, { useState, useContext, useEffect } from 'react'
import FriendListItem from './FriendListItem'
import { StoreContext } from '../store'
import axios from 'axios'
import url from '../utils/url'
import errorMessage from '../utils/errorMessage'

const FriendListScreen = () => {
    const { stateUser, stateActiveChat, dispatchActiveChat } = useContext(StoreContext);
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            const {data} = await axios.post(url.post_friend, {token: stateUser.access_token});
            setFriendList([...data.data]);
        } catch (error) {
            console.error(errorMessage(error));
        }
    }

    const handleClickFriend = async (friend) => {
        try {
            const { data } = await axios.post(url.post_chat, {token: stateUser.access_token, friend_id: friend.id});
            dispatchActiveChat({type: 'SET_ACTIVE', payload: {friend, data: data.data}});
        } catch (error) {
            dispatchActiveChat({type: 'SET_ACTIVE', payload: {friend, data: []}});
        }
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
