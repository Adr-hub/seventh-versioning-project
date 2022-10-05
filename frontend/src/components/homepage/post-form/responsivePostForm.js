import HomePageIcons from '../icons/homepageIcons';
import axiosPostRequest from 'axios';
import './responsivePostForm.scss';
import { useNavigate } from 'react-router-dom';
const ResponsivePostForm = () => {
    let postCreation = useNavigate();
    return (<div className='responsiveFormContainer'><p className='notification'>Add a post !</p><form encType="multipart/form-data" onChange={(ev) => {

        if (document.querySelector('form+p') !== null) {
            document.querySelector('form+p').textContent = '';
        }
    }}><label htmlFor="title"><HomePageIcons propId="title" />Title<br /><input type="text" id="title" /></label><br />
        <label htmlFor="content"><HomePageIcons propId="text" />Content<br /><textarea id="content"></textarea></label><br />
        <label htmlFor="images"><HomePageIcons propId="images" />Image<br /><input type="file" id="images" /></label><br />
        <label htmlFor="description"> <HomePageIcons propId="description" />Description<br /><input type="text" id="description" /></label><br />
        <input type="submit" value="Create the Post !" className='postButton' onClick={(ev) => {
            ev.preventDefault();
            if (document.getElementById('title').value !== '' && document.getElementById('content').value !== '' && document.getElementById('description').value !== '') {

                axiosPostRequest({
                    method: 'post',
                    url: 'http://localhost:4200/homepage/post',

                    data: {
                        title: document.getElementById('title').value,
                        message: document.getElementById('content').value,
                        image: document.getElementById('images').files[0],
                        description: document.getElementById('description').value
                    }

                })

                    .then((value) => {
                        console.log(value.status, 'RESPONSE');
                        if (value.status === 201) {

                            postCreation('homepage');
                        }

                    })
                    .catch((error) => {

                        if (document.getElementById('title').value !== '' || document.getElementById('content').value !== '' || document.getElementById('image').value !== '' || document.getElementById('description').value !== '') {
                            document.getElementById('title').value = '';
                            document.getElementById('content').value = '';
                            document.getElementById('image').value = '';
                            document.getElementById('description').value = '';

                        }

                        document.querySelector('.no-errors').classList.replace('no-errors', 'errors').textContent = 'Error ! ' + error.message + ' !';

                    })
            }
            else {
                document.querySelector('.errors').textContent = "You didn't fill in the form !"
            }
        }} />
    </form>
        <p className="errors"></p>
    </div>);

}
export default ResponsivePostForm;