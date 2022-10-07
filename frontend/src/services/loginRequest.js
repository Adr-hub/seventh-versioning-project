import axiosRequests from 'axios';

const login = (email, password) => {
    let loginRequest = axiosRequests({
        method: 'post',
        url: 'http://localhost:4200/intranet/auth/login',

        data: {
            email: email,
            password: password
        }

    })
    return loginRequest;
}

export default login;