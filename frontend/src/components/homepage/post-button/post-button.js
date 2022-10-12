import './post-button.scss';
const Button = (prop) => {

    return (<div className="buttonContainer"><button onClick={(ev) => {
        let animate = prop.propId;
        let form = prop.propForm;
        if (ev.detail >= 1 && form !== 'animate' && form !== 'modify') {
            animate('animate');
            ev.target.textContent = 'HIDE FORM';
        }
        if (ev.detail >= 1 && form === 'animate') {
            animate('unanimate');
            ev.target.textContent = 'POST FORM';
        }
        if (ev.detail >= 1 && form === 'modify') {
            ev.preventDefault();
        }

    }}>POST FORM</button></div>)
};
export default Button;  