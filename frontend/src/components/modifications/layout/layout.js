import './layout.scss';
import HomePageIcons from '../../homepage/icons/homepageIcons';
import Footer from "../../shared components/footer/footer"
import { useState, useRef, useEffect } from 'react';
import { useLocation/*, useNavigate*/ } from 'react-router-dom';
import postService from '../../../services/postService';
const Modifications = (prop) => {
    // let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState();
    const [postMessage, getPostMessage] = useState();
    const messageErrorRef = useRef();
    const fileInputRef = useRef();
    const locate = useLocation();
    let id = locate.pathname.split('modifications/')[1];


    useEffect(() => {
        const sessionToken = window.localStorage.getItem('employee-token');
        postService.getPost(id, sessionToken)
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

    }, [id]);

    if (postTitle !== undefined && postMessage !== undefined) {
        return (<><div className='responsiveModificationFormContainer'><p className='notification'>Modify your post !</p><form encType="multipart/form-data" onChange={(ev) => {

            if (messageErrorRef.current !== undefined) {
                messageErrorRef.current.textContent = '';
            }
        }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" name="title" value={postTitle} onInput={(ev) => {
            getPostTitle(ev.target.value);
        }} /></label><br />

            <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" minLength="12" maxLength="262" value={postMessage} onInput={(ev) => {
                getPostMessage(ev.target.value);
            }}></textarea></label><br />

            <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

            <div className='submitButtonContainer'><input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
                ev.preventDefault();

                if (postMessage.length < 12 && postMessage.length !== 0 && postTitle.length !== 0) {
                    messageErrorRef.current.textContent = "Your post is too short !";
                }

                else if (postTitle !== '' && postMessage !== '') {
                    let id = locate.pathname.split('modifications/')[1];
                    const sessionToken = window.localStorage.getItem('employee-token');
                    const employeeId = window.localStorage.getItem('employee-id');
                    postService.updateResponsivePosts(postTitle, postMessage, fileInputRef.current.files[0], id, sessionToken, employeeId)
                        .then((value) => {
                            console.log(value.status, 'RESPONSE');
                            ev.preventDefault();

                            window.location.replace('/homepage');
                            // postCreation('/homepage');
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
            }} /></div>
        </form>
            <p className="errors" ref={messageErrorRef}></p>
        </div><Footer modifications={true} /></>);
    };
}
export default Modifications;