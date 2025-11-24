import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login"); // se não tiver usuário logado, redireciona
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove os dados do usuário
    navigate("/login"); // redireciona para login
  };

  if (!user) return null;

  return (
    <div className="perfil-container">
      <h1>Perfil do Usuário</h1>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Tipo:</strong> {user.tipo}</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
