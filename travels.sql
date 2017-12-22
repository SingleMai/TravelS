/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : travels

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2017-12-23 00:21:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `account` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `permission` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'singlemai', '20140400854', '3668481', '1');
INSERT INTO `admin` VALUES ('4', 'ccr', '2014040083', 'ccr19950113', '1');

-- ----------------------------
-- Table structure for `carousel`
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL COMMENT '轮播图标题',
  `content` varchar(50) NOT NULL COMMENT '轮播图描述',
  `carousel` varchar(50) NOT NULL COMMENT '轮播图文件名',
  `link` varchar(50) NOT NULL COMMENT '跳转链接',
  `weight` int(10) NOT NULL COMMENT '权重，数值越大，权重越高',
  `site` int(10) NOT NULL DEFAULT '1' COMMENT '轮播图位置标志。默认1为首页',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES ('20', '1', '1', '1', '1', '1', '1');
INSERT INTO `carousel` VALUES ('21', '2', '2', '2', '2', '2', '1');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `servies_id` int(15) NOT NULL,
  `buyer_id` int(15) NOT NULL,
  `servies_comment_id` int(15) NOT NULL,
  `status` int(10) NOT NULL COMMENT '订单状态：-1. 已失效<br>0: 待付款<br>1: 待接收<br>2: 已确认<br>3: 售后',
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for `servies`
-- ----------------------------
DROP TABLE IF EXISTS `servies`;
CREATE TABLE `servies` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `shop_id` int(15) NOT NULL,
  `head_img` varchar(15) NOT NULL,
  `title` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `price` int(30) NOT NULL COMMENT '价格（以分为单位）',
  `type_id` int(15) NOT NULL,
  `views` int(10) NOT NULL,
  `likes` int(10) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servies
-- ----------------------------

-- ----------------------------
-- Table structure for `servies_comment`
-- ----------------------------
DROP TABLE IF EXISTS `servies_comment`;
CREATE TABLE `servies_comment` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `servies_id` int(15) NOT NULL,
  `order_id` int(15) NOT NULL,
  `content` text NOT NULL,
  `starts` int(10) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servies_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `servies_comment_img`
-- ----------------------------
DROP TABLE IF EXISTS `servies_comment_img`;
CREATE TABLE `servies_comment_img` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `comments_id` int(15) NOT NULL,
  `servies_comment_img` varchar(30) NOT NULL,
  `order` int(10) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servies_comment_img
-- ----------------------------

