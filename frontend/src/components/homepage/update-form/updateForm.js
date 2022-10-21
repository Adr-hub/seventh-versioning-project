import HomePageIcons from '../icons/homepageIcons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './updateForm.scss';
import postService from '../../../services/postService';
const UpdateForm = (prop) => {

    let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState();
    const [initialTitle, getInitialTitle] = useState('');
    const [initialMessage, getInitialMessage] = useState('');
    const [postMessage, getPostMessage] = useState();
    const messageErrorRef = useRef();
    const fileInputRef = useRef();
    let putId = prop.updates;
    useEffect(() => {

        if (prop.propId === 'update') {

            postService.getPost(putId)
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

        }
    }, [prop.propId, putId]);

    if (prop.propId === 'unanimate' && putId !== undefined) {
        return undefined;

    }

    if (prop.propId === 'update') {
        return (<div className='updateFormContainer'><form method='post' encType="multipart/form-data" onChange={(ev) => {


        }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" value={postTitle !== undefined ? postTitle : initialTitle} name="title" onInput={(ev) => {

            getPostTitle(ev.target.value);

        }} /></label><br />

            <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" value={postMessage !== undefined ? postMessage : initialMessage} maxLength="342" minLength="12" onInput={(ev) => {

                getPostMessage(ev.target.value);

            }}></textarea></label><br />

            <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

            <input type="submit" value="Update the Post !" className='postButton' onClick={(ev) => {
                ev.preventDefault();

                if (postTitle === undefined && postMessage === undefined && postTitle !== 'undefined' && postMessage !== 'undefined' && fileInputRef.current.files[0] === undefined) {
                    ev.preventDefault()
                    messageErrorRef.current.textContent = "You didn't update the post !";
                }

                else if (postTitle !== undefined || postMessage !== undefined || fileInputRef.current.files[0] !== undefined) {

                    const titleValue = postTitle !== undefined ? postTitle : initialTitle;
                    const messageValue = postMessage !== undefined ? postMessage : initialMessage;

                    let id = putId;

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
                        postService.updatePosts(titleValue, messageValue, fileInputRef.current.files[0], id)
                            .then((value) => {
                                console.log(value.status, 'RESPONSE');
                                ev.preventDefault();
                                postCreation(0);
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

            } />
        </form>
            <p className="errors" ref={messageErrorRef}></p>
        </div>);
    }
}

export default UpdateForm;