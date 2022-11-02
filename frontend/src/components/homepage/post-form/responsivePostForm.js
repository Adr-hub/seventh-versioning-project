import SharedIcons from '../../shared components/icons/icons';
import './responsivePostForm.scss';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../../../services/postService';
const ResponsivePostForm = (prop) => {
    let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState('');
    const [postMessage, getPostMessage] = useState('');
    const messageErrorRef = useRef();
    const fileInputRef = useRef();

    return (<div className='responsiveFormContainer'><p className='responsiveNotification'>Add a post !</p><form encType="multipart/form-data" onChange={(ev) => {

        if (messageErrorRef.current !== undefined) {
            messageErrorRef.current.textContent = '';
        }
    }}><label htmlFor="responsiveTitle"><SharedIcons propId="title" />Title<br /><input type="text" id="responsiveTitle" name="title" onInput={(ev) => {
        getPostTitle(ev.target.value);
    }} /></label><br />

        <label htmlFor="responsiveContent"><SharedIcons propId="text" />Content<br /><textarea id="responsiveContent" name="message" maxLength="262" minLength="12" onInput={(ev) => {
            getPostMessage(ev.target.value);
        }}></textarea></label><br />

        <label htmlFor="responsiveImages"><SharedIcons propId="images" />Image<br /><input type="file" id="responsiveImages" name="image" ref={fileInputRef} /></label><br />

        <div className='respSubmitButtonContainer'><input type="submit" value="Create the Post !" className='respPostButton' onClick={(ev) => {
            ev.preventDefault();

            if (postMessage.length < 12 && postMessage.length !== 0 && postTitle.length !== 0) {
                messageErrorRef.current.textContent = "Your post is too short !";
            }

            else if (postTitle !== '' && postMessage !== '') {

                postService.postsPost(postTitle, postMessage, fileInputRef.current.files[0])
                    .then((value) => {
                        console.log(value.status, 'RESPONSE');
                        ev.preventDefault();
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
        <p className="respErrors" ref={messageErrorRef}></p>
    </div>);
}
export default ResponsivePostForm;