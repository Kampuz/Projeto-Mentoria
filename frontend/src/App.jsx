import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeMentor from "./pages/mentor/HomeMentor";
import HomeDiscente from "./pages/discente/HomeDiscente"

import ListaDiscentes from "./pages/discente/Discentes";
import CadastroDiscente from "./pages/discente/CadastroDiscente";

import ListaMentores from "./pages/mentor/Mentores";
import CadastroMentor from "./pages/mentor/CadastroMentor";

import ListaOportunidades from "./pages/oportunidade/Oportunidades";
import CadastroOportunidade from "./pages/oportunidade/OportunidadesMentor";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/discente" element={<HomeDiscente />} />
        <Route path="/mentor" element={<HomeMentor />} />

        <Route path="/discentes" element={<ListaDiscentes />} />
        <Route path="/cadastro-discente" element={<CadastroDiscente />} />

        <Route path="/mentores" element={<ListaMentores />} />
        <Route path="/cadastro-mentor" element={<CadastroMentor />} />

        <Route path="/oportunidades" element={<ListaOportunidades />} />
        <Route path="/cadastro-oportunidade" element={<CadastroOportunidade />} />
      </Routes>
    </>
  );
}
