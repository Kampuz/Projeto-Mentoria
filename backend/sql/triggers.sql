DELIMITER $$
CREATE TRIGGER trg_set_e_mentor
AFTER INSERT ON discentes_mentores
FOR EACH ROW
BEGIN
    UPDATE discentes 
    SET e_mentor = 1
    WHERE id_discente = NEW.id_mentor;
END$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER trg_recado_data_valida
BEFORE INSERT ON disciplina_recados
FOR EACH ROW
BEGIN
    IF NEW.data < CURDATE() THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'A data do recado não pode ser no passado';
    END IF;
END$$
DELIMITER ;


CREATE TABLE recados_log (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_recado INT,
    acao VARCHAR(20),
    data_hora DATETIME,
    tipo_evento_antigo VARCHAR(50),
    tipo_evento_novo VARCHAR(50),
    descricao_antiga TEXT,
    descricao_nova TEXT
);
