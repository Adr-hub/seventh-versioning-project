import './footer.scss';
import { useRef } from 'react';
import footerImage from '../../../images/icon-left-font-monochrome-white.png';
const Footer = (prop) => {
    const footerRef = useRef();
    if (prop.modifications && window.innerWidth > 992) {
        return undefined;
    }

    if (prop.modifications && window.innerWidth <= 992) {
        return <footer className='footer'><img src={footerImage} alt='Groupomania' width="120" height="120" /><span>{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format()}</span></footer>
    }

    if (!prop.modifications) {
        return <footer className='footer' ref={footerRef}><img src={footerImage} alt='Groupomania' width="120" height="120" /><span>{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format()}</span></footer>
    }
}
export default Footer;