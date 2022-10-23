import axiosRequests from 'axios';

const getPosts = () => {

    const sessionToken = window.localStorage.getItem('employee-token');

    let homepagePosts = axiosRequests('http://localhost:4200/homepage/all', { headers: { 'Authorization': 'Bearer ' + sessionToken } });
    return homepagePosts;
}

const postsPost = (title, message, image) => {

    const sessionToken = window.localStorage.getItem('employee-token');
    const employeeId = window.localStorage.getItem('employee-id');

    let formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('image', image);
    formData.append('employeeId', employeeId);
    if (formData.get('image') !== null || formData.get('image') === null) {
        let posts = axiosRequests({
            method: 'post',
            url: 'http://localhost:4200/homepage/posts',

            data: formData,
            headers: { 'Authorization': 'Bearer ' + sessionToken }
        })
        return posts;
    }
}

const updatePosts = (title, message, image, postId) => {

    const sessionToken = window.localStorage.getItem('employee-token');
    const employeeId = window.localStorage.getItem('employee-id');

    let newData = new FormData();
    newData.append('title', title);
    newData.append('message', message);
    newData.append('image', image);
    newData.append('postId', postId);
    newData.append('employeeId', employeeId);
    if (newData.get('image') !== null || newData.get('image') === null) {
        let put = axiosRequests({
            method: 'put',
            url: 'http://localhost:4200/homepage/update',

            data: newData,
            headers: { 'Authorization': 'Bearer ' + sessionToken }
        })
        return put;
    }
}

const updateResponsivePosts = (title, message, image, id) => {

    const sessionToken = window.localStorage.getItem('employee-token');
    const employeeId = window.localStorage.getItem('employee-id');

    let newData = new FormData();
    newData.append('title', title);
    newData.append('message', message);
    newData.append('image', image);
    newData.append('employeeId', employeeId);

    if (newData.get('image') !== null || newData.get('image') === null) {
        let put = axiosRequests({
            method: 'put',
            url: 'http://localhost:4200/homepage/update/' + id,

            data: newData,
            headers: { 'Authorization': 'Bearer ' + sessionToken }
        })
        return put;
    }
}

const deletePosts = (id) => {

    const sessionToken = window.localStorage.getItem('employee-token');
    const employeeId = window.localStorage.getItem('employee-id');

    let deletes = axiosRequests({
        method: 'delete',
        url: 'http://localhost:4200/homepage/delete',
        data: {
            id: id,
            employeeId: employeeId
        },
        headers: { 'Authorization': 'Bearer ' + sessionToken }
    })
    return deletes;
}

const getPost = (id) => {

    const sessionToken = window.localStorage.getItem('employee-token');

    let post = axiosRequests('http://localhost:4200/homepage/post/' + id, {
        headers: { 'Authorization': 'Bearer ' + sessionToken }
    })
    return post;
}

const postLikes = (id) => {

    const sessionToken = window.localStorage.getItem('employee-token');
    const employeeId = window.localStorage.getItem('employee-id');

    let likes = axiosRequests({
        method: 'post',
        url: 'http://localhost:4200/homepage/likes',

        data: {
            postId: id,
            employeeId: employeeId
        },
        headers: { 'Authorization': 'Bearer ' + sessionToken }
    })
    return likes;
}


const postService = { getPosts, postsPost, updatePosts, updateResponsivePosts, deletePosts, getPost, postLikes };

export default postService;