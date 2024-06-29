CREATE DATABASE  IF NOT EXISTS `hrv_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hrv_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hrv_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `account_type` tinyint NOT NULL DEFAULT '0',
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',1,0),(3,'thaivt','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0,0),(6,'thaivt1','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0,0),(10,'user1','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0,0),(11,'user2','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0),(12,'user333','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0,0),(13,'userabcde','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0,0),(14,'new user','36bbe50ed96841d10443bcb670d6554f0a34b761be67ec9c4a8ad2c0c44ca42c',1,0),(15,'newacc','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',1,0),(16,'thaivt123','15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',0,0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carer_id` int NOT NULL DEFAULT '1',
  `device_id` varchar(50) NOT NULL,
  `firebase_token` text NOT NULL,
  `device_information` varchar(255) DEFAULT NULL,
  `user_information` varchar(255) DEFAULT '',
  `is_active` tinyint DEFAULT '0',
  `is_running` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,3,'646f7d3b6ae430fe','dfRXrQZbRU6GN50BYlkCtW:APA91bEMhIRm1RcYCoWfhrPvHCkWR1h0qTbPh_NSrZ48-3xAjqm-TSZYfzoO1ywj4ltdyeYjAEqZLdxh6mV1rvB0PBwQQCmi7ONFtZgmZEaGiJkzqx9TP32Jia-DYzcMFqcZbGcNS4Me','samsung SM-R930','Duc Thai 123',0,0),(2,3,'123456789','123456789',' samsung Galaxy','\'\'',0,0);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predict_data`
--

DROP TABLE IF EXISTS `predict_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predict_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT '1',
  `avg_heartbeat` double DEFAULT '0',
  `prediction` varchar(255) DEFAULT 'No problem detected',
  `latitude` double DEFAULT '0',
  `longitude` double DEFAULT '0',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predict_data`
--

LOCK TABLES `predict_data` WRITE;
/*!40000 ALTER TABLE `predict_data` DISABLE KEYS */;
INSERT INTO `predict_data` VALUES (1,1,92.45,'Average heart beat is 92.45. No dangerous predicted in audio.',21.3051374,105.4349042,'2024-06-29 06:29:42'),(2,1,82.18,'Average heart beat is 82.18. In audio has: Fire.',21.3051192,105.4348318,'2024-06-29 06:34:57'),(3,1,83.27,'Average heart beat is 83.27. No dangerous predicted in audio.',21.3051339,105.4348971,'2024-06-29 07:02:36'),(4,1,85.64,'Average heart beat is 85.64.',21.3051331,105.4349106,'2024-06-29 07:03:24'),(5,1,85.91,'Average heart beat is 85.91.',21.3051235,105.4349248,'2024-06-29 07:04:05'),(6,1,84.27,'Average heart beat is 84.27.',21.3051422,105.4349015,'2024-06-29 07:04:52'),(7,1,88.91,'Average heart beat is 88.91.',21.3051272,105.4349006,'2024-06-29 07:05:46'),(8,1,82.64,'Average heart beat is 82.64.',21.3051308,105.4348984,'2024-06-29 07:06:22'),(9,1,87.55,'Average heart beat is 87.55.',21.3051306,105.4349043,'2024-06-29 07:07:09'),(10,1,85.91,'Average heart beat is 85.91.',21.3051397,105.4349024,'2024-06-29 07:07:51'),(11,1,89.36,'Average heart beat is 89.36.',21.3051345,105.4348983,'2024-06-29 07:08:36'),(12,1,88.09,'Average heart beat is 88.09.',21.3051377,105.4349022,'2024-06-29 07:09:24'),(13,2,88.09,'Average heart beat is 88.09.',21.3051377,105.4349022,'2024-06-29 07:09:24'),(14,1,90.55,'Average heart beat is 90.55.',21.3051374,105.434888,'2024-06-29 08:27:01'),(15,1,81.64,'Average heart beat is 81.64.',21.3051287,105.4349122,'2024-06-29 08:27:50'),(16,1,88,'Average heart beat is 88.0. No dangerous predicted in audio.',21.30513,105.4349115,'2024-06-29 08:28:36'),(17,1,86.36,'Average heart beat is 86.36.',21.3051324,105.4349131,'2024-06-29 08:29:27'),(18,1,86.82,'Average heart beat is 86.82.',21.3051386,105.4349065,'2024-06-29 08:30:10'),(19,1,86.09,'Average heart beat is 86.09.',21.305123,105.4348493,'2024-06-29 08:30:52'),(20,1,85.09,'Average heart beat is 85.09. No dangerous predicted in audio.',21.3051394,105.4348956,'2024-06-29 08:32:19'),(21,1,82.91,'Average heart beat is 82.91.',21.3051452,105.434904,'2024-06-29 08:32:57'),(22,1,86.91,'Average heart beat is 86.91.',21.305126,105.4349116,'2024-06-29 08:33:48'),(23,1,85.27,'Average heart beat is 85.27.',21.3051254,105.434916,'2024-06-29 08:34:32'),(24,1,85.73,'Average heart beat is 85.73. No dangerous predicted in audio.',21.3051356,105.4349041,'2024-06-29 08:36:44'),(25,1,86.55,'Average heart beat is 86.55.',21.3051356,105.4349041,'2024-06-29 08:37:15'),(26,1,86.91,'Average heart beat is 86.91.',21.3051377,105.4349043,'2024-06-29 08:37:46'),(27,1,82.73,'Average heart beat is 82.73.',21.305139,105.4348963,'2024-06-29 08:38:15'),(28,1,85.09,'Average heart beat is 85.09.',21.305139,105.4348919,'2024-06-29 08:38:43'),(29,1,84.64,'Average heart beat is 84.64.',21.3051297,105.4348922,'2024-06-29 08:39:14'),(30,1,87.67,'Average heart beat is 87.67. No dangerous predicted in audio.',21.3051385,105.4348958,'2024-06-29 08:40:30'),(31,1,83.45,'Average heart beat is 83.45.',21.3051387,105.434894,'2024-06-29 08:41:28'),(32,1,87.82,'Average heart beat is 87.82. No dangerous predicted in audio.',21.3051309,105.4349146,'2024-06-29 08:43:32'),(33,1,79.73,'Average heart beat is 79.73.',21.3051356,105.4349066,'2024-06-29 08:44:32'),(34,1,80.55,'Average heart beat is 80.55.',21.3051276,105.4348928,'2024-06-29 08:45:33'),(35,1,81.82,'Average heart beat is 81.82.',21.3051389,105.4349037,'2024-06-29 08:46:32'),(36,1,84.36,'Average heart beat is 84.36. No dangerous predicted in audio.',21.3051328,105.4349033,'2024-06-29 08:47:33'),(37,1,82.73,'Average heart beat is 82.73. In audio has: Wild animals.',21.3050989,105.434949,'2024-06-29 08:48:50'),(38,1,79.82,'Average heart beat is 79.82. No dangerous predicted in audio.',21.3051281,105.434899,'2024-06-29 08:49:51'),(39,1,79.36,'Average heart beat is 79.36. No dangerous predicted in audio.',21.3051327,105.4349008,'2024-06-29 08:50:54'),(40,1,80.36,'Average heart beat is 80.36. No dangerous predicted in audio.',21.3050858,105.4349119,'2024-06-29 08:51:49'),(41,1,83.33,'Average heart beat is 83.33. No dangerous predicted in audio.',21.3051348,105.4349017,'2024-06-29 08:52:50'),(42,1,86.82,'Average heart beat is 86.82. No dangerous predicted in audio. No dangerous predicted in audio.',21.3051285,105.434908,'2024-06-29 08:53:54'),(43,1,86,'Average heart beat is 86.0. No dangerous predicted in audio.',21.3051336,105.4349735,'2024-06-29 08:58:06'),(44,1,0,'Cannot get heart beat data.',21.3051336,105.4349735,'2024-06-29 09:02:24'),(45,1,0,'Cannot get heart beat data. Cannot get position data.',NULL,NULL,'2024-06-29 09:02:36'),(46,1,89.45,'Average heart beat is 89.45. No dangerous predicted in audio.',21.3051286,105.4348769,'2024-06-29 10:39:16'),(47,1,76.09,'Average heart beat is 76.09. No dangerous predicted in audio.',21.3051242,105.4349067,'2024-06-29 10:40:16'),(48,1,85.73,'Average heart beat is 85.73. No dangerous predicted in audio.',21.3051229,105.4349015,'2024-06-29 10:41:12'),(49,1,85.75,'Average heart beat is 85.75. No dangerous predicted in audio.',21.3051195,105.4349247,'2024-06-29 10:42:18'),(50,1,87,'Average heart beat is 87.0. No dangerous predicted in audio.',21.3051224,105.4348935,'2024-06-29 10:43:17'),(51,1,63.18,'Average heart beat is 63.18. No dangerous predicted in audio.',21.305116,105.4349113,'2024-06-29 10:44:18'),(52,1,79.91,'Average heart beat is 79.91. No dangerous predicted in audio.',21.3051264,105.4349082,'2024-06-29 10:45:16'),(53,1,80.82,'Average heart beat is 80.82. No dangerous predicted in audio.',21.3051236,105.4349106,'2024-06-29 10:46:16'),(54,1,83,'Average heart beat is 83.0. No dangerous predicted in audio.',21.305119,105.4349115,'2024-06-29 10:47:18'),(55,1,0,'Cannot get heart beat data.',21.305124,105.434904,'2024-06-29 10:48:18'),(56,1,87.82,'Average heart beat is 87.82. No dangerous predicted in audio.',21.305124,105.434904,'2024-06-29 10:48:18'),(57,1,83.82,'Average heart beat is 83.82. No dangerous predicted in audio.',21.3051156,105.4349108,'2024-06-29 10:49:18'),(58,1,0,'Cannot get heart beat data.',21.3051156,105.4349108,'2024-06-29 10:49:18'),(59,1,85.36,'Average heart beat is 85.36.',21.3051002,105.4349069,'2024-06-29 10:50:18'),(60,1,0,'Cannot get heart beat data. No dangerous predicted in audio.',21.3051002,105.4349069,'2024-06-29 10:50:18'),(61,1,0,'Cannot get heart beat data. No dangerous predicted in audio.',21.3051196,105.4349225,'2024-06-29 10:51:18'),(62,1,86.18,'Average heart beat is 86.18.',21.3051196,105.4349225,'2024-06-29 10:51:18'),(63,1,87.2,'Average heart beat is 87.2. No dangerous predicted in audio.',21.3051155,105.4349095,'2024-06-29 10:52:18'),(64,1,84.27,'Average heart beat is 84.27. No dangerous predicted in audio.',21.305115,105.4349103,'2024-06-29 10:53:15'),(65,1,90.36,'Average heart beat is 90.36. No dangerous predicted in audio.',21.3051239,105.4349091,'2024-06-29 10:54:11'),(66,1,92.5,'Average heart beat is 92.5. No dangerous predicted in audio.',21.3051175,105.4349114,'2024-06-29 10:55:19'),(67,1,78,'Average heart beat is 78.0. No dangerous predicted in audio.',21.3051366,105.4348897,'2024-06-29 10:56:18'),(68,1,87.09,'Average heart beat is 87.09. No dangerous predicted in audio.',21.3051334,105.4348978,'2024-06-29 10:57:17'),(69,1,98,'Average heart beat is 98.0. No dangerous predicted in audio.',21.3051309,105.4349057,'2024-06-29 11:08:23'),(70,1,81,'Average heart beat is 81.0. No dangerous predicted in audio.',21.3051288,105.4348743,'2024-06-29 11:09:23'),(71,1,87,'Average heart beat is 87.0.',21.3051368,105.4349056,'2024-06-29 11:11:09'),(72,1,84,'Average heart beat is 84.0. No dangerous predicted in audio.',21.3051353,105.4348963,'2024-06-29 11:11:56'),(73,1,84,'Average heart beat is 84.0. No dangerous predicted in audio.',21.3051376,105.434902,'2024-06-29 11:12:17');
/*!40000 ALTER TABLE `predict_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-29 12:06:10
