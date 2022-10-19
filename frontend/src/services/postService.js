import axiosRequests from 'axios';

const getPosts = (authorization) => {
    let homepagePosts = axiosRequests('http://localhost:4200/homepage/all', { headers: { 'Authorization': 'Bearer ' + authorization } });
    return homepagePosts;
}

const postsPost = (title, message, image, authorization, employeeId) => {
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
            headers: { 'Authorization': 'Bearer ' + authorization }
        })
        return posts;
    }
}

const updatePosts = (title, message, image, postId, authorization, employeeId) => {
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
            headers: { 'Authorization': 'Bearer ' + authorization }
        })
        return put;
    }
}

const updateResponsivePosts = (title, message, image, id, authorization, employeeId) => {
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
            headers: { 'Authorization': 'Bearer ' + authorization }
        })
        return put;
    }
}

const deletePosts = (id, authorization, employeeId) => {
    let deletes = axiosRequests({
        method: 'delete',
        url: 'http://localhost:4200/homepage/delete',
        data: {
            id: id,
            employeeId: employeeId
        },
        headers: { 'Authorization': 'Bearer ' + authorization }
    })
    return deletes;
}

const getPost = (id, authorization) => {
    let post = axiosRequests('http://localhost:4200/homepage/post/' + id, {
        headers: { 'Authorization': 'Bearer ' + authorization }
    })
    return post;
}

const postService = { getPosts, postsPost, updatePosts, updateResponsivePosts, deletePosts, getPost };

export default postService;