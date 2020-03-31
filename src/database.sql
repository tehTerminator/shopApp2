-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2020 at 04:32 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopapp_beta`
--

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `posted_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_id` int(6) NOT NULL,
  `payment_method` enum('CASH','CHEQUE','UPI','CREDIT') NOT NULL,
  `payment_status` tinyint(1) NOT NULL DEFAULT '1',
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` char(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `title`) VALUES
(1, 'Recruitment Form'),
(2, 'Electricity Bill'),
(3, 'Challan Payment'),
(4, 'Typing Work'),
(5, 'Online Form'),
(6, 'Exam Form Payment');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `title` char(30) NOT NULL,
  `address` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `title`, `address`) VALUES
(1, 'Cash', 'Ashoknagar'),
(2, 'Prateek Kher', 'Ashoknagar'),
(3, 'Another User', 'Ashoknagar'),
(4, 'Some More User', 'Ashoknagar'),
(5, 'And Some More', 'Ashoknagar');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `title` char(50) NOT NULL,
  `child_of` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `title`, `child_of`) VALUES
(1, 'Assets', NULL),
(2, 'Liabilities', NULL),
(3, 'Capital', NULL),
(4, 'Revenue', NULL),
(5, 'Expense', NULL),
(6, 'Current Assets', 1),
(7, 'Bank Accounts', 6),
(8, 'Cash-in-Hand', 6),
(9, 'Deposits', 6),
(10, 'Expense (Direct)', 5),
(11, 'Expense (Indirect)', 5),
(12, 'Income (Direct)', 4),
(13, 'Income (Indirect)', 4),
(14, 'Account Payables', 2),
(15, 'Account Receivables', 1),
(16, 'Salary Expenses', 11),
(17, 'Stationary', 11),
(18, 'Raw Material', 10),
(19, 'Fixed Assets', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

CREATE TABLE `ledger` (
  `id` int(11) NOT NULL,
  `title` char(30) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ledger`
--

INSERT INTO `ledger` (`id`, `title`, `group_id`) VALUES
(1, 'State Bank Current A/c', 7),
(2, 'HDFC Current A/c', 7),
(3, 'Cash', 8),
(4, 'State Bank Savings A/c', 7),
(5, 'Home', 8),
(6, 'Prateek Current A/c', 14),
(7, 'Prateek Kher', 16),
(8, 'Anand Sharma', 16),
(9, 'Lakhan Lahari', 16),
(10, 'Rahul Kushwah', 16),
(11, 'Bhagwanlal Ahirwar', 16),
(12, 'Ravi Ahirwar', 16),
(13, 'Staples', 17),
(14, 'Pen', 17),
(15, 'Ink And Toner', 17),
(16, 'Lamination Small Pouches', 18),
(17, 'Lamination Large Pouches', 18),
(18, 'A4 Paper Bundle', 18),
(19, 'Photopaper A4', 18),
(20, 'Commission', 12),
(21, 'MPOnline', 7);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` char(30) NOT NULL,
  `rate` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `rate`) VALUES
(1, 'A4 Paper', 2),
(4, 'Lamination Small', 10),
(5, 'Lamination Large', 20),
(7, 'Photopaper', 100);

-- --------------------------------------------------------

--
-- Table structure for table `product_usage`
--

CREATE TABLE `product_usage` (
  `id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` double NOT NULL,
  `posted_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `customer_id` int(60) NOT NULL,
  `category_id` int(11) NOT NULL,
  `insertedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insertedBy` tinyint(11) NOT NULL,
  `acceptedBy` tinyint(11) NOT NULL,
  `completedAt` timestamp NULL DEFAULT NULL,
  `amountCollected` int(11) NOT NULL,
  `state` enum('INACTIVE','PENDING','ACTIVE','COMPLETED','APPROVED','REJECTED','UNPAID') NOT NULL DEFAULT 'INACTIVE',
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `id` int(11) NOT NULL,
  `title` char(30) NOT NULL,
  `rate` double DEFAULT NULL,
  `info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`id`, `title`, `rate`, `info`) VALUES
(1, 'Photocopy 1 Sided', 2, '\"{\\n\\\"products\\\":[{\\\"product_id\\\":\\\"1\\\", \\\"quantity\\\":\\\"1\\\"}]\\n}\"'),
(2, 'MMSY Form', 150, '\"\"{\\n    \\\"products\\\" : [{\\\"product_id\\\":1, \\\"quantity\\\": 9}],\\n    \\\"creditor_id\\\":21,\\n \\\"creditor\\\":\\\"MPOnline\\\",\\n    \\\"amount\\\":100,\\n    \\\"category_id\\\":5\\n}\"\"'),
(3, 'SC Welfare Form', 150, '\"\"{\\n\\\"products\\\":[{\\\"product_id\\\":1, \\\"quantity\\\":2}],\\n\\\"creditor_id\\\":21,\\n\\\"creditor\\\":\\\"MPOnline\\\",\\n\\\"amount\\\":110.50,\\n\\\"category_id\\\":5\\n}\\n\"\"'),
(4, 'SSC Form 50', 50, '\"{\\n\\\"products\\\":[{\\\"product_id\\\":1, \\\"quantity\\\":2}],\\n\\\"category_id\\\":5\\n}\"'),
(5, 'SSC Form 150', 150, '\"\"{\\n\\\"products\\\": [{\\\"product_id\\\":1,\\\"quantity\\\":2}],\\n\\\"creditor_id\\\": 4,\\n\\\"creditor\\\":\\\"State Bank Of India\\\",\\n\\\"amount\\\": 100,\\n\\\"category_id\\\":1\\n}\"\"');

-- --------------------------------------------------------

--
-- Table structure for table `template_info`
--

CREATE TABLE `template_info` (
  `template_id` int(11) NOT NULL,
  `creditor_id` int(11) DEFAULT NULL,
  `amount` double NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `template_info`
--

INSERT INTO `template_info` (`template_id`, `creditor_id`, `amount`, `category_id`) VALUES
(2, 21, 100, 5),
(3, 21, 110.5, 5),
(4, NULL, 0, 5),
(5, 4, 100, 5);

-- --------------------------------------------------------

--
-- Table structure for table `template_products`
--

CREATE TABLE `template_products` (
  `template_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `template_products`
--

INSERT INTO `template_products` (`template_id`, `product_id`, `quantity`) VALUES
(1, 1, 1),
(2, 1, 5),
(4, 1, 2),
(5, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `description` char(30) NOT NULL,
  `quantity` double NOT NULL,
  `rate` double NOT NULL,
  `discount` double NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` tinyint(4) NOT NULL,
  `title` char(20) NOT NULL,
  `password` char(20) NOT NULL,
  `authLevel` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `title`, `password`, `authLevel`) VALUES
(1, 'Prateek Kher', 'demo112', 10);

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `against_id` int(11) DEFAULT NULL,
  `creditor_id` int(11) NOT NULL,
  `debtor_id` int(11) NOT NULL,
  `posted_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` double NOT NULL,
  `narration` text,
  `user_id` tinyint(4) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `against_id`, `creditor_id`, `debtor_id`, `posted_on`, `amount`, `narration`, `user_id`, `active`) VALUES
(10, NULL, 1, 2, '2020-03-22 14:08:54', 20, '', 1, 1),
(12, NULL, 5, 6, '2020-03-22 14:29:32', 12000, 'Demo', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledger`
--
ALTER TABLE `ledger`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_usage`
--
ALTER TABLE `product_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `raw_material_id` (`product_id`),
  ADD KEY `template_id` (`template_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `insertedBy` (`insertedBy`),
  ADD KEY `acceptedBy` (`acceptedBy`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `template_info`
--
ALTER TABLE `template_info`
  ADD PRIMARY KEY (`template_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `creditor_id` (`creditor_id`);

--
-- Indexes for table `template_products`
--
ALTER TABLE `template_products`
  ADD PRIMARY KEY (`template_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_id` (`bill_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creditor_id` (`creditor_id`),
  ADD KEY `debtor_id` (`debtor_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `against_id` (`against_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `ledger`
--
ALTER TABLE `ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `product_usage`
--
ALTER TABLE `product_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `ledger`
--
ALTER TABLE `ledger`
  ADD CONSTRAINT `ledger_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Constraints for table `product_usage`
--
ALTER TABLE `product_usage`
  ADD CONSTRAINT `product_usage_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_usage_ibfk_2` FOREIGN KEY (`template_id`) REFERENCES `template` (`id`),
  ADD CONSTRAINT `product_usage_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`insertedBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `task_ibfk_3` FOREIGN KEY (`acceptedBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `task_ibfk_4` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `template_info`
--
ALTER TABLE `template_info`
  ADD CONSTRAINT `template_info_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `template` (`id`),
  ADD CONSTRAINT `template_info_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `template_info_ibfk_3` FOREIGN KEY (`creditor_id`) REFERENCES `ledger` (`id`);

--
-- Constraints for table `template_products`
--
ALTER TABLE `template_products`
  ADD CONSTRAINT `template_products_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `template` (`id`),
  ADD CONSTRAINT `template_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`);

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`creditor_id`) REFERENCES `ledger` (`id`),
  ADD CONSTRAINT `vouchers_ibfk_2` FOREIGN KEY (`debtor_id`) REFERENCES `ledger` (`id`),
  ADD CONSTRAINT `vouchers_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `vouchers_ibfk_4` FOREIGN KEY (`against_id`) REFERENCES `vouchers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
