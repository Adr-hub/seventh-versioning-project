import HomePageIcons from '../icons/homepageIcons';
import './responsivePostForm.scss';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import postsPost from '../../../services/postRequests';
const ResponsivePostForm = (prop) => {
    let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState('');
    const [postMessage, getPostMessage] = useState('');
    const messageErrorRef = useRef();
    const fileInputRef = useRef();

    return (<div className='responsiveFormContainer'><p className='notification'>Add a post !</p><form encType="multipart/form-data" onChange={(ev) => {

        if (messageErrorRef.current !== undefined) {
            messageErrorRef.current.textContent = '';
        }
    }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" name="title" onInput={(ev) => {
        getPostTitle(ev.target.value);
    }} /></label><br />

        <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" maxLength="262" minLength="12" onInput={(ev) => {
            getPostMessage(ev.target.value);
        }}></textarea></label><br />

        <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

        <div className='submitButtonContainer'><input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
            ev.preventDefault();

            if (postMessage.length < 12 && postMessage.length !== 0 && postTitle.length !== 0) {
                messageErrorRef.current.textContent = "Your post is too short !";
            }

            else if (postTitle !== '' && postMessage !== '') {

                postsPost(postTitle, postMessage, fileInputRef.current.files[0])
                    .then((value) => {
                        console.log(value.status, 'RESPONSE');
                        postCreation(0);
                    })

                    .catch((error) => {

                        if (postTitle !== '' || postMessage !== '') {
                            getPostTitle('');
                            getPostMessage('');
                        }

                        messageErrorRef.current.textContent = 'Error ! ' + error.message + ' !';

                    });
            }

            else {

                messageErrorRef.current.textContent = "You didn't fill in the form !";
            }

        }} /></div>
    </form>
        <p className="errors" ref={messageErrorRef}></p>
    </div>);
}
export default ResponsivePostForm;