import './layout.scss';
import SharedIcons from '../../shared components/icons/icons';
import Footer from "../../shared components/footer/footer"
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import postService from '../../../services/postService';
const Modifications = () => {
    let postCreation = useNavigate();
    const [initialTitle, getInitialTitle] = useState('');
    const [initialMessage, getInitialMessage] = useState('');
    const [postTitle, getPostTitle] = useState();
    const [postMessage, getPostMessage] = useState();
    const messageErrorRef = useRef();
    const fileInputRef = useRef();
    const locate = useLocation();
    let id = locate.pathname.split('modifications/')[1];


    useEffect(() => {

        postService.getPost(id)
            .then((form) => {
                console.log(form.status, 'DATA RETURNED');

                if (form.data !== undefined) {

                    let title = form.data.title;
                    let message = form.data.message;
                    getInitialTitle(title);
                    getInitialMessage(message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [id]);

    return (<><p className='alert-for-tablet-users'>On tablets you have to switch from landscape to portrait mode to access this page. You may also have to refresh the browser  !</p><div className='modificationPage'><div className='responsiveModificationFormContainer'><p className='modificationNotification'>Modify your post !</p><form encType="multipart/form-data" onChange={(ev) => {

        if (messageErrorRef.current !== undefined) {
            messageErrorRef.current.textContent = '';
        }
    }}><label htmlFor="modificationTitle"><SharedIcons propId="title" />Title<br /><input type="text" id="modificationTitle" name="title" value={postTitle !== undefined ? postTitle : initialTitle} onInput={(ev) => {
        getPostTitle(ev.target.value);
    }} /></label><br />

        <label htmlFor="modificationContent"><SharedIcons propId="text" />Content<br /><textarea id="modificationContent" name="message" minLength="12" maxLength="262" value={postMessage !== undefined ? postMessage : initialMessage} onInput={(ev) => {
            getPostMessage(ev.target.value);
        }}></textarea></label><br />

        <label htmlFor="modificationImages"><SharedIcons propId="images" />Image<br /><input type="file" id="modificationImages" name="image" ref={fileInputRef} /></label><br />

        <div className='modificationSubmitButtonContainer'><input type="submit" value="Update the Post !" className='modificationPostButton' onClick={(ev) => {

            ev.preventDefault();

            if (postTitle === undefined && postMessage === undefined && postTitle !== 'undefined' && postMessage !== 'undefined' && fileInputRef.current.files[0] === undefined) {
                ev.preventDefault()
                messageErrorRef.current.textContent = "You didn't update the post !";
            }

            else if (postTitle !== undefined || postMessage !== undefined || fileInputRef.current.files[0] !== undefined) {

                const titleValue = postTitle !== undefined ? postTitle : initialTitle;
                const messageValue = postMessage !== undefined ? postMessage : initialMessage;


                if (messageValue.length < 12 && messageValue.length !== 0 && titleValue.length !== 0) {
                    ev.preventDefault();
                    messageErrorRef.current.textContent = "Your post is too short !";
                }

                else if (messageValue.length === 0 && titleValue.length === 0 && fileInputRef.current.files[0] === undefined) {
                    ev.preventDefault();
                    messageErrorRef.current.textContent = "You didn't fill in the form !";
                }

                else if (titleValue.length === 0) {
                    ev.preventDefault();
                    messageErrorRef.current.textContent = "Your post has no title !";
                }

                else if (messageValue.length === 0) {
                    ev.preventDefault();
                    messageErrorRef.current.textContent = "Your post has no content !";
                }


                else {
                    postService.updateResponsivePosts(titleValue, messageValue, fileInputRef.current.files[0], id)
                        .then((value) => {
                            console.log(value.status, 'RESPONSE');
                            ev.preventDefault();
                            postCreation(-1);
                        }

                        )
                        .catch((error) => {

                            if (postTitle !== '' || postMessage !== '') {
                                getPostTitle('');
                                getPostMessage('');
                            }

                            messageErrorRef.current.textContent = 'Error ! ' + error.message + ' !';

                        })

                }
            }
        }

        } /></div>
    </form>
        <p className="modificationErrors" ref={messageErrorRef}></p></div><div className='modificationSpinnerContainer'><div className='modificationSpinner'><div className='modificationSpinnerCenter'></div></div></div>
        <Footer modifications={true} /></div></>);
};

export default Modifications;