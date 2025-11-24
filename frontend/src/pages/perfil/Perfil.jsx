import { useEffect, useState } from "react";

export default function PerfilUsuario() {
  const [perfil, setPerfil] = useState(null);

  // Pegue o id do usuário logado (exemplo: localStorage ou contexto)
  const userId = localStorage.getItem("userId"); // OU outro lugar onde você guarda o id

  useEffect(() => {
    if (!userId) return; // Evita fazer requisição com null

    async function carregarPerfil() {
      try {
        const resp = await fetch(`http://localhost:3000/api/perfil/${userId}`);
        if (!resp.ok) throw new Error("Erro ao carregar perfil");
        const data = await resp.json();
        setPerfil(data);
      } catch (err) {
        console.error(err);
      }
    }

    carregarPerfil();
  }, [userId]);

  if (!perfil) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Perfil de {perfil.nome}</h1>
      <p>Email: {perfil.email}</p>
      {/* Renderize mais informações */}
    </div>
  );
}
