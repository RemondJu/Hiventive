-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 92.175.11.66:4100
-- Généré le :  mar. 22 jan. 2019 à 14:31
-- Version du serveur :  8.0.12
-- Version de PHP :  7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `hiventive`
--
CREATE DATABASE IF NOT EXISTS `hiventive` DEFAULT CHARACTER SET utf8mb4;
USE `hiventive`;

-- --------------------------------------------------------

--
-- Structure de la table `Layer`
--

CREATE TABLE `Layer` (
  `id` int(11) NOT NULL,
  `share` tinyint(1) NOT NULL,
  `userID` int(33) NOT NULL,
  `layerTypeID` int(33) NOT NULL,
  `viewsCounter` int(33) NOT NULL,
  `downloadsCounter` int(33) NOT NULL,
  `name` varchar(130) NOT NULL,
  `url` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text NOT NULL,
  `hostSite` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `version` varchar(255) DEFAULT NULL,
  `imported` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Structure de la table `LayerType`
--

CREATE TABLE `LayerType` (
  `id` int(11) NOT NULL,
  `type` varchar(130) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `LayerType`
--

INSERT INTO `LayerType` (`id`, `type`) VALUES
(1, 'Machine'),
(2, 'Software'),
(3, 'Distribution'),
(4, 'Miscellaneous');

-- --------------------------------------------------------

--
-- Structure de la table `Project`
--

CREATE TABLE `Project` (
  `id` int(11) NOT NULL,
  `name` varchar(130) NOT NULL,
  `userID` int(11) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;


-- --------------------------------------------------------

--
-- Structure de la table `ProjectLayer`
--

CREATE TABLE `ProjectLayer` (
  `projectId` int(11) DEFAULT NULL,
  `layerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour la table `Layer`
--
ALTER TABLE `Layer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_UserLayers_user_ID` (`userID`),
  ADD KEY `fk_UserLayers_typelayer_ID` (`layerTypeID`);

--
-- Index pour la table `LayerType`
--
ALTER TABLE `LayerType`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ProjectCreate_user_ID` (`userID`);

--
-- Index pour la table `ProjectLayer`
--
ALTER TABLE `ProjectLayer`
  ADD KEY `ID_project` (`projectId`),
  ADD KEY `ID_userlayer` (`layerId`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_User_name` (`firstname`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Layer`
--
ALTER TABLE `Layer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `LayerType`
--
ALTER TABLE `LayerType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Project`
--
ALTER TABLE `Project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Layer`
--
ALTER TABLE `Layer`
  ADD CONSTRAINT `fk_UserLayers_typelayer_ID` FOREIGN KEY (`layerTypeID`) REFERENCES `LayerType` (`id`),
  ADD CONSTRAINT `fk_UserLayers_user_ID` FOREIGN KEY (`userID`) REFERENCES `User` (`id`);

--
-- Contraintes pour la table `Project`
--
ALTER TABLE `Project`
  ADD CONSTRAINT `fk_ProjectCreate_user_ID` FOREIGN KEY (`userID`) REFERENCES `User` (`id`);

--
-- Contraintes pour la table `ProjectLayer`
--
ALTER TABLE `ProjectLayer`
  ADD CONSTRAINT `ProjectLayer_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`),
  ADD CONSTRAINT `ProjectLayer_ibfk_3` FOREIGN KEY (`layerId`) REFERENCES `Layer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;