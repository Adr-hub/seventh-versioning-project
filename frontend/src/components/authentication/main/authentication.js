import Tabs from '../tabs/tabs'
import HeaderElement from '../header/header';
import Forms from '../forms/forms';
import { useState } from 'react';
import './authentication.scss';
import footerImage from '../../../images/icon-left-font-monochrome-white.png';
import React from 'react';
const AuthPage = () => {
    const [tab, tabSelection] = useState('');

    return (<React.Fragment>
        <div className='authenticationContent'> <HeaderElement /><main className="container">
            <Tabs page={tabSelection} />
            <Forms pageSelection={tab} />
        </main></div><footer className='footer'><img src={footerImage} alt='Groupomania' width="120" height="120" /><span>{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format()}</span></footer></React.Fragment>);
}
export default AuthPage;