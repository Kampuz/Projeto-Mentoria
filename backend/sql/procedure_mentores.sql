DROP PROCEDURE IF EXISTS sp_listar_mentores;
DELIMITER //
CREATE PROCEDURE sp_listar_mentores()
BEGIN
    SELECT 
        dm.id_mentor,
        d.nome AS nome_discente,
        d.email AS email_discente,
        dm.area_atuacao,
        dm.bio,
        dm.disponibilidade
    FROM discentes_mentores dm
    JOIN discentes d ON dm.id_mentor = d.id_discente;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_obter_mentor;
DELIMITER //
CREATE PROCEDURE sp_obter_mentor(IN p_id INT)
BEGIN
    SELECT 
        dm.id_mentor,
        d.nome AS nome_discente,
        d.email AS email_discente,
        dm.area_atuacao,
        dm.bio,
        dm.disponibilidade
    FROM discentes_mentores dm
    JOIN discentes d ON dm.id_mentor = d.id_discente
    WHERE dm.id_mentor = p_id;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_criar_mentor;
DELIMITER //
CREATE PROCEDURE sp_criar_mentor(
    IN p_id_mentor INT,
    IN p_area VARCHAR(150),
    IN p_bio TEXT,
    IN p_disp TEXT
)
BEGIN
    INSERT INTO discentes_mentores (id_mentor, area_atuacao, bio, disponibilidade)
    VALUES (p_id_mentor, p_area, p_bio, p_disp);
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_atualizar_mentor;
DELIMITER //
CREATE PROCEDURE sp_atualizar_mentor(
    IN p_id INT,
    IN p_area VARCHAR(150),
    IN p_bio TEXT,
    IN p_disp TEXT
)
BEGIN
    UPDATE discentes_mentores
    SET area_atuacao = p_area,
        bio = p_bio,
        disponibilidade = p_disp
    WHERE id_mentor = p_id;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_remover_mentor;
DELIMITER //
CREATE PROCEDURE sp_remover_mentor(IN p_id INT)
BEGIN
    DELETE FROM discentes_mentores WHERE id_mentor = p_id;
END //
DELIMITER ;
