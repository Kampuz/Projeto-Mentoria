import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import "../styles/navbar.css";

export default function NavBar() {
    return(
        <nav className='navbar'>
            <div className='navbar-left'>
                <h2>Mentorship App</h2>
            </div>
            <div className='navbar-center'>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <div className='navbar-right'>
                <ProfileButton />
            </div>
        </nav>
    );
}