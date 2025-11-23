import { useEffect, useState } from "react";

export default function ListaDiscentes() {
    const [discentes, setDiscentes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/discentes")
        .then(r => r.json())
        .then(d => setDiscentes(d));
    }, []);

    return (
        <div>
            <h1>Discentes</h1>

            <table border="1" cellPadding="6" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {discentes.map(d => (
                        <tr key={d.nome}>
                            <td>{d.nome}</td>
                            <td>{d.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}