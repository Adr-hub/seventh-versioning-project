import axiosPutRequest from 'axios';
const updatePosts = (title, message, image, postId) => {
    let newData = new FormData();
    newData.append('title', title);
    newData.append('message', message);
    newData.append('image', image);
    newData.append('postId', postId)

    if (newData.get('image') !== null || newData.get('image') === null) {
        let put = axiosPutRequest({
            method: 'put',
            url: 'http://localhost:4200/homepage/update',

            data: newData
        })

        return put;
    }
}
export default updatePosts;