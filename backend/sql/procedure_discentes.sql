-- ================================================
--   PROCEDURES PARA CRUD DE DISCENTES
-- ================================================

DELIMITER $$

-- Criar discente
CREATE PROCEDURE sp_criar_discente(
    IN p_nome VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_matricula VARCHAR(50),
    IN p_periodo VARCHAR(50)
)
BEGIN
    INSERT INTO discentes (nome, email, matricula, periodo)
    VALUES (p_nome, p_email, p_matricula, p_periodo);
END $$


-- Atualizar discente
CREATE PROCEDURE sp_atualizar_discente(
    IN p_id INT,
    IN p_nome VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_matricula VARCHAR(50),
    IN p_periodo VARCHAR(50)
)
BEGIN
    UPDATE discentes
    SET nome = p_nome,
        email = p_email,
        matricula = p_matricula,
        periodo = p_periodo
    WHERE id_discente = p_id;
END $$


-- Remover discente
CREATE PROCEDURE sp_remover_discente(
    IN p_id INT
)
BEGIN
    DELETE FROM discentes WHERE id_discente = p_id;
END $$


-- Promover a mentor
CREATE PROCEDURE sp_promover_mentor(
    IN p_id INT
)
BEGIN
    INSERT IGNORE INTO discentes_mentores (id_mentor, area_atuacao, bio, disponibilidade)
    VALUES (p_id, '', '', '');
END $$


-- Desvincular mentor
CREATE PROCEDURE sp_desvincular_mentor(
    IN p_id INT
)
BEGIN
    DELETE FROM discentes_mentores WHERE id_mentor = p_id;
END $$


-- Adicionar disciplina
CREATE PROCEDURE sp_discente_add_disciplina(
    IN p_id_discente INT,
    IN p_id_disciplina INT
)
BEGIN
    INSERT INTO disciplina_alunos (id_discente, id_disciplina)
    VALUES (p_id_discente, p_id_disciplina);
END $$


-- Remover disciplina
CREATE PROCEDURE sp_discente_remove_disciplina(
    IN p_id_discente INT,
    IN p_id_disciplina INT
)
BEGIN
    DELETE FROM disciplina_alunos
    WHERE id_discente = p_id_discente
      AND id_disciplina = p_id_disciplina;
END $$

DELIMITER ;
