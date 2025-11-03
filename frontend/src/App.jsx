import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Mentores from "./pages/Mentoria";
import Perfil from "./pages/Perfil";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentores" element={<Mentores />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}
