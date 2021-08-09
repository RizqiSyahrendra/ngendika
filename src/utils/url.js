const host = process.env.REACT_APP_API_HOST;

const url = {
    post_auth_login: host + '/auth/login',
    post_auth_register: host + '/auth/register',

    post_friend: host + '/friend',
    post_friend_suggestion: host + '/friend/suggestion',
    post_friend_request: host + '/friend/request',
    post_friend_add: host + '/friend/add',
    put_friend_request: host + '/friend/confirm',
    delete_friend_request: host + '/friend/remove',
};

export default url;