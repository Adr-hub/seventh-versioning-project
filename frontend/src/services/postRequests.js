import axiosPostRequest from 'axios';
const postsPost = (title, message, image) => {
    let posts = axiosPostRequest({
        method: 'post',
        url: 'http://localhost:4200/homepage/posts',

        data: {
            title: title,
            message: message,
            image: image
        }
    })
    return posts;
}
export default postsPost;