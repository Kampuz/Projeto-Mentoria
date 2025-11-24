import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registro from "./pages/login/Registro";

import HomeMentor from "./pages/home/HomeMentor";
import HomeDiscente from "./pages/home/HomeDiscente"

import Discentes from "./pages/discente/Discentes";
import Mentores from "./pages/mentor/Mentores";

import ListaOportunidades from "./pages/oportunidade/Oportunidades";
import GerenciamentoOportunidades from "./pages/oportunidade/OportunidadesMentor";

import Atividades from "./pages/atividade/Atividades";
import GerenciamentoAtividades from "./pages/atividade/AtividadesMentor";

import PerfilUsuario from "./pages/perfil/Perfil";

import GerenciamentoDisciplina from "./pages/disciplina/GerenciamentoDisciplina"
import GerenciamentoRecados from "./pages/disciplina/GerenciamentoRecados"
import Recados from "./pages/disciplina/Recados"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registro />} />

        <Route path="/" element={<Home />} />
        <Route path="/discente" element={<HomeDiscente />} />
        <Route path="/mentor" element={<HomeMentor />} />

        <Route path="/discentes" element={<Discentes />} />
        <Route path="/mentores" element={<Mentores />} />

        <Route path="/oportunidades" element={<ListaOportunidades />} />
        <Route path="/gerenciamento-oportunidades" element={<GerenciamentoOportunidades />} />

        <Route path="/atividades" element={<Atividades />} />
        <Route path="/gerenciamento-atividades" element={<GerenciamentoAtividades />} />

        <Route path="/perfil" element={<PerfilUsuario userId={localStorage.getItem("userId")} />} />

        <Route path="/recados" element={<Recados />} />
        <Route path="/gerenciamento-disciplinas" element={<GerenciamentoDisciplina />} />
        <Route path="/gerenciamento-disciplinas/:id" element={<GerenciamentoRecados />} />
      </Routes>
    </>
  );
}
