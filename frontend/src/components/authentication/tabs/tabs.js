import './tabs.scss';
import { useRef } from 'react';
const Tabs = (prop) => {
    const tabRef = useRef();
    const signUpRef = useRef();
    const loginRef = useRef();
    return (<div className="tabContainer" ref={tabRef}><button className="signUp" ref={signUpRef} onClick={(ev) => {

        let selection = prop.page;
        selection('signUp');
        if (ev.detail > 0 && loginRef.current.className === 'loginDefaultButton') {
            loginRef.current.className = 'loginClickedButton';
        }

        if (ev.detail > 0) {
            loginRef.current.className = 'login';
            signUpRef.current.className = 'signUpClickedButton';
        }

    }} >Sign up</button><button ref={loginRef} className="loginDefaultButton" onClick={(ev) => {
        let selection = prop.page;
        selection('login');
        ev.stopPropagation();

        if (ev.detail > 0 && loginRef.current.className !== 'loginDefaultButton') {
            loginRef.current.className = 'loginClickedButton';
            signUpRef.current.className = 'signUp';
        }
    }}>Login</button></div >);
}

export default Tabs;