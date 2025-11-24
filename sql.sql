DROP DATABASE IF EXISTS mentoria;
CREATE DATABASE IF NOT EXISTS mentoria;
USE mentoria;

-- ================================
-- 1. DISCENTES
-- ================================
CREATE TABLE discentes (
    id_discente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    senha VARCHAR(200),
    periodo INT NOT NULL DEFAULT 1,
    matricula VARCHAR(20) UNIQUE
);

CREATE TABLE discentes_mentores (
    id_mentor INT PRIMARY KEY,
    area_atuacao VARCHAR(150),
    bio TEXT,
    disponibilidade TEXT,
    FOREIGN KEY (id_mentor) REFERENCES discentes(id_discente)
);

-- ================================
-- 2. ATIVIDADES
-- ================================
CREATE TABLE atividades (
    id_atividade INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo ENUM('atendimento','reuniao','palestra','outro') NOT NULL,
    descricao TEXT,
    data DATETIME NOT NULL,
    local VARCHAR(100)
);

CREATE TABLE atividades_inscritos (
    id_atividade INT,
    id_discente INT,
    data_inscricao DATE NOT NULL,
    PRIMARY KEY(id_atividade, id_discente),
    FOREIGN KEY (id_atividade) REFERENCES atividades(id_atividade),
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente)
);

CREATE TABLE atividade_participantes (
    id_atividade INT,
    id_discente INT,
    papel ENUM('organizador', 'participante','inscrito'),
    PRIMARY KEY(id_atividade, id_discente),
    FOREIGN KEY (id_atividade) REFERENCES atividades(id_atividade),
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente)
);

CREATE TABLE atendimentos (
    id_atendimento INT AUTO_INCREMENT PRIMARY KEY,
    id_atividade INT UNIQUE,
    tipo_atendimento ENUM('individual','coletivo') NOT NULL,
    observacoes TEXT,
    id_mentor_responsavel INT,
    FOREIGN KEY (id_atividade) REFERENCES atividades(id_atividade),
    FOREIGN KEY (id_mentor_responsavel) REFERENCES discentes_mentores(id_mentor)
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

CREATE TABLE disciplina_recados (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_disciplina INT,
    tipo_evento ENUM('trabalho','prova','ocorrencia','material') NOT NULL,
    data_entrega DATE,
    horario_prova TIME,
    descricao TEXT,
    link_material VARCHAR(300),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);
-- ================================
-- 4. BASE DE OPORTUNIDADES
-- ================================
CREATE TABLE oportunidades (
    id_oportunidade INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('estagio','bolsa','outro') NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    requisitos TEXT,
    data_publicacao DATE,
    data_limite DATE,
    link VARCHAR(300)
);

CREATE TABLE oportunidades_inscritos (
    id_oportunidade INT,
    id_discente INT,
    data_inscricao DATE NOT NULL,
    PRIMARY KEY(id_oportunidade, id_discente),
    FOREIGN KEY (id_oportunidade) REFERENCES oportunidades(id_oportunidade),
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente)
);

-- ================================
-- 5. FÓRUM (DÚVIDAS E DISCUSSÃO)
-- ================================
CREATE TABLE forum_topicos (
    id_topico INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    categoria ENUM('geral','disciplina','bolsas') NOT NULL,
    id_disciplina INT,
    criado_por INT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina),
    FOREIGN KEY (criado_por) REFERENCES discentes(id_discente)
);

CREATE TABLE forum_mensagens (
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    id_topico INT NOT NULL,
    id_discente INT NOT NULL,
    mensagem TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_topico) REFERENCES forum_topicos(id_topico),
    FOREIGN KEY (id_discente) REFERENCES discentes(id_discente)
);
