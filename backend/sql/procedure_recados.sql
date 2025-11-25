/* ==========================================
   PROCEDURE: Atualizar recado
   ========================================== */
DROP PROCEDURE IF EXISTS sp_atualizar_recado;
DELIMITER //
CREATE PROCEDURE sp_atualizar_recado(
    IN p_id_recado INT,
    IN p_tipo_evento VARCHAR(100),
    IN p_descricao TEXT,
    IN p_data DATE,
    IN p_horario TIME,
    IN p_link_material VARCHAR(255)
)
BEGIN
    UPDATE disciplina_recados
    SET tipo_evento = p_tipo_evento,
        descricao = p_descricao,
        data = p_data,
        horario = p_horario,
        link_material = p_link_material
    WHERE id_recado = p_id_recado;
END //
DELIMITER ;


/* ==========================================
   PROCEDURE: Remover recado
   ========================================== */
DROP PROCEDURE IF EXISTS sp_remover_recado;
DELIMITER //
CREATE PROCEDURE sp_remover_recado(
    IN p_id_recado INT
)
BEGIN
    DELETE FROM disciplina_recados
    WHERE id_recado = p_id_recado;
END //
DELIMITER ;
