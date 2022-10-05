import './footer.scss';
import footerImage from '../../../images/icon-left-font-monochrome-white.png';
const Footer = () => {
    return <footer className='footer'><img src={footerImage} alt='Groupomania' width="120" height="120" /><span>{Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format()}</span></footer>
}
export default Footer;