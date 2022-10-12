import axiosDeleteRequest from 'axios';
const deletePosts = (id) => {
    let deletes = axiosDeleteRequest({
        method: 'delete',
        url: 'http://localhost:4200/homepage/posts',
        data: {
            id: id
        }
    })
    return deletes;
}
export default deletePosts;