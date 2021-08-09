const activeChatInitialState = {
    user: {
        id: 0,
        email: '',
        name: ''
    },
    chatList: []
};

const activeChatReducer = (state, action) => {
    const {payload} = action;
    const newState = {...state};

    switch (action.type) {
        case 'SET_ACTIVE':
            newState.user = {...payload};
            newState.chatList = [
                ...localStorage.getItem(`chatList_${payload.email}`) ?
                    JSON.parse(localStorage.getItem(`chatList_${payload.email}`)) :
                    []
            ];
            return newState;
        
        case 'SEND_CHAT':
            newState.chatList = [...newState.chatList, {
                id: null, 
                user_id: payload.user.id, 
                user_email: payload.user.email, 
                text: payload.message
            }];

            const tempChatList = [...newState.chatList];
            const {email} = state.user;
            localStorage.setItem(`chatList_${email}`, JSON.stringify(tempChatList));
            return newState;
        
        case 'CLEAR_ALL_CHAT':
            return {
                user: {
                    id: 0,
                    email: '',
                    name: ''
                },
                chatList: []
            };

        default:
            return state;
    }
}


export {activeChatReducer, activeChatInitialState}