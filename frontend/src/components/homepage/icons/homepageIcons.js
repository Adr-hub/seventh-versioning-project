import './homepageIcons.scss';
const HomePageIcons = (props) => {

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
}

export default HomePageIcons;