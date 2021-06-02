-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2021 at 09:00 PM
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
-- Table structure for table `exercise_room`
--

CREATE TABLE `exercise_room` (
  `id_room` int(11) NOT NULL,
  `room_name` varchar(100) NOT NULL,
  `background_image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exercise_room`
--

INSERT INTO `exercise_room` (`id_room`, `room_name`, `background_image`) VALUES
(1, 'WELLNESS', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg'),
(5, 'SIX-PACK', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg'),
(6, 'LOSE WEIGHT', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg'),
(7, 'TONE UP', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg'),
(8, 'ROUTINE GAP', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg'),
(9, 'PILATES', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg'),
(10, 'YOGA', 'images/roomProfileImage/image-1507398941214-572c25f4b1dc.jpeg');

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

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id_news`, `id_user`, `content`, `title`, `image_uploded`, `date_upload`) VALUES
(9, 1, '589e8acc32656a7f3e4eba51f7ee4291bb4dc4b8dae3ce657faf5e72949a786f3d8996c1988a925bd0cf272a14c49885f54cadbc0c77b92adeaeaaa96a2dd066bc4c6fc1f3aad3b6abe7b58de2fc08448ce2bfc4c1adaf8bc2d1c9e51c8cf424a54181aee62d60ecb91e933091e4ac0fe14c86192b5fcf600e010489508111db666e9f64b51e8834e4d544ad38758d2616e7a2676be323e3ed71c3d0b91df0e8bd9b57990913156aa522dde83cd22dc2d4c65cc6314df4dd120d54a3368a0b3692f25e97946237e5d4dc0122dbdd374ce52490fe6d050a4b8318cb54d7d56296792b06806cf652ffa2491e129787bf120fef94a472463c3b74585e6ff619e9edde44e094239908d45222ca45ba', 'qwerty', 'news/headlineImages/image-1622322579361.webp', '2021-05-08'),
(10, 1, '589e8a9a2b76243f20178e', 'fhfj', 'news/headlineImages/image-1622322579361.webp', '2021-05-08'),
(11, 1, '589e8acc6e61261a', '23', 'news/headlineImages/image-1622322579361.webp', '2021-05-14'),
(12, 1, '589e8a9223737a2c7f59ba67', 'fasdf', 'news/headlineImages/image-1622322579361.webp', '2021-05-14'),
(13, 1, '589e8a9223737a2c7f59ba67', 'fasd', 'news/headlineImages/image-1622322579361.webp', '2021-05-14'),
(14, 1, '589e8a9223737a2c7f59ba67', 'fads', 'news/headlineImages/image-1622322579361.webp', '2021-05-14'),
(15, 1, '589e8a9223737a2c7f59ba67', 'asdf', 'news/headlineImages/image-1622322579361.webp', '2021-05-14'),
(16, 1, '589e8a9620756b76315ae09d0d27efc7fc5fdade', 'adfadsf', 'news/headlineImages/image-1622322579361.webp', '2021-05-15'),
(17, 1, '589e8a9620756b76315ae09d0d27efc7fc5fdade', 'adfadsf', 'news/headlineImages/image-1622322579361.webp', '2021-05-15'),
(18, 1, '589e8a9620756b76315ae09d0d27efc7fc5fdade', 'adfadsf', 'news/headlineImages/image-1621059577356.jpeg', '2021-05-15'),
(23, 1, '589e8a8136636967355bf508e5bf538bed25', 'qwerqew', 'news/headlineImages/image-1622659862006.webp', '2021-06-02');

-- --------------------------------------------------------

--
-- Table structure for table `news_comment`
--

CREATE TABLE `news_comment` (
  `id_comment` int(11) NOT NULL,
  `id_news` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL DEFAULT -1,
  `comment` varchar(255) NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news_comment`
--

INSERT INTO `news_comment` (`id_comment`, `id_news`, `id_user`, `id_parent`, `comment`, `date_upload`) VALUES
(18, 9, 1, -1, 'd', '2021-05-31'),
(19, 17, 1, -1, 'kjhg', '2021-06-01'),
(21, 11, 2, -1, 'mnb', '2021-06-01'),
(22, 13, 3, -1, 'fadsf', '2021-06-02');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id_plan` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `months` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id_plan`, `name`, `price`, `months`) VALUES
(1, '1 month subscription', '19.99', 1),
(2, '3 months subscription', '49.99', 3),
(3, '6 months subscription', '64.99', 6);

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
(10, 1, 2, 3, '2021-05-23', '2021-11-23'),
(13, 1, 9, 2, '2021-05-23', '2021-08-23'),
(15, 3, 9, 1, '2021-05-26', '2021-06-26'),
(18, 20, 9, 1, '2021-05-26', '2021-06-26'),
(19, 22, 2, 1, '2021-05-31', '2021-06-30'),
(20, 9, 2, 1, '2021-05-31', '2021-06-30'),
(21, 2, 20, 1, '2021-05-31', '2020-06-30'),
(22, 1, 20, 1, '2021-05-31', '2021-06-30'),
(23, 3, 2, 1, '2021-05-31', '2021-06-30'),
(24, 15, 2, 1, '2021-06-01', '2021-07-01');

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
  `description` varchar(1000) DEFAULT NULL,
  `date_birth` date NOT NULL,
  `profile_image` varchar(255) DEFAULT 'images/profile-image/user-default-image.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `name`, `surname`, `role_user`, `email`, `sex`, `password`, `description`, `date_birth`, `profile_image`) VALUES
(1, 'rauu', 'Raunak', 'Binyani', 'role_admin', 'rai.binyani@gmail.com', 'men', '$2b$10$eMVDACaze6T2lksIxAJ6Uu/j4NgbtV9prZarwpRqDdHmxRi/Wz8xW', 'afsdfsa', '1998-06-28', 'images/profile-image/user-default-image.png'),
(2, 'victor', 'victor', 'escudero', 'role_trainer', 'VictorEscuderoLopez@hotmail.com', 'men', '$2b$10$eMVDACaze6T2lksIxAJ6Uu/j4NgbtV9prZarwpRqDdHmxRi/Wz8xW', 'Entrenador facherito? Yo diría que si.d', '1998-12-01', 'images/profile-image/image-1621629696046.jpeg'),
(3, 'lucia', 'lucia', 'mena', 'role_user', 'lucia@gmail.com', 'women', '$2b$10$TFwbn5B9AYkuU5.KGbOFuOyeNrXYvSEt4r3RdPh7.rQdFDYoSPtAO', NULL, '1993-12-24', 'images/profile-image/user-default-image.png'),
(8, 'rauuu', 'Raunak', 'Binyani', 'role_user', 'raunakbinyani@gmail.com', 'men', 'raunak_A2', NULL, '1997-06-04', 'images/profile-image/user-default-image.png'),
(9, 'victorlopez', 'Victor', 'Escudero', 'role_trainer', 'victorescuderolopez9797@gmail.com', 'men', '$2b$10$eMVDACaze6T2lksIxAJ6Uu/j4NgbtV9prZarwpRqDdHmxRi/Wz8xW', '', '1998-12-01', 'images/profile-image/user-default-image.png'),
(15, 'raunak', 'RAUNAROK', '', 'role_user', 'raunakbinyani.binyani@gmail.com', 'men', '$2b$10$X0kKcnc8hbX6D.yFpDvDcue/hYymqg15QxHLozOvciDQRziDdYG8O', NULL, '2000-02-09', 'images/profile-image/user-default-image.png'),
(20, 'vanshu', 'Vanshika', 'Chhabria', 'role_trainer', 'chhabriavansh@gmail.com', 'women', '$2b$10$vprLI4RD9CHkxliaDxOOjOhCwJbUqy6Zr2w4Qj8UaRhOk85VKEilm', 'holaaa', '2002-04-17', 'images/profile-image/user-default-image.png'),
(22, 'prueba1', 'prueba', 'prueba', 'role_user', 'sdf@g.com', 'men', '$2b$10$PN2F1ggkHQkaE7CJSv6NW.2lPw1KQ1AO6vN7ArwwvjfT/oSjCyg0a', NULL, '1988-01-05', 'images/profile-image/user-default-image.png'),
(24, 'ra', 'raunak', 'bina', 'role_user', 'rau@g.com', 'men', '$2b$10$/E8Ej7nihgQqWaR8Uv1ibuLcB4V5vaD1YjTcjqA1HjRQoOhG0xwFy', NULL, '2000-02-03', 'images/profile-image/user-default-image.png');

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
  `exercise_room` int(11) NOT NULL,
  `video` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id_video`, `video_name`, `id_user`, `video_description`, `date_upload`, `type_video`, `exercise_room`, `video`) VALUES
(5, 'rauu', 2, 'erqewrqewrqewr', '2021-05-06', 'private', 1, 'videos/video-private_1620423236053.mp4'),
(15, 'video private vanshu', 20, 'private video of vanshu', '2021-05-25', 'private', 5, 'videos/video-private_1621967146950.mp4'),
(17, 'raunak video', 1, 'asd', '2021-06-01', 'public', 1, 'videos/video-public_1622568262630.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `video_comment`
--

CREATE TABLE `video_comment` (
  `id_comment` int(11) NOT NULL,
  `id_video` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_parent` int(11) DEFAULT -1,
  `comment` varchar(255) NOT NULL,
  `date_upload` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `video_comment`
--

INSERT INTO `video_comment` (`id_comment`, `id_video`, `id_user`, `id_parent`, `comment`, `date_upload`) VALUES
(8, 15, 1, -1, 'e', '2021-05-31'),
(12, 17, 2, -1, 'f', '2021-06-01'),
(14, 5, 3, -1, 'mnbb', '2021-06-02'),
(15, 17, 1, -1, 'kjn', '2021-06-02');

-- --------------------------------------------------------

--
-- Table structure for table `work_with_us`
--

CREATE TABLE `work_with_us` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_uploaded` date NOT NULL DEFAULT current_timestamp(),
  `file_location` varchar(200) NOT NULL,
  `message` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `work_with_us`
--

INSERT INTO `work_with_us` (`id`, `name`, `surname`, `email`, `date_uploaded`, `file_location`, `message`) VALUES
(22, 'asdf', 'asfa', 'r@g.com', '2021-06-02', 'cv/CV-asdf_asfa_1622646128660.pdf', '123'),
(23, 'asdf', 'asfa', 'r@g.com', '2021-06-02', 'cv/CV-asdf_asfa_1622646133527.pdf', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercise_room`
--
ALTER TABLE `exercise_room`
  ADD PRIMARY KEY (`id_room`),
  ADD UNIQUE KEY `room_name` (`room_name`);

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
  ADD KEY `FK_COMMENT_N_USERS` (`id_user`),
  ADD KEY `FK_COMMENT_N_NEWS` (`id_news`);

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
  ADD KEY `FK_VIDEO_USERS` (`id_user`),
  ADD KEY `FK_VIDEOS_EXERCISE` (`exercise_room`);

--
-- Indexes for table `video_comment`
--
ALTER TABLE `video_comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `FK_COMMENT_V_USERS` (`id_user`),
  ADD KEY `FK_COMMENT_V_VIDEO` (`id_video`);

--
-- Indexes for table `work_with_us`
--
ALTER TABLE `work_with_us`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercise_room`
--
ALTER TABLE `exercise_room`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id_news` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `news_comment`
--
ALTER TABLE `news_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id_subscriptions` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id_video` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `video_comment`
--
ALTER TABLE `video_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `work_with_us`
--
ALTER TABLE `work_with_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `FK_USER_NEWS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD CONSTRAINT `FK_COMMENT_N_NEWS` FOREIGN KEY (`id_news`) REFERENCES `news` (`id_news`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_COMMENT_N_USERS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `FK_SUSCRIPTIONS_PLAN` FOREIGN KEY (`id_plan`) REFERENCES `plans` (`id_plan`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_SUSCRIPTION_USER` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_SUSCRIPTION_USER_TRAINER` FOREIGN KEY (`id_user_trainer`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `FK_VIDEOS_EXERCISE` FOREIGN KEY (`exercise_room`) REFERENCES `exercise_room` (`id_room`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_VIDEO_USERS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `video_comment`
--
ALTER TABLE `video_comment`
  ADD CONSTRAINT `FK_COMMENT_V_USERS` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_COMMENT_V_VIDEO` FOREIGN KEY (`id_video`) REFERENCES `videos` (`id_video`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
