import './icons.scss';
const SharedIcons = (props) => {
    let heart = props.heart;
    if (heart) {
        return (<span className="likeContainer"><i className="far fa-heart"></i></span >);
    }

    if (props.propId === "title") {
        return (<span className="iconContainers"><i className="fas fa-smile-beam"></i></span>);
    }

    if (props.propId === "description") {
        return (<span className="iconContainers"><i className="far fa-comment"></i></span>);
    }

    if (props.propId === "text") {
        return (<span className="iconContainers"><i className="far fa-newspaper"></i></span>);
    }

    if (props.propId === "images") {
        return (<span className="iconContainers"><i className="fas fa-images"></i></span>);
    }

    if (props.propId === "likes") {
        return (<span className="likeContainer"><i className="far fa-heart"></i></span >);
    }
}

export default SharedIcons;