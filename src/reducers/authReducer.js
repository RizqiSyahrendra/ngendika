import { disconnectSocket } from '../utils/socket';

const authInitialState = {
    ...localStorage.getItem('stateUser') ? JSON.parse(localStorage.getItem('stateUser')) : {}
}

const authReducer = (state, action) => {
    const {payload} = action;
    const newState = {...state};

    switch (action.type) {
        case 'CHANGE_PROFILE':
            newState.name = payload.name;
            localStorage.setItem('stateUser', JSON.stringify(newState));
            return newState;

        case 'LOGIN':
            localStorage.setItem('stateUser', JSON.stringify(payload));
            return payload;

        case 'LOGOUT':
            disconnectSocket();
            localStorage.clear();
            window.location.reload();
            return {};

        default:
            return {};
    }
}


export {authReducer, authInitialState}