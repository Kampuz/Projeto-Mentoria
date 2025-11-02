import { Link } from "react-router-dom";
import "../styles/ProfileButton.css";

export default function ProfileButton() {
  return (
    <Link to="/profile" className="profile-btn">
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        alt="Profile"
      />
    </Link>
  );
}
