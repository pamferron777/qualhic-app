-- Adminer 4.8.1 MySQL 11.5.2-MariaDB-ubu2404 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `atividades`;
CREATE TABLE `atividades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_atividade` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `produto` varchar(255) DEFAULT NULL,
  `quantidade` varchar(255) DEFAULT NULL,
  `descricao` text NOT NULL,
  `finalizada` int(11) NOT NULL DEFAULT 0,
  `id_colaborador` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `atividades` (`id`, `nome_atividade`, `id_usuario`, `data`, `produto`, `quantidade`, `descricao`, `finalizada`, `id_colaborador`, `created_at`, `updated_at`) VALUES
(1,	NULL,	NULL,	'2024-11-16',	NULL,	NULL,	'Por favor, faça a manutenção da atividade 1',	0,	1,	'2024-11-16 23:14:43',	'2024-11-16 23:52:22');



DROP TABLE IF EXISTS `usuarios_funcoes`;

CREATE TABLE `usuarios_funcoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) 
);

INSERT INTO `usuarios_funcoes` (`nome`) VALUES ('Admin');       
INSERT INTO `usuarios_funcoes` (`nome`) VALUES ('Colaborador'); 




DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `usuarios_funcoes_id` int(11) NOT NULL DEFAULT 1,
  `id_usuario` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;

INSERT INTO `usuarios` (`id`, `nome`, `email`, `usuario`, `senha`, `foto`, `usuarios_funcoes_id`, `id_usuario`, `token`, `status`, `created_at`, `updated_at`) VALUES
(1,	'Pamela',	'pamela@qualhic.com.br',	'pamela',	'$2a$12$jf6GNKYEiSSwen0OKzq9v.ZWTp4aLKESGLE99LHoj6qoziMJoXSnm',	NULL,	1,	NULL,	NULL,	'1',	'2023-11-14 12:59:16',	NULL);


INSERT INTO `usuarios` (`id`, `nome`, `email`, `usuario`, `senha`, `foto`, `usuarios_funcoes_id`, `id_usuario`, `token`, `status`, `created_at`, `updated_at`) VALUES
(2,	'Pamela Colab',	'pamela_colab@qualhic.com.br',	'pamelacolab',	'$2a$12$jf6GNKYEiSSwen0OKzq9v.ZWTp4aLKESGLE99LHoj6qoziMJoXSnm',	NULL,	2,	NULL,	NULL,	'1',	'2023-11-14 12:59:16',	NULL);


