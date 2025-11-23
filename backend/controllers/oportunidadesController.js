import { getOportunidades, criarOportunidade } from "../models/oportunidadesModel";

export async function listarOportunidades(req, res) {
    try {
        const dados = await getOportunidades();
        res.json(dados);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

export async function adicionarOportunidade(req, res) {
    try {
        const id = await criarOportunidade(req.body);
        res.status(201).json({ id_oportunidade: id });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
    
}