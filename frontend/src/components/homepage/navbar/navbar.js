import './navbar.scss';
import { Link } from "react-router-dom";
const Navbar = () => {
    return (<nav><Link to="/list" className='listLink'>MY POST LIST</Link><Link to="/intranet" className='logoutLink'>LOGOUT</Link></nav>)
};

export default Navbar;
