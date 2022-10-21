import './tabs.scss';
import { useRef } from 'react';
const Tabs = (prop) => {
    const tabRef = useRef();
    const signUpRef = useRef();
    const loginRef = useRef();
    return (<div className="tabContainer" ref={tabRef}><button className="signUp" ref={loginRef} onClick={(ev) => {

        let selection = prop.page;
        selection('signUp');
        if (ev.detail > 0 && signUpRef.current.className === 'loginDefaultButton') {
            signUpRef.current.className = 'loginClickedButton';
        }

        if (ev.detail > 0) {
            signUpRef.current.className = 'login';
            loginRef.current.className = 'signUpClickedButton';
        }

    }} >Sign up</button><button ref={signUpRef} className="loginDefaultButton" onClick={(ev) => {
        let selection = prop.page;
        selection('login');
        ev.stopPropagation();

        if (ev.detail > 0 && signUpRef.current.className !== 'loginDefaultButton') {
            signUpRef.current.className = 'loginClickedButton';
            loginRef.current.className = 'signUp';
        }
    }}>Login</button></div >);
}

export default Tabs;