import { initSocket, disconnectSocket } from '../utils/socket';

const authInitialState = {
    ...localStorage.getItem('stateUser') ? JSON.parse(localStorage.getItem('stateUser')) : {}
}

const authReducer = (state, action) => {
    const {payload} = action;

    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('stateUser', JSON.stringify(payload));
            initSocket(payload);
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