import React, { useContext, useEffect, useState } from 'react'
import FriendListItem from './FriendListItem'
import { StoreContext } from '../store'
import axios from 'axios'
import url from '../utils/url'
import errorMessage from '../utils/errorMessage'
import { Form, InputGroup, Button } from 'react-bootstrap'

const FriendListScreen = () => {
    const { 
        stateUser, stateActiveChat, 
        dispatchActiveChat, stateFriendList, dispatchFriendList } = useContext(StoreContext);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            const {data} = await axios.post(url.post_friend, {token: stateUser.access_token});
            dispatchFriendList({type: 'UPDATE', payload: [...data.data]});
        } catch (error) {
            console.error(errorMessage(error));
        }
    }

    const handleClickFriend = async (friend) => {
        try {
            const { data } = await axios.post(url.post_chat, {token: stateUser.access_token, friend_id: friend.id});
            dispatchActiveChat({type: 'SET_ACTIVE', payload: {friend, data: data.data}});

            updateUnreadMessage(friend.id);
        } catch (error) {
            dispatchActiveChat({type: 'SET_ACTIVE', payload: {friend, data: []}});
        }
    }

    const updateUnreadMessage = async (friend_id) => {
        try {
          let tempFriendList = [...stateFriendList].map(r => {
              if (r.id === friend_id) {
                  r.unread_chat = 0;
              }

              return r;
          });

          await axios.put(url.put_chat_update_unread, {
            token: stateUser.access_token,
            friend_id: friend_id,
            unread: 0
          });

          dispatchFriendList({type: 'UPDATE', payload: [...tempFriendList]});
        } catch (error) {
          console.error(errorMessage(error));
        }
    }

    const onSearch = () => {
        if (search) {
            
        }
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }

    return (
        <div>
            <InputGroup>   
                <Form.Control onKeyUp={handleEnterSearch} className="search-friend-chat" type="text" placeholder="search here" />
                <Button onClick={onSearch}>
                    <i className="fas fa-search"></i>
                </Button> 
            </InputGroup>
            {
                stateFriendList.map((friend, idxFriend) => (
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
