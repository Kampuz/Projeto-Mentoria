import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/mentores">Mentores</Link> |{" "}
      <Link to="/perfil-mentor">Meu Perfil</Link>
    </nav>
  );
}