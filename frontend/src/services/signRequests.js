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

export default registration;