-- ----------------------------
-- Table structure for `servies_img`
-- ----------------------------
DROP TABLE IF EXISTS `servies_img`;
CREATE TABLE `servies_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `servies_id` int(15) NOT NULL,
  `servies_img` varchar(30) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servies_img
-- ----------------------------

-- ----------------------------
-- Table structure for `servies_reply`
-- ----------------------------
DROP TABLE IF EXISTS `servies_reply`;
CREATE TABLE `servies_reply` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `comments_id` int(15) NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servies_reply
-- ----------------------------

-- ----------------------------
-- Table structure for `servies_type`
-- ----------------------------
DROP TABLE IF EXISTS `servies_type`;
CREATE TABLE `servies_type` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servies_type
-- ----------------------------
INSERT INTO `servies_type` VALUES ('1', '一日游');
INSERT INTO `servies_type` VALUES ('2', '多日游');
INSERT INTO `servies_type` VALUES ('3', '门票');
INSERT INTO `servies_type` VALUES ('4', '酒店');
INSERT INTO `servies_type` VALUES ('5', '演出活动');
INSERT INTO `servies_type` VALUES ('6', '当地特产');
INSERT INTO `servies_type` VALUES ('7', '租车');

-- ----------------------------
-- Table structure for `travels`
-- ----------------------------
DROP TABLE IF EXISTS `travels`;
CREATE TABLE `travels` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `user_id` int(15) NOT NULL,
  `content` text NOT NULL,
  `views` int(10) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of travels
-- ----------------------------
INSERT INTO `travels` VALUES ('1', '1', 'aa', '0', '2017-12-20 22:58:47');
INSERT INTO `travels` VALUES ('2', '2', 'bb', '0', '2017-12-22 23:41:41');

-- ----------------------------
-- Table structure for `travels_comment`
-- ----------------------------
DROP TABLE IF EXISTS `travels_comment`;
CREATE TABLE `travels_comment` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `travels_id` int(15) NOT NULL,
  `commenter` int(15) NOT NULL,
  `replyer` int(15) NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of travels_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `travels_img`
-- ----------------------------
DROP TABLE IF EXISTS `travels_img`;
CREATE TABLE `travels_img` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `travels_id` int(15) NOT NULL,
  `travels_img` varchar(30) NOT NULL,
  `order` int(10) NOT NULL COMMENT '图片展示的顺序，从小到大排序',
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of travels_img
-- ----------------------------
INSERT INTO `travels_img` VALUES ('1', '1', 'AA', '0', '2017-12-20 23:45:03');
INSERT INTO `travels_img` VALUES ('2', '1', 'BB', '1', '2017-12-23 00:00:29');

-- ----------------------------
-- Table structure for `travels_likes`
-- ----------------------------
DROP TABLE IF EXISTS `travels_likes`;
CREATE TABLE `travels_likes` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `travels_id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of travels_likes
-- ----------------------------
INSERT INTO `travels_likes` VALUES ('1', '1', '1');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `head` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `sex` int(2) NOT NULL COMMENT ' 0： 保密<br>1: 男<br>2: 女',
  `phone` int(30) NOT NULL,
  `wetchat` varchar(30) NOT NULL,
  `blog` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `instroduction` text NOT NULL,
  `has_id_card` tinyint(2) NOT NULL,
  `has_edu_card` tinyint(2) NOT NULL,
  `has_guide_card` tinyint(2) NOT NULL,
  `has_drive_card` tinyint(2) NOT NULL,
  `has_shop` tinyint(2) NOT NULL,
  `born` date NOT NULL,
  `job` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `school` varchar(30) NOT NULL,
  `recommend_id` int(15) DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `wetchar` (`wetchat`),
  UNIQUE KEY `blog` (`blog`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'aaa', 'singlemai', '1', '13164791', '', '', '', 'a', '0', '0', '0', '0', '0', '2017-12-13', 'a', '', '', '0', '2017-12-20 22:58:34');
INSERT INTO `users` VALUES ('2', 'bbb', 'single', '2', '46497612', '13164641', '1', '1', 'b', '0', '0', '0', '0', '0', '2017-12-19', 'a', '', '', '0', '2017-12-11 23:42:43');

-- ----------------------------
-- Table structure for `user_card`
-- ----------------------------
DROP TABLE IF EXISTS `user_card`;
CREATE TABLE `user_card` (
  `id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `card_img` varchar(30) NOT NULL,
  `status` int(2) NOT NULL COMMENT '-1: 认证不通过<br>0: 未认证<br>1: 已认证<br>',
  `type` int(2) NOT NULL COMMENT '0: 身份证<br>1: 学历证<br>2: 导游证<br>3: 驾驶证',
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_card
-- ----------------------------

-- ----------------------------
-- Table structure for `user_likes`
-- ----------------------------
DROP TABLE IF EXISTS `user_likes`;
CREATE TABLE `user_likes` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `user_id` int(15) NOT NULL,
  `servies_id` int(15) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_likes
-- ----------------------------

-- ----------------------------
-- Table structure for `user_private`
-- ----------------------------
DROP TABLE IF EXISTS `user_private`;
CREATE TABLE `user_private` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `user_id` int(15) NOT NULL,
  `phone` tinyint(2) NOT NULL COMMENT '是否在付款成功前显示的信息',
  `wetchat` tinyint(2) NOT NULL COMMENT '是否在付款成功前显示的信息',
  `blog` tinyint(2) NOT NULL COMMENT '是否在付款成功前显示的信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_private
-- ----------------------------

-- ----------------------------
-- Table structure for `user_shop`
-- ----------------------------
DROP TABLE IF EXISTS `user_shop`;
CREATE TABLE `user_shop` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `user_id` int(15) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_shop
-- ----------------------------

-- ----------------------------
-- Table structure for `wallet`
-- ----------------------------
DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `user_id` int(15) NOT NULL,
  `balance` int(15) NOT NULL,
  `password` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wallet
-- ----------------------------
