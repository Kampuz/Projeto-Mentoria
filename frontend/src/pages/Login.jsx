import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@unesp.br")) {
        alert("Use um email @unesp.br");
        return;
    }
    
    alert(`Login com ${email} e senha ${senha}`);
  };

  const handleGoogleLogin = () => {
    alert("Login com Google (simulado)");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      <hr />
      <button className="google-btn" onClick={handleGoogleLogin}>
        Entrar com Google
      </button>
    </div>
  );
}
