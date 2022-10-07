import { Helmet, HelmetProvider } from 'react-helmet-async';
import './layout.scss';
import { useState } from 'react';
import HomepageHeader from '../header/homepageHeader';
import Button from '../post-button/post-button';
import Navbar from '../navbar/navbar';
import Post from '../posts/post';
import Footer from '../../shared components/footer/footer';
import PostForm from '../post-form/post-form';
import ResponsivePostForm from '../post-form/responsivePostForm';
const Homepage = () => {
    const [form, animation] = useState('');
    return <><HelmetProvider>
        <Helmet>
            <title>Homepage</title>
        </Helmet>
    </HelmetProvider><div className='firstContainer'><HomepageHeader /><Navbar /><Button propId={animation} propForm={form} /></div>
        <div className='secondContainer'><main className='mainContainer'><Post /></main><PostForm propId={form} /><ResponsivePostForm /></div><Footer /></>
};

export default Homepage;
