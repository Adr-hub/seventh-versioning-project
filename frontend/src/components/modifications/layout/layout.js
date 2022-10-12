import './layout.scss';
import HomePageIcons from '../../homepage/icons/homepageIcons';
import Footer from "../../shared components/footer/footer"
import { useState, useRef } from 'react';
import { useLocation/*, useNavigate*/ } from 'react-router-dom';
import updateResponsivePosts from '../../../services/responsivePutRequests';
const Modifications = (prop) => {
    // let postCreation = useNavigate();
    const [postTitle, getPostTitle] = useState('');
    const [postMessage, getPostMessage] = useState('');
    const messageErrorRef = useRef();
    const fileInputRef = useRef();
    const locate = useLocation();

    return (<><div className='responsiveModificationFormContainer'><p id='notification'>Modify your post !</p><form encType="multipart/form-data" onChange={(ev) => {

        if (messageErrorRef.current !== undefined) {
            messageErrorRef.current.textContent = '';
        }
    }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" name="title" onInput={(ev) => {
        getPostTitle(ev.target.value);
    }} /></label><br />

        <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content" name="message" minLength="12" maxLength="262" onInput={(ev) => {
            getPostMessage(ev.target.value);
        }}></textarea></label><br />

        <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" name="image" ref={fileInputRef} /></label><br />

        <div className='submitButtonContainer'><input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
            ev.preventDefault();

            if (postTitle !== '' && postMessage !== '' && postMessage.length > 12 && postMessage.length <= 341) {
                let id = locate.pathname.split('modifications/')[1];
                updateResponsivePosts(postTitle, postMessage, fileInputRef.current.files[0], id)
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

export default Modifications;