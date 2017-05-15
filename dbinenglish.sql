-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Lun 15 Mai 2017 à 19:26
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dbinenglish`
--

-- --------------------------------------------------------

--
-- Structure de la table `answer`
--

CREATE TABLE `answer` (
  `ID_ANSWER` int(11) NOT NULL,
  `RESPONSE` varchar(70) DEFAULT NULL,
  `IK_ELEMENT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `element`
--

CREATE TABLE `element` (
  `ID_ELEMENT` int(11) NOT NULL,
  `LABEL` varchar(70) DEFAULT NULL,
  `IK_EXERCICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `exercice`
--

CREATE TABLE `exercice` (
  `ID_EXERCICE` int(11) NOT NULL,
  `QUESTION` varchar(70) DEFAULT NULL,
  `IK_RULE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `lesson`
--

CREATE TABLE `lesson` (
  `ID_LESSON` int(11) NOT NULL,
  `NUM` int(11) DEFAULT NULL,
  `TITLE` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `rule`
--

CREATE TABLE `rule` (
  `ID_RULE` int(11) NOT NULL,
  `LABEL` longtext,
  `IK_LESSON` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `ID_USER` int(11) NOT NULL,
  `USERNAME` varchar(45) DEFAULT NULL,
  `PASS` varchar(45) DEFAULT NULL,
  `LVL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`ID_USER`, `USERNAME`, `PASS`, `LVL`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1),
(2, 'user', '12dea96fec20593566ab75692c9949596833adc9', 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`ID_ANSWER`,`IK_ELEMENT`),
  ADD KEY `fk_Answer_Element1_idx` (`IK_ELEMENT`);

--
-- Index pour la table `element`
--
ALTER TABLE `element`
  ADD PRIMARY KEY (`ID_ELEMENT`,`IK_EXERCICE`),
  ADD KEY `fk_Element_Exercice1_idx` (`IK_EXERCICE`);

--
-- Index pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD PRIMARY KEY (`ID_EXERCICE`,`IK_RULE`),
  ADD KEY `fk_Exercice_Rule1_idx` (`IK_RULE`);

--
-- Index pour la table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`ID_LESSON`);

--
-- Index pour la table `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`ID_RULE`,`IK_LESSON`),
  ADD KEY `fk_Rule_Lesson_idx` (`IK_LESSON`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_USER`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `answer`
--
ALTER TABLE `answer`
  MODIFY `ID_ANSWER` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `element`
--
ALTER TABLE `element`
  MODIFY `ID_ELEMENT` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `ID_EXERCICE` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `ID_LESSON` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `rule`
--
ALTER TABLE `rule`
  MODIFY `ID_RULE` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `fk_Answer_Element1` FOREIGN KEY (`IK_ELEMENT`) REFERENCES `element` (`ID_ELEMENT`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `element`
--
ALTER TABLE `element`
  ADD CONSTRAINT `fk_Element_Exercice1` FOREIGN KEY (`IK_EXERCICE`) REFERENCES `exercice` (`ID_EXERCICE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD CONSTRAINT `fk_Exercice_Rule1` FOREIGN KEY (`IK_RULE`) REFERENCES `rule` (`ID_RULE`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `rule`
--
ALTER TABLE `rule`
  ADD CONSTRAINT `fk_Rule_Lesson` FOREIGN KEY (`IK_LESSON`) REFERENCES `lesson` (`ID_LESSON`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
