import {createContext, useReducer} from 'react'
import {authInitialState, authReducer} from './reducers/authReducer'

const StoreContext = createContext({})

const StoreContextProvider = ({children}) => {
    const [stateUser, dispatchUser] = useReducer(authReducer, authInitialState)

    return (
        <StoreContext.Provider value={{
            stateUser, dispatchUser
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export {StoreContext, StoreContextProvider}