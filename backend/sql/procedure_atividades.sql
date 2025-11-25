USE mentoria;
	
-- LISTAR ATIVIDADES COM ATENDIMENTOS
DELIMITER //
CREATE PROCEDURE sp_listar_atividades()
BEGIN
    SELECT 
        a.id_atividade,
        a.titulo,
        a.tipo,
        a.descricao,
        a.data,
        a.local,
        
        at.id_atendimento,
        at.tipo_atendimento,
        at.observacoes,
        at.id_mentor_responsavel,
        
        dm.nome AS mentor_nome
    FROM atividades a
    LEFT JOIN atendimentos at
		ON at.id_atividade = a.id_atividade
    LEFT JOIN discentes dm
		ON dm.id_discente = at.id_mentor_responsavel
    ORDER BY a.data;
END //
DELIMITER ;


-- CRIAR ATIVIDADE
DELIMITER //
CREATE PROCEDURE sp_criar_atividade(
    IN p_tipo VARCHAR(50),
    IN p_titulo TEXT,
    IN p_descricao TEXT,
    IN p_data DATETIME,
    IN p_local TEXT
)
BEGIN
    INSERT INTO atividades (tipo, titulo, descricao, data, local)
    VALUES (p_tipo, p_titulo, p_descricao, p_data, p_local);
END //
DELIMITER ;


-- INSCREVER
DELIMITER //
DROP PROCEDURE IF EXISTS sp_inscrever_discente;
DELIMITER //
CREATE PROCEDURE sp_inscrever_discente(
    IN p_id_atividade INT,
    IN p_id_discente INT
)
BEGIN
    INSERT INTO atividades_participantes (id_atividade, id_discente, papel, data_inscricao)
    VALUES (p_id_atividade, p_id_discente, 'inscrito', current_timestamp());
END //
DELIMITER ;


-- CONFIRMAR PARTICIPAÇÃO
DELIMITER //
DROP PROCEDURE IF EXISTS sp_confirmar_participacao;
DELIMITER //
CREATE PROCEDURE sp_confirmar_participacao(
    IN p_id_atividade INT,
    IN p_id_discente INT,
    IN p_papel VARCHAR(20)
)
BEGIN
    IF p_papel NOT IN ('participante','inscrito') THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Papel inválido.';
    END IF;

    UPDATE atividades_participantes
    SET papel = p_papel
    WHERE id_atividade = p_id_atividade
      AND id_discente = p_id_discente;
END //
DELIMITER ;

-- ATUALIZAR ATIVIDADE
DELIMITER //
CREATE PROCEDURE sp_atualizar_atividade(
    IN p_id INT,
    IN p_tipo VARCHAR(50),
    IN p_titulo TEXT,
    IN p_descricao TEXT,
    IN p_data DATETIME,
    IN p_local TEXT
)
BEGIN
    UPDATE atividades
    SET tipo = p_tipo,
        titulo = p_titulo,
        descricao = p_descricao,
        data = p_data,
        local = p_local
    WHERE id_atividade = p_id;
END //
DELIMITER ;


-- REMOVER ATIVIDADE
DELIMITER //
CREATE PROCEDURE sp_remover_atividade(IN p_id INT)
BEGIN
    DELETE FROM atividades_participantes WHERE id_atividade = p_id;
    DELETE FROM atendimentos WHERE id_atividade = p_id;
    DELETE FROM atividades WHERE id_atividade = p_id;
END //
DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_criar_atendimento(
    IN p_id_atividade INT,
    IN p_tipo_atendimento VARCHAR(50),
    IN p_observacoes TEXT,
    IN p_id_mentor_responsavel INT
)
BEGIN
    INSERT INTO atendimentos (
        id_atividade,
        tipo_atendimento,
        observacoes,
        id_mentor_responsavel
    )
    VALUES (
        p_id_atividade,
        p_tipo_atendimento,
        p_observacoes,
        p_id_mentor_responsavel
    );
END $$

CREATE PROCEDURE sp_atualizar_atendimento(
    IN p_id_atendimento INT,
    IN p_tipo_atendimento VARCHAR(50),
    IN p_observacoes TEXT,
    IN p_id_mentor_responsavel INT
)
BEGIN
    UPDATE atendimentos
    SET tipo_atendimento = p_tipo_atendimento,
        observacoes = p_observacoes,
        id_mentor_responsavel = p_id_mentor_responsavel
    WHERE id_atendimento = p_id_atendimento;
END $$

DELIMITER ;