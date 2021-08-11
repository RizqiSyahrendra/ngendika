import React, { useContext, useEffect } from 'react'
import FriendListItem from './FriendListItem'
import { StoreContext } from '../store'
import axios from 'axios'
import url from '../utils/url'
import errorMessage from '../utils/errorMessage'

const FriendListScreen = () => {
    const { 
        stateUser, stateActiveChat, 
        dispatchActiveChat, stateFriendList, dispatchFriendList } = useContext(StoreContext);

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

    return (
        <div>
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
