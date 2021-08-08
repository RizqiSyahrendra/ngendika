import React, { useState, useContext, useEffect } from 'react'
import FriendListItem from './FriendListItem'
import { StoreContext } from '../store'

const FriendListScreen = () => {
    const { stateActiveChat, dispatchActiveChat } = useContext(StoreContext);
    const [friendList, setFriendList] = useState([
        {
            id: 1,
            email: 'sasuke@mail.com',
            name: 'Sasuke'
        },
        {
            id: 2,
            email: 'sakura@mail.com',
            name: 'Sakura'
        }
    ]);

    return (
        <div>
            {
                friendList.map((friend, idxFriend) => (
                    <FriendListItem 
                        key={idxFriend} 
                        data={friend} 
                        isActive={stateActiveChat.user.id === friend.id} 
                        onClick={() => dispatchActiveChat({type: 'SET_ACTIVE', payload: friend})}
                    />
                ))
            }
        </div>
    )
}

export default FriendListScreen
