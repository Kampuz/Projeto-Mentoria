import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Mentores from "./pages/Mentoria";
import PerfilMentor from "./pages/PerfilMentor";
import PerfilAluno from "./pages/PerfilAluno";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentores" element={<Mentores />} />
        <Route path="/perfil-mentor" element={<PerfilMentor mentorId={3} />} />
        <Route path="/perfil-aluno" element={<PerfilAluno alunoId={1} />} />
      </Routes>
    </>
  );
}
