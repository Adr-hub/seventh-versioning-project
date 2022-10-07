import axiosGetRequest from 'axios'
const getPosts = axiosGetRequest('http://localhost:4200/homepage/all');
export default getPosts;
