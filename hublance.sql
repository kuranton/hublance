/*
 Navicat MySQL Data Transfer

 Source Server         : mylocalmysql
 Source Server Type    : MySQL
 Source Server Version : 50644
 Source Host           : localhost:3306
 Source Schema         : hublance

 Target Server Type    : MySQL
 Target Server Version : 50644
 File Encoding         : 65001

 Date: 20/08/2019 16:42:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for certificates
-- ----------------------------
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates`  (
  `cert_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cert_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of certificates
-- ----------------------------
INSERT INTO `certificates` VALUES (1, 'Hubspot CMS for Developers', '/img/sert/1.jpg');
INSERT INTO `certificates` VALUES (2, 'Sales Enablement', '/img/sert/2.jpg');
INSERT INTO `certificates` VALUES (3, 'Growth-Driven Design Agency', '/img/sert/3.jpg');
INSERT INTO `certificates` VALUES (4, 'HubSpot Sales Software', '/img/sert/4.jpg');

-- ----------------------------
-- Table structure for freelancer_cert
-- ----------------------------
DROP TABLE IF EXISTS `freelancer_cert`;
CREATE TABLE `freelancer_cert`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `certificate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of freelancer_cert
-- ----------------------------
INSERT INTO `freelancer_cert` VALUES (1, '1', '1');
INSERT INTO `freelancer_cert` VALUES (2, '1', '2');
INSERT INTO `freelancer_cert` VALUES (3, '1', '3');
INSERT INTO `freelancer_cert` VALUES (4, '1', '4');
INSERT INTO `freelancer_cert` VALUES (5, '2', '1');
INSERT INTO `freelancer_cert` VALUES (6, '2', '2');
INSERT INTO `freelancer_cert` VALUES (7, '2', '3');
INSERT INTO `freelancer_cert` VALUES (8, '2', '4');
INSERT INTO `freelancer_cert` VALUES (9, '3', '1');
INSERT INTO `freelancer_cert` VALUES (10, '3', '2');
INSERT INTO `freelancer_cert` VALUES (11, '3', '3');
INSERT INTO `freelancer_cert` VALUES (12, '3', '4');
INSERT INTO `freelancer_cert` VALUES (13, '4', '1');
INSERT INTO `freelancer_cert` VALUES (14, '4', '2');
INSERT INTO `freelancer_cert` VALUES (15, '4', '3');
INSERT INTO `freelancer_cert` VALUES (16, '4', '4');
INSERT INTO `freelancer_cert` VALUES (17, '5', '1');
INSERT INTO `freelancer_cert` VALUES (18, '5', '2');
INSERT INTO `freelancer_cert` VALUES (19, '5', '3');
INSERT INTO `freelancer_cert` VALUES (20, '5', '4');
INSERT INTO `freelancer_cert` VALUES (21, '6', '1');
INSERT INTO `freelancer_cert` VALUES (22, '6', '2');
INSERT INTO `freelancer_cert` VALUES (23, '6', '3');
INSERT INTO `freelancer_cert` VALUES (24, '6', '4');

-- ----------------------------
-- Table structure for freelancers
-- ----------------------------
DROP TABLE IF EXISTS `freelancers`;
CREATE TABLE `freelancers`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `line` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `about` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `expanded` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of freelancers
-- ----------------------------
INSERT INTO `freelancers` VALUES (1, '/img/person/1.jpg', 'SEO Speicalist', 'Daniel Hoffman', '50', 'Germany', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea', NULL, 'false', 'email@gmail.com');
INSERT INTO `freelancers` VALUES (2, '/img/person/2.jpg', 'Designer', 'Daniel Hoffman', '20', 'Poland', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea', NULL, 'false', 'email@gmail.com');
INSERT INTO `freelancers` VALUES (3, '/img/person/3.jpg', 'Developer', 'Daniel Hoffman', '40', 'USA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea', NULL, 'false', 'email@gmail.com');
INSERT INTO `freelancers` VALUES (4, '/img/person/4.jpg', 'Developer', 'Daniel Hoffman', '60', 'Thailand', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea', NULL, 'false', 'email@gmail.com');
INSERT INTO `freelancers` VALUES (5, '/img/person/5.jpg', 'Desinger', 'Daniel Hoffman', '90', 'USA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea', NULL, 'false', 'email@gmail.com');
INSERT INTO `freelancers` VALUES (6, '/img/person/6.jpg', 'Developer', 'Daniel Hoffman', '110', 'Russia', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea', NULL, 'false', 'email@gmail.com');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'aa', 'aa', '$2a$10$FwXZwqHrElvORYkO.L4NiuVDLAbOKe9SouO4pxzofhu2VuhIqH7qO');
INSERT INTO `users` VALUES (2, 'bb', 'bb', '$2a$10$GrbtdCQAzIoddxGtxdQwOeYP9tiYAuCg0zFG.Kt6P5qnR4KhUbVye');
INSERT INTO `users` VALUES (3, 'asdfasdf', 'asdfasdf', '$2a$10$ccSXtaLO7ZLrO0sYh/VHjOd6RNuFklE8Yt2kEvDDAnYz/x8v7Jz2O');
INSERT INTO `users` VALUES (4, 'asdf', 'sdf', '$2a$10$Tro91eFi1BuAOrfuLrZ9u.G.ei9fpAzPjj/Q6ULoZyfTkiEQVGSIe');
INSERT INTO `users` VALUES (5, 'ww', 'ww', '$2a$10$MXnhHR/zjilnqJRv0tQpMOwI1t3PeZkV/nNS4qm8lhCxhFHJdm.tK');
INSERT INTO `users` VALUES (6, 'ww', 'ww@ww.com', '$2a$10$LiMkl7mwRsS6sxQoNGXo1.XkmRVzzgL8Y2mzmVaVefbVFZezC7Gvm');
INSERT INTO `users` VALUES (7, 'eee', 'eee', '$2a$10$LVn5Tk6jR7x.jQge8Q0emu8iBpAqf.weima36MYEy3l.LIM0pQ5FG');
INSERT INTO `users` VALUES (8, 'eee', 'eee@eee.com', '$2a$10$yNGNu5WkEg1M6yC74xAUm.gCEweUVoUIkLibqVfM/1qxXJdcqV5ui');
INSERT INTO `users` VALUES (9, 'wer', 'wer@we.com', '$2a$10$4J41oVV3v1MK1lzpKMqp6O5Vh9OW7FuRAud45n.ajYccxNKrAwCd2');
INSERT INTO `users` VALUES (10, 'rr', 'rr@rr.com', '$2a$10$cTdoPQxBw88hDgrK03IdKewnY4iM8h6zhgLzpD7H2x5IIJFJ5Kdji');

SET FOREIGN_KEY_CHECKS = 1;
