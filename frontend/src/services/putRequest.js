import axiosPutRequest from 'axios';
const updatePosts = (title, message, image, postId) => {
    let put = axiosPutRequest({
        method: 'put',
        url: 'http://localhost:4200/homepage/post',

        data: {
            title: title,
            message: message,
            image: image,
            postId: postId
        }
    })
    return put;
}
export default updatePosts;