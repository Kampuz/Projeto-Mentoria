DELIMITER $$

-- ============================================================
--  CRUD DISCIPLINAS
-- ============================================================

CREATE PROCEDURE sp_listar_disciplinas()
BEGIN
    SELECT * FROM disciplinas;
END $$

CREATE PROCEDURE sp_obter_disciplina(IN p_id INT)
BEGIN
    SELECT * FROM disciplinas WHERE id_disciplina = p_id;
END $$

CREATE PROCEDURE sp_criar_disciplina(
    IN p_nome VARCHAR(255),
    IN p_curso VARCHAR(255),
    IN p_professor VARCHAR(255)
)
BEGIN
    INSERT INTO disciplinas (nome, curso, professor)
    VALUES (p_nome, p_curso, p_professor);
END $$

CREATE PROCEDURE sp_atualizar_disciplina(
    IN p_id INT,
    IN p_nome VARCHAR(255),
    IN p_curso VARCHAR(255),
    IN p_professor VARCHAR(255)
)
BEGIN
    UPDATE disciplinas
    SET nome = p_nome,
        curso = p_curso,
        professor = p_professor
    WHERE id_disciplina = p_id;
END $$

CREATE PROCEDURE sp_remover_disciplina(IN p_id INT)
BEGIN
    DELETE FROM disciplinas WHERE id_disciplina = p_id;
END $$


-- ============================================================
--  RECADOS DA DISCIPLINA
-- ============================================================

CREATE PROCEDURE sp_listar_recados(IN p_id INT)
BEGIN
    SELECT *
    FROM disciplina_recados
    WHERE id_disciplina = p_id;
END $$

CREATE PROCEDURE sp_criar_recado(
    IN p_id_disciplina INT,
    IN p_tipo_recado VARCHAR(25),
    IN p_descricao TEXT,
    IN p_data DATETIME,
    IN p_link_material VARCHAR(500)
)
BEGIN
    INSERT INTO disciplina_recados
        (id_disciplina, tipo_recado, descricao, data, link_material)
    VALUES
        (p_id_disciplina, p_tipo_recado, p_descricao, p_data, p_link_material);
END $$

CREATE PROCEDURE sp_atualizar_recado(
    IN p_id_recado INT,
    IN p_tipo_recado VARCHAR(25),
    IN p_descricao TEXT,
    IN p_data DATETIME,
    IN p_link_material VARCHAR(500)
)
BEGIN
    UPDATE disciplina_recados
	SET tipo_recado = p_tipo_recado,
		descricao = p_descricao,
        data = p_data,
        link_material = p_link_material
	 WHERE id_recado = p_id_recado;
END $$

CREATE PROCEDURE sp_remover_recado(IN p_id_recado INT)
BEGIN
    DELETE FROM disciplina_recados WHERE id_recado = p_id_recado;
END $$

DELIMITER ;
	