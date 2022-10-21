import { Helmet, HelmetProvider } from 'react-helmet-async';
import './layout.scss';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HomepageHeader from '../header/homepageHeader';
import Button from '../post-button/post-button';
import Navbar from '../navbar/navbar';
import Post from '../posts/post';
import Footer from '../../shared components/footer/footer';
import PostForm from '../post-form/post-form';
import ResponsivePostForm from '../post-form/responsivePostForm';
import ReactModal from 'react-modal';
import Message from '../modal/message';
import UpdateForm from '../update-form/updateForm';
import postService from '../../../services/postService';
const Homepage = () => {
    const [form, animation] = useState('');
    const [postId, getPostId] = useState();
    const [putId, getPutId] = useState();
    const [deletionActivation, getState] = useState(false);
    const [cancelation, getCancelButtonState] = useState();
    const emptyPageRef = useRef();
    let postDeletion = useNavigate();
    ReactModal.setAppElement('#root');
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
            <div className='secondContainer'><main className='mainContainer'><Post propId={animation} propForm={form} getPost={getPostId} posts={postId} deleteState={getState} getUpdates={getPutId} /><ReactModal isOpen={deletionActivation} onRequestClose={() => {
                getCancelButtonState(true);
                getState(false);
            }} onAfterClose={() => {

                if (!cancelation) {
                    const sessionToken = window.localStorage.getItem('employee-token');
                    const employeeId = window.localStorage.getItem('employee-id');
                    postService.deletePosts(postId, sessionToken, employeeId)
                        .then((value) => {
                            console.log(value.status, 'RESPONSE');

                            postDeletion(0);

                            window.scrollTo(0, 0);
                        })

                        .catch((error) => {
                            console.error(error);
                        })
                }
            }
            }
                contentLabel='Confirmation dialog' ><Message deleteState={getState} cancelState={getCancelButtonState} /></ReactModal></main><PostForm propId={form} posts={postId} updates={putId} /><UpdateForm propId={form} updates={putId} /><ResponsivePostForm propId={animation} propForm={form} /></div><Footer modifcations={false} /></div></>
};

export default Homepage;
