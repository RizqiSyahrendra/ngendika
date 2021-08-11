import {createContext, useReducer} from 'react'
import {authInitialState, authReducer} from './reducers/authReducer'
import {activeChatInitialState, activeChatReducer} from './reducers/activeChatReducer'
import {friendListInitialState, friendListReducer} from './reducers/friendListReducer'

const StoreContext = createContext({})

const StoreContextProvider = ({children}) => {
    const [stateUser, dispatchUser] = useReducer(authReducer, authInitialState)
    const [stateActiveChat, dispatchActiveChat] = useReducer(activeChatReducer, activeChatInitialState)
    const [stateFriendList, dispatchFriendList] = useReducer(friendListReducer, friendListInitialState)

    return (
        <StoreContext.Provider value={{
            stateUser, dispatchUser,
            stateActiveChat, dispatchActiveChat,
            stateFriendList, dispatchFriendList
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export {StoreContext, StoreContextProvider}