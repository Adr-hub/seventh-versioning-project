import HomePageIcons from '../icons/homepageIcons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './updateForm.scss';
import postService from '../../../services/postService';
const UpdateForm = (prop) => {

    let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState('');
    const [postMessage, getPostMessage] = useState('');
    const messageErrorRef = useRef();
    const fileInputRef = useRef();
    let putId = prop.updates;
    useEffect(() => {

        if (prop.propId === 'update') {
            const sessionToken = window.localStorage.getItem('employee-token');
            postService.getPost(putId, sessionToken)
                .then((form) => {
                    console.log(form.status, 'DATA RETURNED');

                    if (form.data !== undefined) {

                        let title = form.data.title;
                        let message = form.data.message;

                        getPostTitle(title);
                        getPostMessage(message);
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


        }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" value={postTitle} name="title" onInput={(ev) => {
            getPostTitle(ev.target.value);

        }} /></label><br />

            <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" value={postMessage} maxLength="342" minLength="12" onInput={(ev) => {
                getPostMessage(ev.target.value);

            }}></textarea></label><br />

            <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

            <input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
                ev.preventDefault();

                if (postMessage.length < 12 && postMessage.length !== 0 && postTitle.length !== 0) {
                    messageErrorRef.current.textContent = "Your post is too short !";
                }


                else if (postTitle !== '' && postMessage !== '' && prop.propId === 'update') {
                    let id = putId;
                    const sessionToken = window.localStorage.getItem('employee-token');
                    const employeeId = window.localStorage.getItem('employee-id');
                    postService.updatePosts(postTitle, postMessage, fileInputRef.current.files[0], id, sessionToken, employeeId)
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
                else {
                    messageErrorRef.current.textContent = "You didn't fill in the form !";
                }

            }} />
        </form>
            <p className="errors" ref={messageErrorRef}></p>
        </div>);
    }
}

export default UpdateForm;