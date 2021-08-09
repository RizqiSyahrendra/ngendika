const authInitialState = {
    ...localStorage.getItem('stateUser') ? JSON.parse(localStorage.getItem('stateUser')) : {}
}

const authReducer = (state, action) => {
    const {payload} = action;

    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('stateUser', JSON.stringify(payload));
            return payload;

        case 'LOGOUT':
            localStorage.clear();
            return {};

        default:
            return {};
    }
}


export {authReducer, authInitialState}