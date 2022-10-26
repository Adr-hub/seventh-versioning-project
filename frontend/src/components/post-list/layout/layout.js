import { Helmet, HelmetProvider } from 'react-helmet-async';
import './layout.scss';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared components/header/header'
import Navbar from '../../shared components/navbar/navbar';
import Footer from '../../shared components/footer/footer';
import ReactModal from 'react-modal';
import Message from '../../shared components/modal/message';
import UpdateForm from '../../shared components/update-form/updateForm';
import postService from '../../../services/postService';
import PostList from '../list/list';
const List = () => {
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
            <title>My Post List</title>
        </Helmet>
    </HelmetProvider><div className='postList' ref={emptyPageRef} onLoad={(ev) => {
        if (emptyPageRef.current.children[1].children[0].children.length === 0 || emptyPageRef.current.children[1].children[0].children[0].textContent === 'You have no posts !') {
            emptyPageRef.current.className = 'emptyPostList';
        }
        else {
            emptyPageRef.current.className = 'postList';
        }
    }}><div className='postListFirstContainer'><Header /><Navbar /></div>
            <div className='postListSecondContainer'><main className='mainContainer'><PostList propId={animation} propForm={form} getPost={getPostId} posts={postId} deleteState={getState} getUpdates={getPutId} /><ReactModal isOpen={deletionActivation} onRequestClose={() => {
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
                contentLabel='Confirmation dialog' ><Message deleteState={getState} cancelState={getCancelButtonState} /></ReactModal></main><UpdateForm propId={form} updates={putId} /></div><Footer modifications={false} /></div></>
};

export default List;
