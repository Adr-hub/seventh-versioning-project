import axiosPostRequest from 'axios';
const getPost = (id) => {
    let post = axiosPostRequest('http://localhost:4200/homepage/post/' + id)
    return post;
}
export default getPost;