-- MySQL dump 10.13  Distrib 8.0.37, for macos14 (x86_64)
--
-- Host: localhost    Database: bankNeoCommerce
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `TransactionList`
--

DROP TABLE IF EXISTS `TransactionList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionList` (
  `ReferenceNo` varchar(100) DEFAULT NULL,
  `TransferAmount` varchar(100) DEFAULT NULL,
  `TransferRecord` varchar(100) DEFAULT NULL,
  `FromAccountNo` varchar(100) DEFAULT NULL,
  `ToAccountNo` varchar(100) DEFAULT NULL,
  `ToAccountName` varchar(100) DEFAULT NULL,
  `ToAccountBank` varchar(100) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Maker` varchar(100) DEFAULT NULL,
  `TransferDate` timestamp NULL DEFAULT NULL,
  `ApprovalStatus` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionList`
--

LOCK TABLES `TransactionList` WRITE;
/*!40000 ALTER TABLE `TransactionList` DISABLE KEYS */;
INSERT INTO `TransactionList` VALUES ('REF654321','1000.00','Completed','ACC0987654321','BNC2342342','John Doe','BNC','This is message','maker name','2024-05-24 07:30:00','Approved'),('KIK423424321','2000.00','Completed','ACC09E54321','BBC2342342','Scarlett Red','BNC','This is message','maker name','2024-05-24 08:30:00','Approved'),('KKK42311321','2000.00','Completed','ACC09E54321','BBC2342342','Scarlett Red','BNC','This is message','maker name','2024-05-24 08:30:00','Awaiting Approval'),('ReferenceNo','10000000','TransferRecord','FromAccountNo','1234567','Santos','BRI','Description','Maker','2024-05-24 07:30:00','Awaiting Approval'),('ReferenceNo','10000000','TransferRecord','FromAccountNo','1234567','Santos','BRI','Description','Maker','2024-05-24 07:30:00','Awaiting Approval');
/*!40000 ALTER TABLE `TransactionList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionOverview`
--

DROP TABLE IF EXISTS `TransactionOverview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionOverview` (
  `AwaitingApproval` int DEFAULT NULL,
  `Approved` int DEFAULT NULL,
  `Rejected` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionOverview`
--

LOCK TABLES `TransactionOverview` WRITE;
/*!40000 ALTER TABLE `TransactionOverview` DISABLE KEYS */;
INSERT INTO `TransactionOverview` VALUES (10,20,15);
/*!40000 ALTER TABLE `TransactionOverview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `CorporateAccount` varchar(255) DEFAULT NULL,
  `CorporateName` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `UserRole` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Verification` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('accountNumber','corporateName','userId','userName','Approver','12312312','email@gmail.com','Verification','$2b$10$TyQMXAQJIpKD5JZl8uSSJeiOtvg6NMD1STy116FEL2x2TfzD8u./2'),('corporate','corporate','corporate','corporate','Approver','342342342324','christoph0895@gmail.com','verification','$2b$10$RdSJGnekbTlP1pb3azmUR.Q3DA8rLl0w8hzoDDqm1A2DkZSe6LaXa'),('unique','unique','userId','userName','','+6285363425068','christoph0895@gmail.com','verification','$2b$10$L1W0rWyiH5lLJ6cMl8XotO681Eb5ET45YGnk9iO887lgPr796WE7a'),('unique','unique','userId','userName','Approver','+6285363425068','christoph0895@gmail.com','verification','$2b$10$CHkJaxPQfL4K5uuLdPKD5eznIMGnKmkhea1l.qtovehiNolei6TFG'),('unique','unique','userId','userName','Approver','+6285363425068','christoph0895@gmail.com','verification','$2b$10$aSYLnJklAAkMWQAKreTT3OcLEDASr8sTJlK.Vq6pQb0Mj49OGoadS'),('unique','unique','userId','unique','Maker','+62853463773','christoph@gmial.com','verification','$2b$10$jC5AR8wbO5vaH157uX84wOGmjSNiGah0u8DZodc3aFQ5InNCI3YEq'),('unique','unique','userId','unique','Maker','+62853463773','christoph@gmial.com','verification','$2b$10$UBig6C57LB4aLOaytoH2ieghFl1m8xH/d7txFNXqVCTysV6XVVzVe'),('unique','unique','userId','unique','Maker','+62853463773','christoph@gmial.com','verification','$2b$10$J7DI.aN4PGvGaFWy3ZwykumlUckk2vJEmXtY5cLOh9lh85RKgeh8i');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28  9:00:01
