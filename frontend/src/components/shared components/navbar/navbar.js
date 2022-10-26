import './navbar.scss';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    let locate = useLocation();


    return (<nav className={locate.pathname === '/list' ? 'postLinkNavBar' : 'navBar'}><Link to={locate.pathname === '/list' ? '/homepage' : '/list'} className='listLink'>{locate.pathname === '/homepage' ? 'MY POST LIST' : 'ALL POSTS'}</Link><Link to="/intranet" replace className='logoutLink' onClick={(ev) => {
        window.localStorage.clear();
    }}>LOGOUT</Link></nav>)
};

export default Navbar;
