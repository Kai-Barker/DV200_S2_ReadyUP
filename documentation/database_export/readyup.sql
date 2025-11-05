-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2025 at 08:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_login`
--
CREATE DATABASE IF NOT EXISTS `db_login` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_login`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Error reading structure for table db_login.users: #1932 - Table &#039;db_login.users&#039; doesn&#039;t exist in engine
-- Error reading data for table db_login.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_login`.`users`&#039; at line 1
--
-- Database: `db_readyup`
--
CREATE DATABASE IF NOT EXISTS `db_readyup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_readyup`;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--
-- Error reading structure for table db_readyup.category: #1932 - Table &#039;db_readyup.category&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.category: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`category`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--
-- Error reading structure for table db_readyup.friend: #1932 - Table &#039;db_readyup.friend&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.friend: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`friend`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `join_post`
--
-- Error reading structure for table db_readyup.join_post: #1932 - Table &#039;db_readyup.join_post&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.join_post: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`join_post`&#039; at line 1

--
-- Triggers `join_post`
--
DELIMITER $$
CREATE TRIGGER `increase_num_joined` AFTER INSERT ON `join_post` FOR EACH ROW UPDATE posts
    SET num_joined = num_joined + 1
    WHERE post_id = NEW.post_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--
-- Error reading structure for table db_readyup.message: #1932 - Table &#039;db_readyup.message&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.message: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`message`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--
-- Error reading structure for table db_readyup.posts: #1932 - Table &#039;db_readyup.posts&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.posts: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`posts`&#039; at line 1

--
-- Triggers `posts`
--
DELIMITER $$
CREATE TRIGGER `set_expiry_before_insert` BEFORE INSERT ON `posts` FOR EACH ROW BEGIN
    SET NEW.expiry_time = DATE_ADD(NEW.start_time, INTERVAL 4 HOUR);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--
-- Error reading structure for table db_readyup.post_tags: #1932 - Table &#039;db_readyup.post_tags&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.post_tags: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`post_tags`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--
-- Error reading structure for table db_readyup.tags: #1932 - Table &#039;db_readyup.tags&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.tags: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`tags`&#039; at line 1

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Error reading structure for table db_readyup.users: #1932 - Table &#039;db_readyup.users&#039; doesn&#039;t exist in engine
-- Error reading data for table db_readyup.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `db_readyup`.`users`&#039; at line 1
--
-- Database: `login_system`
--
CREATE DATABASE IF NOT EXISTS `login_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `login_system`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Error reading structure for table login_system.users: #1932 - Table &#039;login_system.users&#039; doesn&#039;t exist in engine
-- Error reading data for table login_system.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;FROM `login_system`.`users`&#039; at line 1
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"readyup\",\"table\":\"tags\"},{\"db\":\"readyup\",\"table\":\"category\"},{\"db\":\"readyup\",\"table\":\"posts\"},{\"db\":\"readyup\",\"table\":\"friend\"},{\"db\":\"readyup\",\"table\":\"join_post\"},{\"db\":\"readyup\",\"table\":\"post_tags\"},{\"db\":\"readyup\",\"table\":\"users\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-10-07 18:39:35', '{\"Console\\/Mode\":\"collapse\",\"NavigationWidth\":304}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `readyup`
--
CREATE DATABASE IF NOT EXISTS `readyup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `readyup`;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_picture` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_picture`, `description`, `title`) VALUES
(1, 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1759832014/ygrgnrnnuzgqe7ies3b3.jpg', '5v5 MOBA', 'League Of Legends'),
(2, 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1759832051/rhqqycongkxfv9mudwkw.jpg', 'FORTNITE BATTLKE PASSSSSS', 'Fortnite'),
(3, 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1759832122/kkjh1o7dkc6txz3yhq8b.png', '6v6 Hero shooter featuring marvel champions', 'Marvel Rivals');

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `friend_id` int(11) NOT NULL,
  `status` enum('pending','accepted','blocked') NOT NULL,
  `user_id_one` int(11) NOT NULL,
  `user_id_two` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friend`
--

