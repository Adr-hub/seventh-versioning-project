import { Helmet, HelmetProvider } from 'react-helmet-async';
import './layout.scss';
import { useState, useRef } from 'react';
import HomepageHeader from '../header/homepageHeader';
import Button from '../post-button/post-button';
import Navbar from '../navbar/navbar';
import Post from '../posts/post';
import Footer from '../../shared components/footer/footer';
import PostForm from '../post-form/post-form';
import ResponsivePostForm from '../post-form/responsivePostForm';
const Homepage = () => {
    const [form, animation] = useState('');
    const [postId, getPostId] = useState();
    const emptyPageRef = useRef();

    return <><HelmetProvider>
        <Helmet>
            <title>Homepage</title>
        </Helmet>
    </HelmetProvider><div className='homepage' ref={emptyPageRef} onLoad={(ev) => {
        if (emptyPageRef.current.children[1].children[0].children.length === 0) {
            emptyPageRef.current.className = 'emptyHomepage';
        }
        else if (emptyPageRef.current.children[1].children[0].children.length >= 1) {
            emptyPageRef.current.className = 'homepage';
        }
    }}><div className='firstContainer'><HomepageHeader /><Navbar /><Button propId={animation} propForm={form} /></div>
            <div className='secondContainer'><main className='mainContainer'><Post propId={animation} propForm={form} getPost={getPostId} posts={postId} ></Post></main><PostForm propId={form} posts={postId} /><ResponsivePostForm propId={animation} propForm={form} /></div><Footer modifcations={false} /></div></>
};

export default Homepage;
