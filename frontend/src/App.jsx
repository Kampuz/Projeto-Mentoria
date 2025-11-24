import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/Login";
import HomeMentor from "./pages/home/HomeMentor";
import HomeDiscente from "./pages/home/HomeDiscente"

import Discentes from "./pages/discente/Discentes";

import ListaMentores from "./pages/mentor/Mentores";
import CadastroMentor from "./pages/mentor/GerenciamentoMentores";

import ListaOportunidades from "./pages/oportunidade/Oportunidades";
import GerenciamentoOportunidades from "./pages/oportunidade/OportunidadesMentor";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/discente" element={<HomeDiscente />} />
        <Route path="/mentor" element={<HomeMentor />} />

        <Route path="/discentes" element={<Discentes />} />

        <Route path="/mentores" element={<ListaMentores />} />
        <Route path="/cadastro-mentor" element={<CadastroMentor />} />

        <Route path="/oportunidades" element={<ListaOportunidades />} />
        <Route path="/gerenciamento-oportunidade" element={<GerenciamentoOportunidades />} />
      </Routes>
    </>
  );
}
