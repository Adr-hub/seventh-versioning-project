import './forms.scss';
import Icons from '../icons/icons';
import Errors from '../errors/errors';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import authService from '../../../services/authService';
const Login = (prop) => {

    const [passwordError, createPasswordError] = useState('none');
    const [userEmail, getUserEmail] = useState('');
    const [userPassword, getUserPassword] = useState('');
    const submissionRef = useRef();
    const formRef = useRef();
    const errorRef = useRef();
    const navigation = useNavigate();

    if (prop.pageSelection === 'login' || prop.pageSelection === '') {

        return (<section className="formContainer"><form method='POST' ref={formRef}>
            <label htmlFor="user" className='userLabel'><Icons propId="userProp" /> Username<input type="text" id="user" name="email" required onChange={
                (ev) => {
                    getUserEmail(ev.target.value);
                }
            }
            /></label>
            <label htmlFor="pass" className='passLabel'><Icons propId="passwordProp" /> Password<input type="password" id="pass" name="password" required onChange={
                (ev) => {
                    getUserPassword(ev.target.value);
                }
            } /></label><Errors error={passwordError} paragraphClass={errorRef} />
            <input type="submit" value="Login !" className='sendButton' ref={submissionRef} onClick={(ev) => {

                ev.preventDefault();

                if (userEmail !== '' && userPassword !== '' && userPassword.length < 45 && userPassword.length > 7 && userEmail.length > 10 && userEmail.length < 70 && !userEmail.match(/\s/) && !userPassword.match(/\s/)) {
                    createPasswordError('empty');

                    authService.login(userEmail, userPassword)
                        .then((res) => {
                            console.log(res.status, 'RESPONSE');

                            window.localStorage.setItem('employee-id', res.data.employeeId);
                            window.localStorage.setItem('employee-token', res.data.token);

                            if (res.data.defaultRole === 1) {
                                window.localStorage.setItem('admin', res.data.defaultRole);
                            }

                            navigation('/homepage');

                        })
                        .catch((error) => {

                            if (userEmail !== '' || userPassword !== '') {
                                getUserEmail('');
                                getUserPassword('');
                                formRef.current.reset();
                            }
                            console.log(error)

                            errorRef.current.textContent = 'Login error ! ' + error.message + ' !';
                            errorRef.current.className = 'password-errors';
                        })
                }

                else {

                    createPasswordError('empty-form');
                }
            }
            }

            />
        </form>
        </section >)
    }

}
export default Login;