import './forms.scss';
import Icons from '../icons/icons';
import Errors from '../errors/errors';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import authService from '../../../services/authService';
const SignUp = (prop) => {
    const [userError, createUserError] = useState('');
    const [passwordError, createPasswordError] = useState('none');
    const [userEmail, getUserEmail] = useState('');
    const [userPassword, getUserPassword] = useState('');
    const submissionRef = useRef();
    const formRef = useRef();
    const errorRef = useRef();
    const navigation = useNavigate();
    let getAuthPageSize = prop.size;
    if (prop.pageSelection === 'signUp') {

        return (<section className="formContainer"><form method='POST' ref={formRef}>
            <label htmlFor="user" className='userLabel'><Icons propId="userProp" /> Username<input type="text" id="user" name="email" required onInput={
                (ev) => {
                    getUserEmail(ev.target.value);
                }
            } /></label><Errors error={userError} paragraphClass={errorRef} />
            <label htmlFor="pass" className='passLabel'><Icons propId="passwordProp" /> Password<input type="password" id="pass" name="password" required onInput={
                (ev) => {

                    getUserPassword(ev.target.value)
                }
            } /></label><Errors error={passwordError} paragraphClass={errorRef} />
            <input type="submit" value="Sign Up !" className='sendButton' ref={submissionRef} onClick={(ev) => {

                ev.preventDefault();

                let usernameConditions = /^([A-Za-zéèçàùêûîôâ0-9]){1,25}(\.)?([A-Za-zéèçàùêûîôâ0-9]){1,25}@([A-Za-zéèçàùêûîôâ0-9]){0,20}(\.)([a-z]){2,3}$/;
                let conditionsTest = usernameConditions.test(userEmail);
                let charactersCheck = /^([A-Za-zéèçàùêûîôâ0-9]){7,45}$/;
                let characterTest = charactersCheck.test(userPassword);
                let otherCharactersCheck = /([/<>/;:!?'{}])+/;
                let userOtherCharactersTest = otherCharactersCheck.test(userEmail);
                let passwordOtherCharactersTest = otherCharactersCheck.test(userPassword);

                if (conditionsTest && userEmail !== '' && userEmail.length <= 70 && userEmail.length >= 10 && characterTest && userPassword !== '' && userPassword.length <= 45 && userPassword.length >= 7) {

                    createPasswordError('other');

                    authService.registration(userEmail, userPassword)
                        .then((res) => {
                            console.log(res.status, 'RESPONSE');

                            authService.login(userEmail, userPassword)
                                .then((res) => {
                                    console.log(res.status, 'RESPONSE');

                                    window.localStorage.setItem('employee-id', res.data.employeeId);
                                    window.localStorage.setItem('employee-token', res.data.token);

                                    navigation('/homepage');

                                })
                                .catch((error) => {
                                    console.log(error)
                                })

                        })
                        .catch((error) => {

                            if (userEmail !== '' || userPassword !== '') {
                                getUserEmail('')
                                getUserPassword('');
                                formRef.current.reset();
                            }
                            getAuthPageSize(true);
                            errorRef.current.textContent = 'Registration error ! ' + error.message + ' !';

                        })

                }

                else {

                    if (!conditionsTest || userOtherCharactersTest) {

                        if (userEmail !== '') {
                            createUserError('wrong-email');
                            getAuthPageSize(true);

                            submissionRef.disabled = true;
                        }
                    }

                    if (userEmail.length > 70 && userEmail !== ' ' && !userOtherCharactersTest) {
                        if (userEmail !== '') {
                            createUserError('long-email');
                            getAuthPageSize(true);

                            submissionRef.disabled = true;
                        }
                    }

                    if (userEmail.length < 10 && userEmail !== ' ' && !userOtherCharactersTest) {
                        if (userEmail !== '') {

                            createUserError('short-email');
                            getAuthPageSize(true);

                            submissionRef.disabled = true;
                        }
                    }

                    if (!characterTest || passwordOtherCharactersTest) {
                        if (userPassword !== '') {
                            createPasswordError('wrong-password');
                            getAuthPageSize(true);

                            submissionRef.disabled = true;
                        }
                    }

                    if (userPassword.length > 45 && !userPassword.match(/\s/) && !passwordOtherCharactersTest) {
                        if (userPassword !== '') {
                            createPasswordError('long-password');
                            getAuthPageSize(true);

                            submissionRef.disabled = true;
                        }
                    }


                    if (userPassword.length < 7 && userPassword !== ' ' && !passwordOtherCharactersTest) {
                        if (userPassword !== '') {
                            createPasswordError('short-password');
                            getAuthPageSize(true);
                            submissionRef.disabled = true;
                        }
                    }


                    if (userEmail === '' && userPassword !== '') {
                        submissionRef.disabled = true;
                        getAuthPageSize(true);
                        createUserError('empty-user');
                    }

                    if (userPassword === '' && userEmail !== '') {
                        submissionRef.disabled = true;

                        getAuthPageSize(true);
                        createPasswordError('empty-pass');
                    }

                    if (userEmail === '' && userPassword === '') {

                        getAuthPageSize(true);
                        createUserError('empty-user');
                        createPasswordError('empty-pass');
                    }
                }
            }}

            />
        </form>
        </section>)
    }
}
export default SignUp;