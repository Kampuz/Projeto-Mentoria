import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MarcarEncontro from "./pages/MarcarEncontro";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marcar-encontro" element={<MarcarEncontro />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}
