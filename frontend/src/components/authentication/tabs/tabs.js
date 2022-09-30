import './tabs.scss';
const Tabs = (prop) => {
    return (<div className="tabContainer"><button className="signUpDefaultButton" onClick={(ev) => {
        let selection = prop.page;
        selection('signUp');
        ev.stopPropagation();

        if (ev.detail > 0 && !document.querySelector('.tabContainer').firstElementChild.classList.contains('signUpDefaultButton')) {
            document.querySelector('.signUp').classList.replace('signUp', 'signUpClickedButton');
            document.querySelector('.loginClickedButton').classList.replace('loginClickedButton', 'login');
        }
    }}>Sign up</button><button className="login" onClick={(ev) => {
        let selection = prop.page;
        selection('login');

        if (ev.detail > 0 && document.querySelector('.tabContainer').firstElementChild.classList.contains('signUpDefaultButton')) {
            document.querySelector('.signUpDefaultButton').classList.replace('signUpDefaultButton', 'signUpClickedButton');
        }

        if (ev.detail > 0) {
            document.querySelector('.signUpClickedButton').classList.replace('signUpClickedButton', 'signUp');
            document.querySelector('.login').classList.replace('login', 'loginClickedButton');
        }

    }} >Login</button></div >);
}

export default Tabs;