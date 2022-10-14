import axiosResponsivePutRequests from 'axios';
const updateResponsivePosts = (title, message, image, id) => {
    let newData = new FormData();
    newData.append('title', title);
    newData.append('message', message);
    newData.append('image', image);

    if (newData.get('image') !== null || newData.get('image') === null) {
        let put = axiosResponsivePutRequests({
            method: 'put',
            url: 'http://localhost:4200/homepage/update/' + id,

            data: newData
        })
        return put;
    }
}
export default updateResponsivePosts;