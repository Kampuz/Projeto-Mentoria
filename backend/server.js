import express from "express";
import cors from "cors";
import mentoresRouter from "./routes/mentores.js"

const app = express();
app.use(cors())
app.use(express.json());

app.use("/mentores", mentoresRouter);

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));