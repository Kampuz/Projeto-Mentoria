import pool from "../db"


// Buscar todas as oportunidades
export async function getOportunidades() {
    const [rows] = await pool.query(`
        SELECT
            id_oportunidade,
            tipo,
            titulo,
            descricao,
            requisitos,
            data_publicacao,
            data_limite,
            link
        FROM oportunidades
        ORDER BY data_publicacao DESC
        `);
    return rows
}

// Criar nova oportunidade
export async function criarOportunidade(data) {
    const sql = `
        INSERT INTO oportunidades
        (tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        data.tipo,
        data.titulo,
        data.descricao,
        data.requisitos,
        data.data_publicacao,
        data.data_limite,
        data.link
    ];

    const [result] = await pool.query(sql, params);
    return result.insertId;
}