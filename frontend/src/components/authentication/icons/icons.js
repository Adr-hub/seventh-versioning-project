import './icons.scss';
const Icons = (props) => {

    if (props.propId === "userProp") {
        return (<span className="firstIconContainer"><i className="far fa-user"></i></span>);
    }

    if (props.propId === "passwordProp") {
        return (<span className="secondIconContainer"><i className="fas fa-lock"></i></span>);
    }
}

export default Icons;