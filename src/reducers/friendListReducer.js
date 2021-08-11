const friendListInitialState = [
    ...localStorage.getItem('friendList') ? JSON.parse(localStorage.getItem('friendList')) : []
];

const friendListReducer = (state, action) => {
    const {payload} = action;
    let newState = [...state];

    switch (action.type) {
        case 'UPDATE':
            newState = [...payload];
            localStorage.setItem('friendList', JSON.stringify(payload));
            return newState;

        case 'SET_UNREAD':
            newState = newState.map(r => {
                if (r.id === payload.user_id) {
                    r.unread_chat = r.unread_chat + 1;
                }
                return r; 
            });

            localStorage.setItem('friendList', JSON.stringify(newState));
            return newState;

        default:
            return [];
    }
}


export {friendListReducer, friendListInitialState}