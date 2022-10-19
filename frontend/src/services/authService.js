import axiosRequests from 'axios';
const registration = (email, password) => {
    let signup = axiosRequests({
        method: 'post',
        url: 'http://localhost:4200/intranet/auth/signUp',

        data: {
            email: email,
            password: password
        }
    })
    return signup;
}

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
const authService = { registration, login };

export default authService;
