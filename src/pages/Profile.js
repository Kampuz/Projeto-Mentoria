import { Link } from 'react-router-dom';

export default function Profile() {
    return(
        <div className='App'>
            <h2>Welcome to your profile!</h2>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
}