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

    switch (action.type) {
        case 'SET_ACTIVE':
            const chatList = [
                {
                    id: null,
                    user_id: payload.id,
                    user_email: payload.email,
                    user_name: payload.email,
                    text: 'Hello'
                }
            ];
            const newState = {
                user: {...payload},
                chatList: chatList
            };
            return newState;
        
        case 'ADD_CHAT':
            const cl = [...state.chatList];
            state.chatList = [...cl, {id: null, user_id: payload.user.id, user_email: payload.user.email, text: payload.message}];
            return state;

        default:
            return state;
    }
}


export {activeChatReducer, activeChatInitialState}