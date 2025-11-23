SELECT * FROM discentes;


SELECT a.id_atendimento, atv.data, atv.descricao, a.hora
FROM atendimentos a
JOIN atividades atv ON atv.id_atividade = a.id_atividade
WHERE tipo_atendimento = 'individual';

SELECT atv.descricao, d.nome, ap.papel
FROM atividade_participantes ap
JOIN atividades atv ON atv.id_atividade = ap.id_atividade
JOIN discentes d ON d.id_discente = ap.id_discente;


SELECT o.titulo, COUNT(oi.id_discente) AS inscritos
FROM oportunidades o
LEFT JOIN oportunidades_inscritos oi ON o.id_oportunidade = oi.id_oportunidade
GROUP BY o.titulo;

SELECT t.titulo, COUNT(m.id_mensagem) AS mensagens
FROM forum_topicos t
LEFT JOIN forum_mensagens m ON t.id_topico = m.id_topico
GROUP BY t.id_topico;
