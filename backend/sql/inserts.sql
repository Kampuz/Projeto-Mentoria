-- ================================
-- DISCENTES
-- ================================
INSERT INTO discentes (nome, email, senha, periodo, matricula) VALUES
('Ana Silva', 'ana@exemplo.com', '123', '3', '2021001'),
('Bruno Costa', 'bruno@exemplo.com', '123', '5', '2020502'),
('Carla Souza', 'carla@exemplo.com', '123', '2', '2022003');

-- Mentor
INSERT INTO discentes_mentores (id_mentor, area_atuacao, bio, disponibilidade) VALUES
(1, 'Programação', 'Mentora experiente em lógica e algoritmos', 'Seg-Sex: 14h-18h');

-- ================================
-- ATIVIDADES
-- ================================
INSERT INTO atividades (titulo, tipo, descricao, data, local) VALUES
('Atendimento individual sobre dificuldades em Cálculo', 'atendimento', 'Tragam calculadora', '2025-03-10 14:00:00', 'Biblioteca'),
('Reunião semanal da mentoria', 'reuniao', 'Discussão de progresso dos mentorados', '2025-03-11 10:00:00', 'Sala de reuniões'),
('Palestra sobre mercado de tecnologia', 'palestra', 'Palestra com profissional da área de TI', '2025-03-12 15:00:00', 'Auditório');

-- Participantes
INSERT INTO atividades_participantes (id_atividade, id_discente, papel, data_inscricao) VALUES
(1, 2, 'participante', curdate()),
(2, 1, 'participante', curdate()),
(2, 2, 'participante', curdate()),
(2, 3, 'participante', curdate()),
(3, 1, 'inscrito', curdate()),
(3, 2, 'inscrito', curdate());

-- Atendimento
INSERT INTO atendimentos (id_atividade, tipo_atendimento, observacoes, id_mentor_responsavel) VALUES
(1, 'individual', 'Dúvidas sobre derivadas', 1);
-- ================================
-- DISCIPLINAS
-- ================================
INSERT INTO disciplinas (nome, curso, professor) VALUES
('Cálculo I', 'Matemática', 'Prof. Mario'),
('Programação I', 'Computação', 'Dra. Luiza');

INSERT INTO disciplina_recados (id_disciplina, tipo_evento, data, descricao) VALUES
(1, 'trabalho', '2025-03-10 14:00:00', 'Lista 1 de exercícios'),
(1, 'prova', '2025-03-10 14:00:00', 'Prova 1 de Cálculo'),
(2, 'material', '2025-03-10 14:00:00', 'PDF sobre estruturas de repetição');

-- ================================
-- OPORTUNIDADES
-- ================================
INSERT INTO oportunidades (tipo, titulo, descricao, requisitos, data_publicacao, data_limite, link) VALUES
('estagio', 'Estágio em TI', 'Atuação com suporte e desenvolvimento', 'Lógica, Python', '2025-03-01', '2025-03-30', 'https://empresa.com/estagio'),
('bolsa', 'Bolsa de pesquisa', 'Projeto em IA e visão computacional', 'Média ≥ 7.0', '2025-03-05', '2025-04-01', NULL);

INSERT INTO oportunidades_inscritos (id_oportunidade, id_discente, data_inscricao) VALUES
(1, 1, '2025-03-10'),
(1, 2, '2025-03-12'),
(2, 3, '2025-03-15');