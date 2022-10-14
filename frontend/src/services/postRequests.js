import axiosPostRequest from 'axios';
const postsPost = (title, message, image) => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('image', image);
    if (formData.get('image') !== null || formData.get('image') === null) {
        let posts = axiosPostRequest({
            method: 'post',
            url: 'http://localhost:4200/homepage/posts',

            data: formData
        })
        return posts;
    }
}
export default postsPost;