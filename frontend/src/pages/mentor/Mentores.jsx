import { useEffect, useState } from "react";

export default function ListaMentores() {
    const [mentores, setMentores] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/mentores")
        .then(r => r.json())
        .then(d => setMentores(d));
    }, []);

    return (
        <div>
            <h1>Mentores</h1>

            <table border="1" cellPadding="6" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {mentores.map(m => (
                        <tr key={m.nome}>
                            <td>{m.nome}</td>
                            <td>{m.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}