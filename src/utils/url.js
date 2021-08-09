const host = process.env.REACT_APP_API_HOST;

const url = {
    post_auth_login: host + '/auth/login',
    post_auth_register: host + '/auth/register'
};

export default url;