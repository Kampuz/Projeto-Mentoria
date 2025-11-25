DELIMITER $$

-- ========================================================
-- CADASTRO DE DISCENTE
-- ========================================================
CREATE PROCEDURE sp_registrar_discente(
    IN p_nome VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_senha_hash VARCHAR(200)
)
BEGIN
    INSERT INTO discentes (nome, email, senha)
    VALUES (p_nome, p_email, p_senha_hash);
END $$


-- ========================================================
-- LOGIN DISCENTE
-- ========================================================
CREATE PROCEDURE sp_login_discente(IN p_email VARCHAR(50))
BEGIN
    SELECT * FROM discentes WHERE email = p_email;
END $$


-- ========================================================
-- LOGIN MENTOR
-- ========================================================
CREATE PROCEDURE sp_login_mentor(IN p_email VARCHAR(50))
BEGIN
    SELECT * FROM mentores WHERE email = p_email;
END $$

DELIMITER ;
