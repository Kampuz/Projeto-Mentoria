import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/marcar-encontro">Marcar Encontro</Link>
      <Link to="/perfil">Meu Perfil</Link>
    </nav>
  );
}
