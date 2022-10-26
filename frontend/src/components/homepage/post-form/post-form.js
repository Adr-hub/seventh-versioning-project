import HomePageIcons from '../../shared components/icons/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import './post-form.scss';
import postService from '../../../services/postService';
const PostForm = (prop) => {
    let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState('');
    const [postMessage, getPostMessage] = useState('');
    const messageErrorRef = useRef();
    const fileInputRef = useRef();

    if (prop.propId === '' || prop.propId === 'unanimate') {
        return undefined;
    }
    else if (prop.propId === 'animate' || prop.propId === 'modify') {

        if (postMessage.length >= 341) {
            messageErrorRef.current.textContent = "Your post is too long ! 342 characters allowed.";
        }

        return (<div className='postFormContainer'><form method='post' encType="multipart/form-data" onChange={(ev) => {

            if (messageErrorRef.current !== undefined) {
                messageErrorRef.current.textContent = '';
            }
        }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" name="title" onInput={(ev) => {
            getPostTitle(ev.target.value);

        }} /></label><br />

            <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" maxLength="342" minLength="12" onInput={(ev) => {
                getPostMessage(ev.target.value);
            }}></textarea></label><br />

            <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

            <input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
                ev.preventDefault();


                if (postMessage.length < 12 && postMessage.length !== 0 && postTitle.length !== 0) {
                    messageErrorRef.current.textContent = "Your post is too short !";
                }

                else if (postTitle !== '' && postMessage !== '' && prop.propId === 'animate') {

                    postService.postsPost(postTitle, postMessage, fileInputRef.current.files[0])
                        .then((value) => {
                            console.log(value.status, 'RESPONSE');
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
export default PostForm;