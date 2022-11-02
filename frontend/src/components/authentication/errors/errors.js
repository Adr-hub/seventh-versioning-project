import React from 'react';
import './errors.scss';
const Errors = (props) => {
    if (props.error === 'wrong-email') {
        return (<React.Fragment><p className="email-errors" ref={props.paragraphClass}>You have to enter a valid email ! <br /><br /><strong>Here are some examples of valid email syntax :</strong></p> <ul><li>Firstname.Surname@example.com</li> <li>firstname.surname@example.fr</li> <li>Firstname.surname@example.fr</li></ul><ul><li>firstname.Surname@example.fr</li><li>username@example.com</li> <li>Username@example.fr</li></ul></React.Fragment>);
    }

    else if (props.error === 'long-email') {
        return (<React.Fragment><p className="email-errors" ref={props.paragraphClass}>Your email is too long !<br /><br />A valid email is between 10 and 70 characters long ! <br /><br /><strong>Here are some examples of valid email syntax :</strong></p><ul><li>Firstname.Surname@example.com</li><li>firstname.surname@example.fr</li><li>Firstname.surname@example.fr</li></ul><ul><li>firstname.Surname@example.fr</li><li>username@example.com</li><li>Username@example.fr</li></ul></React.Fragment>);
    }

    else if (props.error === 'short-email') {
        return (<React.Fragment><p className="email-errors" ref={props.paragraphClass}>Your email is too short !<br /><br /> A valid email is between 10 and 70 characters long !<br /><br /><strong>Here are some examples of valid email syntax :</strong></p> <ul><li>Firstname.Surname@example.com</li> <li>firstname.surname@example.fr</li><li>Firstname.surname@example.fr</li></ul><ul><li>firstname.Surname@example.fr</li><li>username@example.com</li><li>Username@example.fr</li></ul></React.Fragment>);
    }

    else if (props.error === 'wrong-password') {
        return (<React.Fragment><p className="password-errors" ref={props.paragraphClass}> You have to enter a valid password !<br /><br />Spaces are not allowed ! <br /><br /><strong>Here is also a list of unauthorize characters :</strong></p><ul><li>{'/'}</li><li>{';'}</li><li>{'{'}</li><li>{'}'}</li><li>{'<'}</li><li>{'>'}</li></ul></React.Fragment>);
    }

    else if (props.error === 'long-password') {
        return (<React.Fragment><p className="password-errors" ref={props.paragraphClass}>Your password is too long !<br /><br /> A valid password is between 7 and 45 characters long ! <br /><br /><strong>Here is also a list of unauthorize characters :</strong></p><ul><li>{'/'}</li><li>{';'}</li><li>{'{'}</li><li>{'}'}</li><li>{'<'}</li><li>{'>'}</li></ul></React.Fragment>);
    }

    else if (props.error === 'short-password') {
        return (<React.Fragment><p className="password-errors" ref={props.paragraphClass}>Your password is too short !<br /><br /> A valid password is between 7 and 45 characters long ! <br /><br /><strong>Here is also a list of unauthorize characters :</strong></p><ul><li>{'/'}</li><li>{';'}</li><li>{'{'}</li><li>{'}'}</li><li>{'<'}</li><li>{'>'}</li></ul></React.Fragment>);
    }

    else if (props.error === 'empty-form') {
        return (<p className="empty-form" ref={props.paragraphClass}>You have to fill in the form !</p>);
    }

    else if (props.error === 'empty-user') {
        return (<React.Fragment><p className="email-errors" ref={props.paragraphClass}>The email field is empty !<br /><br /> A valid email is between 10 and 70 characters long !<br /><br /><strong>Here are some examples of valid email syntax :</strong></p> <ul><li>Firstname.Surname@example.com</li> <li>firstname.surname@example.fr</li><li>Firstname.surname@example.fr</li></ul><ul><li>firstname.Surname@example.fr</li><li>username@example.com</li><li>Username@example.fr</li></ul></React.Fragment>);
    }

    else if (props.error === 'empty-pass') {
        return (<React.Fragment><p className="password-errors" ref={props.paragraphClass}> The password field is empty !<br /><br /><strong>Here is also a list of unauthorize characters :</strong></p><ul><li>{'/'}</li><li>{';'}</li><li>{'{'}</li><li>{'}'}</li><li>{'<'}</li><li>{'>'}</li></ul></React.Fragment>);
    }

    else if (props.error === 'valid-email') {
        return (<p className="valid" ref={props.paragraphClass}>The email is valid !</p>);
    }

    else if (props.error === 'valid-password') {
        return (<p className="valid" ref={props.paragraphClass}>The password is valid !</p>);
    }

    else if (props.error === 'empty') {
        return (<p className="valid" ref={props.paragraphClass}>No errors !</p>);
    }
    else if (props.error === 'other') {
        return (<p className="other" ref={props.paragraphClass}>{' '}</p>);
    }

    else {
        return (<p className='default' ref={props.paragraphClass}>No errors !</p>);
    }
}
export default Errors;