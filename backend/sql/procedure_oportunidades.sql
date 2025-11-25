/* ===========================
   CRUD OPORTUNIDADES
   =========================== */

DROP PROCEDURE IF EXISTS sp_listar_oportunidades;
DELIMITER //
CREATE PROCEDURE sp_listar_oportunidades()
BEGIN
    SELECT * FROM oportunidades;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_criar_oportunidade;
DELIMITER //
CREATE PROCEDURE sp_criar_oportunidade(
    IN p_tipo VARCHAR(50),
    IN p_titulo VARCHAR(200),
    IN p_descricao TEXT,
    IN p_requisitos TEXT,
    IN p_data_publicacao DATETIME,
    IN p_data_limite DATETIME,
    IN p_link VARCHAR(255)
)
BEGIN
    INSERT INTO oportunidades (tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link)
    VALUES (p_tipo, p_titulo, p_descricao, p_requisitos, p_data_publicacao, p_data_limite, p_link);
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_atualizar_oportunidade;
DELIMITER //
CREATE PROCEDURE sp_atualizar_oportunidade(
    IN p_id INT,
    IN p_tipo VARCHAR(50),
    IN p_titulo VARCHAR(200),
    IN p_descricao TEXT,
    IN p_requisitos TEXT,
    IN p_data_publicacao DATETIME,
    IN p_data_limite DATETIME,
    IN p_link VARCHAR(255)
)
BEGIN
    UPDATE oportunidades
    SET tipo = p_tipo,
        titulo = p_titulo,
        descricao = p_descricao,
        requisitos = p_requisitos,
        data_publicacao = p_data_publicacao,
        data_limite = p_data_limite,
        link = p_link
    WHERE id_oportunidade = p_id;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_remover_oportunidade;
DELIMITER //
CREATE PROCEDURE sp_remover_oportunidade(IN p_id INT)
BEGIN
    DELETE FROM oportunidades WHERE id_oportunidade = p_id;
END //
DELIMITER ;


/* ===========================
   INSCRIÇÕES EM OPORTUNIDADES
   =========================== */

DROP PROCEDURE IF EXISTS sp_inscrever_oportunidade;
DELIMITER //
CREATE PROCEDURE sp_inscrever_oportunidade(
    IN p_id_oportunidade INT,
    IN p_id_discente INT
)
BEGIN
    INSERT INTO oportunidades_inscritos (id_oportunidade, id_discente, data_inscricao)
    VALUES (p_id_oportunidade, p_id_discente, CURDATE());
END //
DELIMITER ;
