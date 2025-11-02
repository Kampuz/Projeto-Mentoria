import { useState, useEffect } from "react";
import { getMentores, addMentor } from "./api";
import MentorList from "./components/MentorList";

export default function App() {
    const [mentores, setMentores] = useState([]);
    const [form, setForm] = useState({ nome: "", area: "", email: "" });

    useEffect(() => {
        getMentores().then(setMentores);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addMentor(form);
        setForm({ nome: "", area: "", email: ""});
        setMentores(await getMentores());
    };

    return (
        <div>
            <h1>Mentoria</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}></input>
                <input placeholder="Área" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}></input>
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}></input>
                <button type="submit">Cadastrar</button>
            </form>
            <MentorList mentores={mentores}/>
        </div>
    );
}