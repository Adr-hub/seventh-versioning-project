import axiosResponsivePutRequests from 'axios';
const updateResponsivePosts = (title, message, image, id) => {
    let put = axiosResponsivePutRequests({
        method: 'put',
        url: 'http://localhost:4200/homepage/posts/' + id,

        data: {
            title: title,
            message: message,
            image: image,
        }
    })
    return put;
}
export default updateResponsivePosts;