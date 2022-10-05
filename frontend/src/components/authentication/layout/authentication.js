import Tabs from '../tabs/tabs'
import HeaderElement from '../header/header';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Forms from '../forms/forms';
import { useState } from 'react';
import './authentication.scss';
import React from 'react';
import Footer from '../../shared components/footer/footer';
const AuthPage = () => {
    const [tab, tabSelection] = useState('');

    return (<React.Fragment>
        <HelmetProvider>
            <Helmet><title>Groupomania</title></Helmet>
        </HelmetProvider>
        <div className='authenticationContent'> <HeaderElement /><main className="container">
            <Tabs page={tabSelection} />
            <Forms pageSelection={tab} />
        </main></div><Footer /></React.Fragment>);
}
export default AuthPage;