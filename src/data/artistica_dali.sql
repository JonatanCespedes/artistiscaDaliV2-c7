-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: artistica_dali
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.20-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_FK` (`userId`),
  CONSTRAINT `addresses_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'efrgergver','','',NULL,12341234,17),(2,'efrgergver','','',NULL,12341234,17);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `banner` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Escolar','banner_escolar.jpg'),(2,'ArtÃƒÂ­stica','banner_artistica.jpg'),(3,'Oficina','banner_oficina.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `subcategoryId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `images` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subcategory_idx` (`subcategoryId`),
  CONSTRAINT `subcategory` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,'Acrilico profesional Winsor & Newton 60ml, ca',1010,25,'El acrÃƒÂ­lico profesional es nuestra gama posee la calidad mÃƒÂ¡s fina. Combina nuestra experiencia con los colores y los ÃƒÂºltimos avances en tecnologÃƒÂ­a de resina. Nuestros 80 colores son brillantes cuando estÃƒÂ¡n hÃƒÂºmedos y siguen siendo tan brillante cuando estÃƒÂ¡n seco. Lo que se ve es realmente lo que es.-r-nCon 62 colores individuales de pigmento esto crea el mÃƒÂ¡s limpio espectro brillante y las mejores oportunidades de mezcla de color.',12,NULL,'2020-10-16 02:20:05',NULL),(25,'Bandeja acuarela Giotto 24 colores + pincel',628,15,'Las acuarelas Giotto proporcionan una gama de colores brillantes, vivos y opacos para que crees tu obra maestra.-r-nMezcla los colores como un chef mezcla sus ingredientes para crear una realidad mÃƒÂ¡gica.-r-nY para fantÃƒÂ¡sticos efectos de acuarela simplemente diluye la pintura con agua.',5,NULL,'2020-10-16 02:20:48',NULL),(26,'Acuarelas Rembrandt traditional estuche X22',28123,5,'Rembrandt es el nombre legendario de una gama que es conocida por su calidad superior e inigualable. Se ha desarrollado a travÃƒÂ©s de pura habilidad y visiÃƒÂ³n artÃƒÂ­stica y se basa en las mejores materias primas.-r-nContenido:-r-n-22 sartenes (108- 224- 254- 268- 270- 336- 366- 370- 371- 409- 411- 416- 506- 508- 532- 535- 615- 620- 623- 662- 702- 708)-r-n-1 cepillo serie 110 no. 4 (cabello puro rojo sable)-r-n-Bandeja mezcladora de porcelana',5,NULL,'2020-11-12 02:04:54',NULL),(27,'ATRIL A MORZA REGULABLE LUSTRADO SEURAT',6220,5,'Atril a morza regulable lustrado Seurat',6,NULL,NULL,NULL),(28,'BARNIZ POLIURETANICO AL AGUA EUREKA X 250ML',324,8,'Barniz poliuretanico al agua ofrece una variada gama de aplicaciÃƒÂ³n, es de secado rÃƒÂ¡pido.-r-nLa pelicula protectora que forma no deja formar rayas de pincel, debido a su poder autonivelante. de terminaciÃƒÂ³n brillante, muy resistente y duradera.-r-nO AMARILLEA APTO PARA INTERIORES Y EXTERIORES SECADO AL TACTO 1 HORA, DOS MANOS DE 2 A 3 HORAS.-r-nSECADO TOTAL 24 HORAS.',16,NULL,'2020-10-16 02:30:25',NULL),(29,'BASTIDOR SEURAT',703,5,'50X65 CM TELA ESTUDIO GRANO FINO',21,NULL,NULL,NULL),(30,'BASTIDOR SEURAT 20X20 CM TELA ESTUDIO GRANO F',208,12,'Bastidor Seurat-r-nTela Estudio-r-nGrano Fino',21,NULL,'2020-10-16 02:31:11',NULL),(31,'BIBLIORATO AVIOS LOMO DE PAPEL LEGAL',208,5,'Reforzado, la mejor calidad.',8,NULL,'2020-10-16 02:31:44',NULL),(32,'CABALLETE VERTICAL A VARILLA LUSTRADO SEURAT',45960,5,'-Caballete vertical a varilla roscada lustrado-r-n-Medidas cerrado: 99x92x222-r-n-Altura maxima Mastil 340 cm-r-n-Altura maxima de bastidor soportado  275cm',26,NULL,'2020-10-16 02:32:17',NULL),(33,'CAJA PLASTICA UTIL-OF AMERICANA',781,5,'COLOR AZUL 2,5 X 32,5 X 25,5 CM',20,NULL,NULL,NULL),(34,'CAJA UTIL-OF KRAFT',230,5,'LOMO 4 CM 3 SOLAPAS PLASTIFICADA MARRON',20,NULL,NULL,NULL),(35,'ESTUCHE ALBA OLEO EXTRA FINO 10 POMOS DE 18ML',2372,5,'Estuche Alba Oeo Profesional-r-nContiene 10 pomos de 18ml de ÃƒÂ³leos extra fino para uso profesional.',4,NULL,'2020-10-16 02:33:40',NULL),(36,'Carpeta Mooving fortnite a4 2 anillos x40cm',350,10,'Carpeta Mooving de fortnite a4 2 anillos x40 centimetros',11,NULL,'2020-10-16 02:34:11',NULL),(37,'Cartuchera Mooving doble cierre fortnite, ref',735,5,'Cartuchera Mooving doble cierre fortnite, reforzada',2,NULL,'2020-10-16 02:34:40',NULL),(38,'CINTA UTIL-OF ADHESIVA 48 X 50 YDS TRANSPAREN',59,5,'Cinta adhesiva de embalar transparente 48x50 METROS-r-nPrimera Marca, Primera Calidad',22,NULL,'2020-10-16 02:35:18',NULL),(39,'COMPAS PLAN-TEC 9112 BIGOTERA AJUSTE RAPIDO',1450,10,'Con dispositivo de ajuste rÃƒÂ¡pido y regulador micromÃƒÂ©trico. Para cÃƒÂ­rculos de 1mm a 300mm Conjunto: compÃƒÂ¡s, adaptador universar y portaminas',14,NULL,'2020-10-16 02:35:49',NULL),(40,'CUADERNO EXITO TAPA DURA FORRADO UNIVERSO NÃ‚',195,5,'CUADERNO TAPA DURA 19X24 48 HOJAS RAYADAS UNIVERSO EXITO E3-r-n* 10 COLORES A ELECCION-r-n*CUADERNO COCIDO-r-n*FORRADO EN VINILICO LAVABLE-r-n*PAPEL DE FIBRA DE CAÃƒâ€˜A',15,NULL,'2020-10-16 02:36:38',NULL),(41,'GOMA STABILO EXAM GRADE NEGRA',65,5,'GOMA STABILO EXAM GRADE NEGRA',18,NULL,NULL,NULL),(42,'Lapices de colores Faber Castell Kit',665,5,'LÃƒÂ¡pices de madera clÃƒÂ¡sicos: lÃƒÂ¡pices de color estÃƒÂ¡ndar con forma hexagonal.-r-nDestacan por sus colores intensos y por un especial proceso de encolado que hace que las minas sean sÃƒÂºper resistentes a la rotura.-r-nLos lÃƒÂ¡pices de color clÃƒÂ¡sicos estÃƒÂ¡n disponibles en 60 colores diferentes.',3,NULL,'2020-10-16 02:37:25',NULL),(43,'Sharpie Kit Lettering crea tus diseÃƒÂ±os 30 ',4500,10,'El Set Lettering Sharpie contiene:-r-n-10 Marcadores Permanentes Sharpie Punta Fina-r-n-4 Boligrafos Sharpie Pen-r-n-6 Boligrafos Sharpie Pen Brush-r-n-2 Marcadores Sharpie Paint-r-n-5 Sobres con Tarjeta-r-n-3 Tarjetas portanombres',10,NULL,'2020-10-16 02:38:24',NULL),(44,'Resaltador Stabilo Swing Cool Paster x6, la m',95,5,'Marca NÃ‚Âº1 en resaltadores. Colores pastel, punta biselada. Colores disponibles:-r-n-amarillo-r-n-celeste-r-n-lila-r-n-naranja-r-n-rosa-r-n-verde',10,NULL,'2020-10-16 02:39:06',NULL),(45,'MARCADOR ALBA ACRYLIC 6MM (COLORES VARIOS)',290,5,'-son de base acrilica-r-n-20 colores compatibles con Decoralba-r-n-multisuperficie (papel-carton-tela-vidrio-pared-macetas-mdf-etc...)-r-n-vienen 2 puntas (chisel y bullet)-r-n-colores brillantes-r-n-resistencia UV',10,NULL,'2020-10-16 02:39:52',NULL),(46,'Valija Cresko Disney Spiderman 17',5240,6,'Valija Cresko Disney Spiderman 17',1,NULL,NULL,NULL),(47,'PERFORADORA MIT CHICA PINTADA',485,5,'Perforador metÃƒÂ¡lico y zona de sujeciÃƒÂ³n antideslizante.-r-nCuerpo metÃƒÂ¡lico muy resistente. Practicidad y suavidad de funcionamiento con mecanismo de punzÃƒÂ³n sin fricciÃƒÂ³n.',24,NULL,'2020-10-16 02:40:49',NULL),(48,'Mini pincel Winsor & Newton',449,5,'Pincel Winsor & Newton mini, pincel de bolsillo.-r-nEspecial para acuarelas, gouache, tinta.',13,NULL,'2020-10-16 02:41:26',NULL),(49,'PIZARRA GALAXIA 80X120',2600,5,'Pizarra blanca laminada Galaxia.-r-nDimensiones: 80x120-r-nMarco metÃƒÂ¡lico color negro.',23,NULL,'2020-10-16 02:42:00',NULL),(50,'EPUESTO EXITO NÃ‚Âº3 CAJA FAMILIAR POR 480 HO',1200,5,'REPUESTO EXITO NÃ‚Âº3 CAJA FAMILIAR POR 480 HOJAS RAYADO',27,NULL,'2020-10-16 02:43:09',NULL),(51,'REPUESTO RIVADAVIA NÃ‚Âº 3 FAMILIAR 288 HOJAS',299,10,'REPUESTO RIVADAVIA NÃ‚Âº 3 FAMILIAR POR 288 HOJAS',27,NULL,'2020-10-16 02:43:59',NULL),(52,'SOBRE MEDORO CAJA 2781 OBRA 12.5X19 BOLSA 80G',123,10,'Sobre tipo caja, varias medidas',25,NULL,'2020-10-16 02:44:32',NULL),(53,'SOBRE MEDORO CAJA A1386 OFICIO CON VENTANA IN',112,0,'Papel obre, la mejor calidad',25,NULL,'2020-10-29 14:46:15',NULL),(54,'TIJERA PIZZINI SPAZIO ACERO 17 CM ACERO MANGO',150,10,'TIJERA PIZZINI SPAZIO ACERO 17 CM ACERO MANGO PLASTICO',19,NULL,'2020-10-16 02:45:20',NULL),(55,'TINTA ROTRING PARA ESTILOGRAFO 250ML. COLOR N',2588,10,'Adecuada para papel vegetal, papel de dibujo, cartulina de dibujo y y tus proyectos. Tiene gran fluidez, es muy opaca y presenta buena adherencia. No mancha cuando se seca, imborrable , resistente a la luz, adecuada para todo tipo de reproducciones, admite la mezcla de tintas de distintos colores, gran pureza del color.',17,NULL,'2020-10-16 02:45:52',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_images_FK` (`productId`),
  CONSTRAINT `products_images_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_idx` (`categoryId`),
  CONSTRAINT `categoria` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Mochilas',1,NULL,NULL),(2,'Cartucheras',1,NULL,NULL),(3,'LÃƒÂ¡pices',1,NULL,NULL),(4,'Oleos',2,NULL,NULL),(5,'Acuarelas',2,NULL,NULL),(6,'Atriles',2,NULL,NULL),(8,'Biblioratos',3,NULL,NULL),(9,'Abrochadoras',3,NULL,NULL),(10,'Marcadores',2,NULL,NULL),(11,'Carpetas',1,NULL,NULL),(12,'AcrÃƒÂ­licos',2,NULL,NULL),(13,'Pinceles',2,NULL,NULL),(14,'CompÃƒÂ¡s',2,NULL,NULL),(15,'Cuadernos',1,NULL,NULL),(16,'Barniz',2,NULL,NULL),(17,'Tintas',2,NULL,NULL),(18,'Gomas',1,NULL,NULL),(19,'Tijeras',1,NULL,NULL),(20,'Cajas',3,NULL,NULL),(21,'Bastidores',2,NULL,NULL),(22,'Cintas Adhesivas',3,NULL,NULL),(23,'Pizarras',3,NULL,NULL),(24,'Perforadoras',3,NULL,NULL),(25,'Sobres',3,NULL,NULL),(26,'Caballetes y atriles',2,NULL,NULL),(27,'Repuestos',1,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Jona','Jona','mail3@mail.com','$2a$10$g9YXAsgvDDsFzEkSsqi3Fes8e/9mvviTSUYTs13llZf/5/YwpVncO','15151515',0,'2021-09-24 02:05:57','2021-09-24 02:48:31','1632450586832_img_.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'artistica_dali'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-24  0:03:24
