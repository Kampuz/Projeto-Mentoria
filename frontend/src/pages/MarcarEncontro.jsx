import { useState } from "react";
import "../styles/MarcarEncontro.css"

export default function MarcarEncontro() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [monitor, setMonitor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ monitor, data, hora });
    alert(`Encontro marcado com ${monitor} em ${data} às ${hora}`);
  };

  return (
    <div>
      <h1>Marcar Encontro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Monitor:
          <input
            type="text"
            value={monitor}
            onChange={(e) => setMonitor(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Data:
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Hora:
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Marcar</button>
      </form>
    </div>
  );
}
