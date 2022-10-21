import './layout.scss';
import HomePageIcons from '../../homepage/icons/homepageIcons';
import Footer from "../../shared components/footer/footer"
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import postService from '../../../services/postService';
const Modifications = (prop) => {
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

    return (<><div className='responsiveModificationFormContainer'><p className='notification'>Modify your post !</p><form encType="multipart/form-data" onChange={(ev) => {

        if (messageErrorRef.current !== undefined) {
            messageErrorRef.current.textContent = '';
        }
    }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" name="title" value={postTitle !== undefined ? postTitle : initialTitle} onInput={(ev) => {
        getPostTitle(ev.target.value);
    }} /></label><br />

        <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" minLength="12" maxLength="262" value={postMessage !== undefined ? postMessage : initialMessage} onInput={(ev) => {
            getPostMessage(ev.target.value);
        }}></textarea></label><br />

        <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

        <div className='submitButtonContainer'><input type="submit" value="Update the Post !" className='postButton' onClick={(ev) => {

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
                            postCreation('/homepage');
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
        <p className="errors" ref={messageErrorRef}></p>
    </div><Footer modifications={true} /></>);
};

export default Modifications;