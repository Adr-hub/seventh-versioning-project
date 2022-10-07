import HomePageIcons from '../icons/homepageIcons';
import './responsivePostForm.scss';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import postsPost from '../../../services/postRequests';
const ResponsivePostForm = () => {
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

        <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" onInput={(ev) => {
            getPostMessage(ev.target.value);
        }}></textarea></label><br />

        <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

        <input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
            ev.preventDefault();

            if (postTitle !== '' && postMessage !== '') {

                postsPost(postTitle, postMessage, fileInputRef.current.files[0])
                    .then((value) => {
                        console.log(value.status, 'RESPONSE');

                        postCreation('/homepage');
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
        }} />
    </form>
        <p className="errors" ref={messageErrorRef}></p>
    </div>);
}
export default ResponsivePostForm;