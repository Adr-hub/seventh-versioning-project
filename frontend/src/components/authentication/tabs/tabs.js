import './tabs.scss';
import { useRef } from 'react';
const Tabs = (prop) => {
    const tabRef = useRef();
    const signUpRef = useRef();
    const loginRef = useRef();
    return (<div className="tabContainer" ref={tabRef}><button ref={signUpRef} className="signUpDefaultButton" onClick={(ev) => {
        let selection = prop.page;
        selection('signUp');
        ev.stopPropagation();

        if (ev.detail > 0 && signUpRef.current.className !== 'signUpDefaultButton') {
            signUpRef.current.className = 'signUpClickedButton';
            loginRef.current.className = 'login';
        }
    }}>Sign up</button><button className="login" ref={loginRef} onClick={(ev) => {
        let selection = prop.page;
        selection('login');

        if (ev.detail > 0 && signUpRef.current.className === 'signUpDefaultButton') {
            signUpRef.current.className = 'signUpClickedButton';
        }

        if (ev.detail > 0) {
            signUpRef.current.className = 'signUp';
            loginRef.current.className = 'loginClickedButton';
        }

    }} >Login</button></div >);
}

export default Tabs;