INSERT INTO `friend` (`friend_id`, `status`, `user_id_one`, `user_id_two`) VALUES
(10, 'accepted', 1, 2),
(12, 'pending', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `join_post`
--

CREATE TABLE `join_post` (
  `join_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `join_post`
--

INSERT INTO `join_post` (`join_id`, `post_id`, `user_id`) VALUES
(4, 14, 1),
(5, 19, 1),
(6, 18, 1),
(7, 24, 3),
(8, 25, 3),
(9, 24, 2),
(10, 23, 2);

--
-- Triggers `join_post`
--
DELIMITER $$
CREATE TRIGGER `update_num_joined` AFTER INSERT ON `join_post` FOR EACH ROW UPDATE posts
    SET num_joined = num_joined + 1
    WHERE post_id = NEW.post_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `message_content` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `expiry_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `start_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `max_players` int(11) NOT NULL,
  `num_joined` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `description`, `category_id`, `title`, `expiry_time`, `start_time`, `max_players`, `num_joined`, `user_id`) VALUES
(14, 'sfgasdg', 1, 'afas', '2025-10-13 16:00:00', '2025-10-13 12:00:00', 1, 1, 2),
(18, 'dghdfhd', 1, 'sgahdsfsdfsfdsfsfsfsfsfs', '2025-10-14 04:25:00', '2025-10-14 00:25:00', 2, 1, 2),
(19, 'dsghdhse', 1, 'ge5gh', '2025-10-15 00:00:00', '2025-10-14 20:00:00', 1, 1, 2),
(23, 'sdgdfbdb', 2, 'Synergyy', '2025-10-13 16:20:00', '2025-10-13 12:20:00', 5, 1, 1),
(24, 'ewhretrn', 2, 'Post 2', '2025-10-13 18:15:00', '2025-10-13 14:15:00', 4, 2, 1),
(25, 'bvvebrbrb', 2, 'ebbrebr', '2025-10-13 22:25:00', '2025-10-13 18:25:00', 5, 1, 1),
(30, 'dfgseh', 2, 'agghsh', '2025-10-24 00:35:00', '2025-10-23 20:35:00', 3, 0, 1),
(31, 'sth', 3, 'Solo/duo', '2025-10-29 18:50:00', '2025-10-29 14:50:00', 3, 0, 1);

--
-- Triggers `posts`
--
DELIMITER $$
CREATE TRIGGER `set_expiry_on_insert` BEFORE INSERT ON `posts` FOR EACH ROW SET NEW.expiry_time = DATE_ADD(NEW.start_time, INTERVAL 4 HOUR)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--

CREATE TABLE `post_tags` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tags`
--

INSERT INTO `post_tags` (`post_id`, `tag_id`) VALUES
(14, 1),
(14, 3),
(19, 6),
(19, 8),
(23, 3),
(24, 3),
(24, 4),
(25, 2),
(25, 3),
(31, 14);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_name`, `category_id`) VALUES
(1, 'Casual', 2),
(2, 'Mic Required', 2),
(3, 'Competitive', 2),
(4, '18+', 2),
(5, 'Beginners Welcome', 2),
(6, 'CLIMBINGHIGH', 1),
(7, 'Competitive', 1),
(8, 'Beginners Welcome', 1),
(9, 'PeakingChallenger', 1),
(10, 'Mic Required', 3),
(11, 'Competitive', 3),
(12, 'Ranked', 3),
(13, 'Quickplay', 3),
(14, '#BetterThanOW', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(100) NOT NULL,
  `hashed_code` varchar(100) NOT NULL,
  `Bio` varchar(255) DEFAULT NULL,
  `communication_method` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` enum('user','admin','guest') NOT NULL DEFAULT 'guest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `hashed_password`, `hashed_code`, `Bio`, `communication_method`, `profile_picture`, `role`) VALUES
(1, 'Synergyy', 'Synergyy@syn', '$2b$10$AZ5GH3A1/eZ3XGeoiGA9geFlmuUfcJGld3Pqky0TdJKoQZK8twI/m', '$2b$10$0oSLo3g2pKb8kQUCMeKLd.uwki/xLvdiBbhHhAvHEneQOlVyS3uXa', 'The best dev ever!', 'Discord,494205720435228674', 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1762180649/jzamnn2yfk0fmxx8fc8h.jpg', 'admin'),
(2, 'KERIA', 'keria@t1', '$2b$10$M2IcQu5IDlfnmqcIm2NoSOsTxWm6lMpzLOpv2pPn88Xl75naqjxJC', '$2b$10$sSi2ZKN1skl5oQ7VZ1qwfesFn8pWqKtOg3ribgYBaYEW6VVWzQRUG', '2x Worlds winner Supp player', 'null', 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1759832627/v4jdid8dm9dq2yqrowyt.jpg', 'user'),
(3, 'FAKER', 'faker@t1', '$2b$10$rMNL12HuKDHIwIqoXyEwfujPL0Dw0bxxDQ77vAW98CYq9t1DdtCw6', '$2b$10$oyHRf4/RCaLwmeht581bje96ja953AKS5vAUGGq1aXSVoUGJx38KW', 'The goat', 'null', 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1760358504/bit4m0qtpvstcgzbjuqq.jpg', 'user'),
(4, 'testuser', 'testuser@test', '$2b$10$F/PeT9ePOjCk5iSQ2TQxs.PoSNZKzU3dYUJmYnVjR/6u/REdd0HDi', '$2b$10$KjapmG/ecg3y160atBPWSu9eL8D.GstLD56jPkehSpMEHOKErNC8y', 'batch', 'Nintendo,sgahdsfsdfsfdsfsfsfsfsfs', 'https://res.cloudinary.com/dnejh9nvy/image/upload/v1762182067/wfgqz7cnqmvzr3junkmq.png', 'user'),
(5, 'gdh#@wdfg', 'asdgfs@fg', '$2b$10$aC2uWaDUuh5.RMnjnalLM.t5TuFgTGdCQkvGs43Pfnm15JCxw6nB2', '$2b$10$/3.xQezOXnYAVfAg.M2eD.c5BKlTEG5zPIbJXlAyNtEb5CYyXBUf.', NULL, NULL, NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`friend_id`),
  ADD UNIQUE KEY `unique_friendship` (`user_id_one`,`user_id_two`),
  ADD KEY `user_id_two` (`user_id_two`);

--
-- Indexes for table `join_post`
--
ALTER TABLE `join_post`
  ADD PRIMARY KEY (`join_id`),
  ADD KEY `fk_user_join` (`user_id`),
  ADD KEY `fk_post_join` (`post_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `fk_user_posts` (`user_id`),
  ADD KEY `fk_category_posts` (`category_id`);

--
-- Indexes for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`post_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `friend_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `join_post`
--
ALTER TABLE `join_post`
  MODIFY `join_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`user_id_one`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`user_id_two`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `join_post`
--
ALTER TABLE `join_post`
  ADD CONSTRAINT `fk_post_join` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_join` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_category_posts` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_posts` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE;

--
-- Constraints for table `tags`
--
ALTER TABLE `tags`
  ADD CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
