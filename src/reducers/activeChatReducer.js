import { sendMessage } from '../utils/socket'

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
            newState.user = {...payload.friend};
            // newState.chatList = [
            //     ...localStorage.getItem(`chatList_${payload.email}`) ?
            //         JSON.parse(localStorage.getItem(`chatList_${payload.email}`)) :
            //         []
            // ];
            newState.chatList = [...payload.data];
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
            sendMessage(state.user, payload.message);
            return newState;
        
        case 'RECEIVE_CHAT':
            newState.chatList = [...newState.chatList, {
                id: null, 
                user_id: payload.from.user_id, 
                user_email: payload.from.email, 
                text: payload.message
            }];
            localStorage.setItem(`chatList_${payload.from.email}`, JSON.stringify([...newState.chatList]));
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