import {createContext, useReducer} from 'react'
import {authInitialState, authReducer} from './reducers/authReducer'
import {activeChatInitialState, activeChatReducer} from './reducers/activeChatReducer'

const StoreContext = createContext({})

const StoreContextProvider = ({children}) => {
    const [stateUser, dispatchUser] = useReducer(authReducer, authInitialState)
    const [stateActiveChat, dispatchActiveChat] = useReducer(activeChatReducer, activeChatInitialState)

    return (
        <StoreContext.Provider value={{
            stateUser, dispatchUser,
            stateActiveChat, dispatchActiveChat
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export {StoreContext, StoreContextProvider}