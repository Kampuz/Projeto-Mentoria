import { Link } from "react-router-dom";
import "../styles/NavBar.css"
export default function Navbar() {
  return (
    <nav>
      <Link to="/mentor">Home Mentor</Link> |{" "}
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}