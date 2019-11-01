-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2019 at 10:03 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bioskop-engima`
--

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`) VALUES
(1, 'Drama'),
(2, 'Action'),
(3, 'Romance'),
(4, 'Thriller');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `nama_movie` varchar(255) DEFAULT NULL,
  `poster` varchar(300) DEFAULT NULL,
  `synopsis` varchar(1000) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `durasi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `nama_movie`, `poster`, `synopsis`, `release_date`, `durasi`) VALUES
(1, 'Titanic', NULL, 'Movie Classic yang bagus lah pokoke', '2019-09-19', 120),
(2, 'Avengers Endgame', NULL, 'Movie terkenal banget lah pokoke', '2019-09-03', 90),
(3, 'Kimi no Na Wa', NULL, 'Movie kewibuan yang disukai para non wibu', '2019-09-06', 100);

-- --------------------------------------------------------

--
-- Table structure for table `movie-genre`
--

CREATE TABLE `movie-genre` (
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie-genre`
--

INSERT INTO `movie-genre` (`movie_id`, `genre_id`) VALUES
(1, 3),
(1, 1),
(2, 2),
(2, 4),
(3, 1),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `username` varchar(50) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `skor` int(11) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`username`, `movie_id`, `skor`, `content`) VALUES
('ardyh', 3, 8, 'Saya bukan wibu, tapi saya suka filem ini'),
('dandi', 3, 6, 'Mayan lah, tapi gak favorit');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `movie_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `jam` int(11) NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`movie_id`, `schedule_id`, `jam`, `tanggal`) VALUES
(3, 1, 2, '2019-09-09'),
(2, 2, 4, '2019-09-20');

-- --------------------------------------------------------

--
-- Table structure for table `tiket`
--

CREATE TABLE `tiket` (
  `schedule_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `kursi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tiket`
--

INSERT INTO `tiket` (`schedule_id`, `username`, `kursi`) VALUES
(1, 'ardyh', 4),
(2, 'ardyh', 8);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(36) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `profile_pic` varchar(300) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `email`, `profile_pic`, `phone`) VALUES
('ardyh', 'whatsoever', 'ardyharoen@gmail.com', NULL, '082213335597'),
('dandi', 'whatsoever', 'dandi@gmail.com', NULL, '081122334455');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `movie-genre`
--
ALTER TABLE `movie-genre`
  ADD KEY `movie-genre_ibfk_1` (`movie_id`),
  ADD KEY `genre_id constraint` (`genre_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`username`,`movie_id`),
  ADD KEY `movie_id constraint` (`movie_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_ibfk_1` (`movie_id`);

--
-- Indexes for table `tiket`
--
ALTER TABLE `tiket`
  ADD PRIMARY KEY (`username`,`schedule_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie-genre`
--
ALTER TABLE `movie-genre`
  ADD CONSTRAINT `genre_id constraint` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie-genre_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `movie_id constraint` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `username constraint` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tiket`
--
ALTER TABLE `tiket`
  ADD CONSTRAINT `tiket_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiket_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
