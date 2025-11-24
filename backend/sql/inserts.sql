-- ================================
-- DISCENTES
-- ================================
INSERT INTO discentes (nome, email, periodo, matricula, telefone) VALUES
('Ana Silva', 'ana@exemplo.com', '3', '2021001'),
('Bruno Costa', 'bruno@exemplo.com', '5', '2020502'),
('Carla Souza', 'carla@exemplo.com', '2', '2022003');

-- Mentor
INSERT INTO discentes_mentores (id_mentor, area_atuacao, bio, disponibilidade) VALUES
(1, 'Programação', 'Mentora experiente em lógica e algoritmos', 'Seg-Sex: 14h-18h');

-- ================================
-- ATIVIDADES
-- ================================
INSERT INTO atividades (data, descricao, tipo) VALUES
('2025-03-10', 'Atendimento individual sobre dificuldades em Cálculo', 'atendimento'),
('2025-03-11', 'Reunião semanal da mentoria', 'reuniao'),
('2025-03-12', 'Palestra sobre mercado de tecnologia', 'palestra');

-- Participantes
INSERT INTO atividade_participantes (id_atividade, id_discente, papel) VALUES
(1, 2, 'participante'),
(2, 1, 'participante'),
(2, 2, 'participante'),
(2, 3, 'participante'),
(3, 1, 'inscrito'),
(3, 2, 'inscrito');

-- Atendimento
INSERT INTO atendimentos (id_atividade, tipo_atendimento, hora, observacoes) VALUES
(1, 'individual', '14:00:00', 'Dúvidas sobre derivadas');

-- ================================
-- DISCIPLINAS
-- ================================
INSERT INTO disciplinas (nome, curso, professor) VALUES
('Cálculo I', 'Computação', 'Prof. Mario'),
('Programação I', 'Computação', 'Dra. Luiza');

INSERT INTO disciplina_eventos (id_disciplina, tipo_evento, data_entrega, horario_prova, descricao) VALUES
(1, 'trabalho', '2025-04-10', NULL, 'Lista 1 de exercícios'),
(1, 'prova', NULL, '09:00:00', 'Prova 1 de Cálculo'),
(2, 'material', NULL, NULL, 'PDF sobre estruturas de repetição');

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

-- ================================
-- FÓRUM
-- ================================
INSERT INTO forum_topicos (titulo, categoria, id_disciplina, criado_por) VALUES
('Dúvidas sobre derivadas', 'disciplina', 1, 2),
('Como estudar programação?', 'geral', NULL, 3);

INSERT INTO forum_mensagens (id_topico, id_discente, mensagem) VALUES
(1, 1, 'Comece revisando os limites.'),
(1, 2, 'Obrigado! Isso ajudou.'),
(2, 3, 'Pratique exercícios todos os dias.');
