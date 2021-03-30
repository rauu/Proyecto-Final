-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2021 at 08:27 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gymooze`
--

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id_news` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_uploded` varchar(255) NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `news_comment`
--

CREATE TABLE `news_comment` (
  `id_comment` int(11) NOT NULL,
  `id_news` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id_plan` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id_plan`, `name`, `price`) VALUES
(1, 'one-month', '19.99'),
(2, 'three-months', '49.99'),
(3, 'six-months', '64.99');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id_subscriptions` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_user_trainer` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `expire_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id_subscriptions`, `id_user`, `id_user_trainer`, `id_plan`, `start_date`, `expire_date`) VALUES
(1, 3, 1, 1, '2021-03-19', '2021-04-19'),
(2, 4, 2, 2, '2021-03-19', '2021-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `role_user` varchar(255) NOT NULL DEFAULT 'role_user',
  `email` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `name`, `surname`, `role_user`, `email`, `sex`, `password`, `description`, `date_birth`) VALUES
(1, 'rauu', 'raunak', 'binyani', 'role_admin', 'raunakbinyani.binyani@gmail.com', 'male', 'raunak', NULL, '2000-09-29'),
(2, 'victor', 'victor', 'escudero', 'role_admin', 'victor@gmail.com', 'male', 'victor', NULL, '1998-12-01'),
(3, 'lucia', 'lucia', 'mena', 'role_user', 'lucia@gmail.com', 'female', 'victor', NULL, '1993-12-24'),
(4, 'marcos', 'marcos', 'martin', 'role_user', 'marcos@gmail.com', 'male', 'marcos', NULL, '2000-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id_video` int(11) NOT NULL,
  `video_name` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `video_description` text NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp(),
  `type_video` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `video_comment`
--

CREATE TABLE `video_comment` (
  `id_comment` int(11) NOT NULL,
  `id_video` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id_news`),
  ADD KEY `FK_USER_NEWS` (`id_user`);

--
-- Indexes for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `FK_COMMENT_N_NEWS` (`id_news`),
  ADD KEY `FK_COMMENT_N_USER` (`id_user`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id_plan`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id_subscriptions`),
  ADD KEY `FK_SUSCRIPTION_USER` (`id_user`),
  ADD KEY `FK_SUSCRIPTION_USER_TRAINER` (`id_user_trainer`),
  ADD KEY `FK_SUSCRIPTIONS_PLAN` (`id_plan`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id_video`),
  ADD KEY `FK_VIDEO_USERS` (`id_user`);

--
-- Indexes for table `video_comment`
--
ALTER TABLE `video_comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `FK_COMMENT_V_USERS` (`id_user`),
  ADD KEY `FK_COMMENT_V_VIDEO` (`id_video`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id_news` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news_comment`
--
ALTER TABLE `news_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id_subscriptions` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id_video` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `video_comment`
--
ALTER TABLE `video_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `FK_USER_NEWS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD CONSTRAINT `FK_COMMENT_N_NEWS` FOREIGN KEY (`id_news`) REFERENCES `news` (`id_news`),
  ADD CONSTRAINT `FK_COMMENT_N_USER` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `FK_SUSCRIPTIONS_PLAN` FOREIGN KEY (`id_plan`) REFERENCES `plans` (`id_plan`),
  ADD CONSTRAINT `FK_SUSCRIPTION_USER` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `FK_SUSCRIPTION_USER_TRAINER` FOREIGN KEY (`id_user_trainer`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `FK_VIDEO_USERS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `video_comment`
--
ALTER TABLE `video_comment`
  ADD CONSTRAINT `FK_COMMENT_V_USERS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `FK_COMMENT_V_VIDEO` FOREIGN KEY (`id_video`) REFERENCES `videos` (`id_video`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
