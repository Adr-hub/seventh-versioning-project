import './forms.scss';
import Icons from '../icons/icons';
import Errors from '../errors/errors';
import axiosRequests from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Forms = (prop) => {
    const [userError, createUserError] = useState('');
    const [passwordError, createPasswordError] = useState('');

    const navigation = useNavigate();


    if (prop.pageSelection === 'signUp' || prop.pageSelection === '') {

        return (<section className="formContainer"><form method='POST' onChange={(ev) => {


            if (document.getElementById('user').value === '' && document.getElementById('pass').value === '') {
                document.querySelector('.passLabel~input').disabled = false;
                document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');


                createUserError('empty');
                createPasswordError('empty');
            }
            else if (document.getElementById('user').value === '') {
                document.querySelector('.passLabel~input').disabled = false;
                document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                createUserError('empty');
            }

            else if (document.getElementById('pass').value === '') {
                document.querySelector('.passLabel~input').disabled = false;
                document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                createPasswordError('empty');
            }

        }}>
            <label htmlFor="user" className='userLabel'><Icons propId="userProp" /> Username<input type="text" id="user" name="email" required onInput={
                (ev) => {
                    let usernameConditions = /([/<>/;:!?'{}])+/;
                    let conditionsTest = usernameConditions.test(document.getElementById('user').value);
                    let charactersCheck = /([/<>/;:!?'{}])+/;;
                    let characterTest = charactersCheck.test(document.getElementById('pass').value);

                    if (document.querySelector('.passLabel+.other') !== null) {
                        document.querySelector('.passLabel+.other').textContent = '';
                    }

                    if (!conditionsTest && document.getElementById('user').required && document.getElementById('user').value !== '') {
                        createUserError('valid-email');
                        if (!conditionsTest && document.getElementById('user').required && document.getElementById('user').value !== '' && !characterTest && document.getElementById('pass').required && document.getElementById('pass').value !== '') {

                            document.querySelector('.passLabel~input').classList.replace('unvalidButton', 'sendButton');
                            document.querySelector('.passLabel~input').disabled = false;

                        }
                        else {

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }

                    }
                    else if (document.getElementById('user').value !== '') {
                        createUserError('wrong-email');

                        document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                        document.querySelector('.passLabel~input').disabled = true;
                    }
                }
            } /></label><Errors error={userError} />
            <label htmlFor="pass" className='passLabel'><Icons propId="passwordProp" /> Password<input type="password" id="pass" name="password" required onInput={
                (ev) => {
                    let usernameConditions = /([/<>/;:!?'{}])+/;
                    let conditionsTest = usernameConditions.test(document.getElementById('user').value);
                    let charactersCheck = /([/<>/;:!?'{}])+/;;
                    let characterTest = charactersCheck.test(document.getElementById('pass').value);

                    if (document.querySelector('.passLabel+.other') !== null) {
                        document.querySelector('.passLabel+.other').textContent = '';
                    }

                    if (!characterTest && document.getElementById('pass').required && document.getElementById('pass').value !== '') {

                        createPasswordError('valid-password');

                        if (!characterTest && document.getElementById('pass').required && document.getElementById('pass').value !== '' && !conditionsTest && document.getElementById('user').required && document.getElementById('user').value !== '') {

                            document.querySelector('.passLabel~input').classList.replace('unvalidButton', 'sendButton');
                            document.querySelector('.passLabel~input').disabled = false;

                        }
                        else {

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }
                    else if (document.getElementById('pass').value !== '') {
                        createPasswordError('wrong-password');

                        document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                        document.querySelector('.passLabel~input').disabled = true;
                    }
                }
            } /></label><Errors error={passwordError} />
            <input type="submit" value="Sign Up !" className='unvalidButton' onClick={(ev) => {

                ev.preventDefault();

                let usernameConditions = /^([A-Za-zéèçàùêûîôâ0-9]){1,25}(\.)?([A-Za-zéèçàùêûîôâ0-9]){1,25}@([A-Za-zéèçàùêûîôâ0-9]){0,20}(\.)([a-z]){2,3}$/;
                let conditionsTest = usernameConditions.test(document.getElementById('user').value);
                let charactersCheck = /^([A-Za-zéèçàùêûîôâ0-9]){7,45}$/;
                let characterTest = charactersCheck.test(document.getElementById('pass').value);


                if (conditionsTest && document.getElementById('user').required && document.getElementById('user').value !== '' && document.getElementById('user').value.length <= 70 && document.getElementById('user').value.length >= 10 && characterTest && document.getElementById('pass').required && document.getElementById('pass').value !== '' && document.getElementById('pass').value.length <= 45 && document.getElementById('pass').value.length >= 7) {

                    createPasswordError('other');

                    axiosRequests({
                        method: 'post',
                        url: 'http://localhost:4200/intranet/auth/signUp',

                        data: {
                            email: document.getElementById('user').value,
                            password: document.getElementById('pass').value
                        }

                    })
                        .then((value) => {
                            console.log(value.status, 'RESPONSE');
                            if (value.status === 201) {

                                navigation('/homepage');
                            }

                        })
                        .catch((error) => {

                            if (document.getElementById('user').value !== '' || document.getElementById('pass').value !== '') {
                                document.getElementById('user').value = '';
                                document.getElementById('pass').value = '';
                            }

                            document.querySelector('.passLabel+.other').textContent = 'Registration error ! ' + error.message + ' !';

                        })

                }

                else {

                    if (!conditionsTest) {

                        if (document.getElementById('user').value !== '') {
                            createUserError('wrong-email');

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }

                    if (document.getElementById('user').value.length > 70 && document.getElementById('user').value !== ' ') {
                        if (document.getElementById('user').value !== '') {
                            createUserError('long-email');

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }

                    if (document.getElementById('user').value.length < 10 && document.getElementById('user').value !== ' ') {
                        if (document.getElementById('user').value !== '') {

                            createUserError('short-email');

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }

                    if (!characterTest) {
                        if (document.getElementById('pass').value !== '') {
                            createPasswordError('wrong-password');

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }

                    if (document.getElementById('pass').value.length > 45 && !document.getElementById('pass').value.match(/\s/)) {
                        if (document.getElementById('pass').value !== '') {
                            createPasswordError('long-password');

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }


                    if (document.getElementById('pass').value.length < 7 && document.getElementById('pass').value !== ' ') {
                        if (document.getElementById('pass').value !== '') {
                            createPasswordError('short-password');

                            document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                            document.querySelector('.passLabel~input').disabled = true;
                        }
                    }


                    if (document.getElementById('user').value === '' && document.getElementById('pass').value !== '') {
                        document.querySelector('.passLabel~input').disabled = true;
                        document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                        createUserError('empty-user');
                    }

                    if (document.getElementById('pass').value === '' && document.getElementById('user').value !== '') {
                        document.querySelector('.passLabel~input').disabled = true;
                        document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                        createPasswordError('empty-pass');
                    }

                    if (document.getElementById('user').value === '' && document.getElementById('pass').value === '') {
                        document.querySelector('.passLabel~input').disabled = true;
                        document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                        createPasswordError('empty-form');
                    }


                }

            }}

            />
        </form>
        </section>)
    }
    if (prop.pageSelection === 'login') {

        return (<section className="formContainer"><form method='POST' onChange={(ev) => {

            if (document.getElementById('user').value === '' && document.getElementById('pass').value === '') {
                document.querySelector('.passLabel~input').disabled = false;
                document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');


                createUserError('empty');
                createPasswordError('empty');
            }
            else if (document.getElementById('user').value === '') {
                document.querySelector('.passLabel~input').disabled = false;
                document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                createUserError('empty');
            }

            else if (document.getElementById('pass').value === '') {
                document.querySelector('.passLabel~input').disabled = false;
                document.querySelector('.passLabel~input').classList.replace('sendButton', 'unvalidButton');

                createPasswordError('empty');
            }

        }}>
            <label htmlFor="user" className='userLabel'><Icons propId="userProp" /> Username<input type="text" id="user" name="email" required onChange={
                (ev) => {
                    if (document.querySelector('.passLabel+p') !== null) {
                        document.querySelector('.passLabel+p').textContent = '';
                        document.querySelector('.passLabel+p').classList.replace('password-errors', 'valid');
                    }
                }
            }
            /></label>
            <label htmlFor="pass" className='passLabel'><Icons propId="passwordProp" /> Password<input type="password" id="pass" name="password" required onChange={
                (ev) => {

                    if (document.querySelector('.passLabel+p') !== null) {
                        document.querySelector('.passLabel+p').textContent = '';
                        document.querySelector('.passLabel+p').classList.replace('password-errors', 'valid');
                    }
                }
            } /></label><Errors error={passwordError} />
            <input type="submit" value="Login !" className='unvalidButton' onClick={(ev) => {

                ev.preventDefault();

                if (document.getElementById('user').value !== '' && document.getElementById('pass').value !== '') {
                    createPasswordError('empty');
                    axiosRequests({
                        method: 'post',
                        url: 'http://localhost:4200/intranet/auth/login',

                        data: {
                            email: document.getElementById('user').value,
                            password: document.getElementById('pass').value
                        }

                    })
                        .then((value) => {
                            console.log(value.status, 'RESPONSE');
                            if (value.status === 201) {

                                navigation('/homepage');
                            }

                        })
                        .catch((error) => {

                            if (document.getElementById('user').value !== '' || document.getElementById('pass').value !== '') {
                                document.getElementById('user').value = '';
                                document.getElementById('pass').value = '';
                            }
                            console.log(error)
                            document.querySelector('.passLabel+p').textContent = 'Login error ! ' + error.message + ' !';
                            document.querySelector('.passLabel+p').classList.replace('valid', 'password-errors');
                        })
                }

                else { createPasswordError('empty-form'); }

            }}

            />
        </form>
        </section >)
    }

}






export default Forms;