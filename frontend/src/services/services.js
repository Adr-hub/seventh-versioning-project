import axiosRequests from 'axios';
import { useNavigate } from 'react-router-dom';
import testImage from '../images/icon.png';
const registration = axiosRequests({
    method: 'post',
    url: 'http://localhost:4200/intranet/auth/signUp',

    data: {
        email: document.getElementById('user').value,
        password: document.getElementById('pass').value
    }

})
    .then((value) => {
        console.log(value.status, 'RESPONSE');
        if (value.status === 201) {
            const navigation = useNavigate();
            navigation('/homepage');
        }

    })
    .catch((error) => {

        if (document.getElementById('user').value !== '' || document.getElementById('pass').value !== '') {
            document.getElementById('user').value = '';
            document.getElementById('pass').value = '';
        }

        document.querySelector('.passLabel+.other').textContent = 'Registration error ! ' + error.message + ' !';

    });

const postRequest = axiosRequests({
    method: 'post',
    url: 'http://localhost:4200/homepage/post',

    data: {
        title: document.getElementById('title').value,
        message: document.getElementById('content').value,
        image: document.getElementById('images').files[0],
        description: document.getElementById('description').value
    }

})

    .then((value, postCreation) => {
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

    });

const getRequest = axiosRequests('http://localhost:4200/homepage/all')

    .then((data) => {
        console.log(data.status, 'RESPONSE');
        if (data.status === 201) {
            const dataArray = data.data;
            dataArray.map((data) => {
                return (<div className="postContainer" key={data._id}><div className="postTitle">{data.title}</div>
                    <div className="postContent">
                        <div className="postText"><p>{data.message}</p></div><div className="postImage"><img alt="" src={testImage} />
                        </div>
                    </div>
                    <div className="postInformations"><span className="postDescription">{data.description}</span><span className="postDate">{data.date}</span></div>
                </div>)
            })
        }

    })
    .catch((error) => {
        console.error(error);

    })



export { registration, postRequest, getRequest };