/* ==========================================
   PROCEDURE: Buscar perfil completo
   ========================================== */

DROP PROCEDURE IF EXISTS sp_buscar_perfil;
DELIMITER //
CREATE PROCEDURE sp_buscar_perfil(IN p_id INT)
BEGIN
    /* Retornar dados do discente */
    SELECT 
        id_discente,
        nome,
        email,
        periodo,
        matricula,
        eh_mentor
    FROM discentes
    WHERE id_discente = p_id;

    /* Retornar dados de mentor (se houver) */
    SELECT 
        id_mentor,
        area_atuacao,
        bio,
        disponibilidade
    FROM mentores
    WHERE id_mentor = p_id;
END //
DELIMITER ;
