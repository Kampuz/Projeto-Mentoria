DROP DATABASE mentoria;
CREATE DATABASE IF NOT EXISTS mentoria;
USE mentoria;


DROP TABLE IF EXISTS forum_mensagens;
DROP TABLE IF EXISTS forum_topicos;

DROP TABLE IF EXISTS oportunidades_inscritos;
DROP TABLE IF EXISTS oportunidades;

DROP TABLE IF EXISTS eventos_gerais;

DROP TABLE IF EXISTS disciplina_recados;
DROP TABLE IF EXISTS disciplina_alunos;
DROP TABLE IF EXISTS disciplinas;

DROP TABLE IF EXISTS atividade_participantes;
DROP TABLE IF EXISTS atividades_inscritos;
DROP TABLE IF EXISTS atendimentos;
DROP TABLE IF EXISTS atividades;

DROP TABLE IF EXISTS discentes_mentores;
DROP TABLE IF EXISTS discentes;


-- ================================
-- 1. DISCENTES
-- ================================
CREATE TABLE discentes (
    id_discente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    senha VARCHAR(200),
    periodo VARCHAR(20),
    matricula VARCHAR(50) UNIQUE
);

CREATE TABLE discentes_mentores (
    id_mentor INT PRIMARY KEY,
    area_atuacao VARCHAR(150),
    bio TEXT,
    disponibilidade TEXT,
    FOREIGN KEY (id_mentor) REFERENCES discentes(id_discente)
		ON DELETE CASCADE
);

-- ================================
-- 2. ATIVIDADES
-- ================================
CREATE TABLE atividades (
    id_atividade INT AUTO_INCREMENT PRIMARY KEY,
    titulo TEXT,
    data DATETIME NOT NULL,
    local TEXT,
    descricao TEXT,
    tipo ENUM('atendimento','reuniao','palestra','outro') NOT NULL
);

CREATE TABLE atividades_participantes (
    id_atividade INT,
    id_discente INT,
    data_inscricao DATETIME NOT NULL,
    papel ENUM('inscrito', 'participante') NOT NULL,
    PRIMARY KEY(id_atividade, id_discente),
    FOREIGN KEY (id_atividade) REFERENCES atividades(id_atividade)
		ON DELETE CASCADE,
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente)
		ON DELETE CASCADE
);


CREATE TABLE atendimentos (
    id_atendimento INT AUTO_INCREMENT PRIMARY KEY,
    id_atividade INT UNIQUE,
    id_mentor_responsavel INT,
    tipo_atendimento ENUM('individual','coletivo') NOT NULL,
    observacoes TEXT,
    FOREIGN KEY (id_atividade) REFERENCES atividades(id_atividade)
		ON DELETE CASCADE,
    FOREIGN KEY (id_mentor_responsavel) REFERENCES discentes_mentores(id_mentor)
		ON DELETE CASCADE
);

-- ================================
-- 3. DISCIPLINAS
-- ================================
CREATE TABLE disciplinas (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    curso VARCHAR(100),
    professor VARCHAR(150)
);

CREATE TABLE disciplina_alunos (
    id_discente INT,
    id_disciplina INT,
    PRIMARY KEY(id_discente, id_disciplina),
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);

CREATE TABLE disciplina_recados (
    id_recado INT AUTO_INCREMENT PRIMARY KEY,
    id_disciplina INT,
    tipo_recado ENUM('trabalho','prova','ocorrencia','material') NOT NULL,
    data DATETIME,
    descricao TEXT,
    link_material VARCHAR(300),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
		ON DELETE CASCADE
);

-- ================================
-- 4. ATIVIDADES EXTRAS (REUNIÕES, PALESTRAS)
-- ================================
CREATE TABLE eventos_gerais (
    id_evento_geral INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('reuniao','palestra') NOT NULL,
    data DATE NOT NULL,
    hora TIME,
    descricao TEXT,
    local VARCHAR(150)
);

-- ================================
-- 5. BASE DE OPORTUNIDADES
-- ================================
CREATE TABLE oportunidades (
    id_oportunidade INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('estagio','bolsa','outro') NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    requisitos TEXT,
    data_publicacao DATETIME,
    data_limite DATETIME,
    link VARCHAR(300)
);

CREATE TABLE oportunidades_inscritos (
    id_oportunidade INT,
    id_discente INT,
    data_inscricao DATE NOT NULL,
    PRIMARY KEY(id_oportunidade, id_discente),
    FOREIGN KEY (id_oportunidade) REFERENCES oportunidades(id_oportunidade)
		ON DELETE CASCADE,
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente)
		ON DELETE CASCADE
);