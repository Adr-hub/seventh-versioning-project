import Tabs from '../tabs/tabs'
import HeaderElement from '../header/header';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useState } from 'react';
import './layout.scss';
import React from 'react';
import Footer from '../../shared components/footer/footer';
import SignUp from '../forms/signUp';
import Login from '../forms/login';
const AuthPage = () => {
    const [tab, tabSelection] = useState('');

    return (<React.Fragment>
        <HelmetProvider>
            <Helmet><title>Groupomania</title></Helmet>
        </HelmetProvider>
        <div className='authPage'><div className='authenticationContent'> <HeaderElement /><main className="container">
            <Tabs page={tabSelection} />
            <SignUp pageSelection={tab} />
            <Login pageSelection={tab} />
        </main></div><Footer modifications={false} /></div></React.Fragment>);
}
export default AuthPage;