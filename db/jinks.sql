/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : jinks

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 20/04/2019 12:41:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS jinks;
CREATE DATABASE jinks DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;

USE jinks;
-- ----------------------------
-- Table structure for tbl_admin
-- ----------------------------
DROP TABLE IF EXISTS `tbl_admin`;
CREATE TABLE `tbl_admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `realname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createtime` datetime(0) NULL DEFAULT NULL,
  `updatetime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_article
-- ----------------------------
DROP TABLE IF EXISTS `tbl_article`;
CREATE TABLE `tbl_article`  (
  `id` int(11) NOT NULL COMMENT '文章id',
  `fid` int(11) NULL DEFAULT NULL COMMENT '集合id：1：一个文章只能属于一个父集合',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章内容，存html',
  `duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '学习时长',
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '学习难度',
  `summary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '介绍/简介',
  `recommend` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '推荐的文章id：1,2,3,',
  `status` int(255) NULL DEFAULT NULL COMMENT '0：OK；1：删除不显示；2：保存未发布',
  `readnum` int(11) NULL DEFAULT NULL COMMENT '文章阅读量 每个统计*10',
  `learnnum` varchar(0) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '学习人数统计userid：1,2,3,4,5,每次添加修改去重，用户id唯一',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_carousels
-- ----------------------------
DROP TABLE IF EXISTS `tbl_carousels`;
CREATE TABLE `tbl_carousels`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '轮播图标题',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片url',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文章内容，外链：url；文章id',
  `type` int(255) NULL DEFAULT NULL COMMENT '跳转类型 1为文章；2位外链',
  `status` int(255) NULL DEFAULT NULL COMMENT '状态 0为禁用；1为启用',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `starttime` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `endtime` datetime(0) NULL DEFAULT NULL COMMENT '过期时间',
  `updatetime` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `bakup` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_carousels
-- ----------------------------
INSERT INTO `tbl_carousels` VALUES (1, '百度地图宣布汤唯为代言人', '/static/uploads/Tang-Wei-800x333.png', 'https://www.zhutibaba.com/demo/iux2/wp-content/uploads/sites/14/2018/12/WeChat_logo_wordmark-800x333.png', 2, 1, '2019-04-17 11:46:26', '2019-04-16 11:50:29', '2019-04-30 11:46:32', NULL, NULL);

-- ----------------------------
-- Table structure for tbl_categories
-- ----------------------------
DROP TABLE IF EXISTS `tbl_categories`;
CREATE TABLE `tbl_categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章类别id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章类别名字',
  `fid` int(11) NULL DEFAULT NULL COMMENT '类别父id，-1为一级目录',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章类别图片路径',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_categories
-- ----------------------------
INSERT INTO `tbl_categories` VALUES (1, '测试基础', -1, '/static/uploads/jc.jpg', NULL, '2019-04-17 10:46:24', '2019-04-18 10:46:38');
INSERT INTO `tbl_categories` VALUES (2, '全栈测试', -1, '/static/uploads/qz.jpg', NULL, '2019-04-17 10:46:24', '2019-04-18 10:46:38');
INSERT INTO `tbl_categories` VALUES (3, '测试开发', -1, '/static/uploads/ck.jpg', NULL, '2019-04-17 10:46:24', '2019-04-18 10:46:38');
INSERT INTO `tbl_categories` VALUES (4, '性能测试', -1, '/static/uploads/xn.jpg', NULL, '2019-04-17 10:46:24', '2019-04-18 10:46:38');

-- ----------------------------
-- Table structure for tbl_comment
-- ----------------------------
DROP TABLE IF EXISTS `tbl_comment`;
CREATE TABLE `tbl_comment`  (
  `id` int(11) NOT NULL,
  `acticleid` int(11) NULL DEFAULT NULL COMMENT '文章id，外连接，弱关联',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容',
  `fid` int(11) NULL DEFAULT NULL COMMENT '评论的父id，一级评论为0；',
  `status` int(255) NULL DEFAULT NULL COMMENT '状态：0：ok;1：删除不显示',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updatetitme` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `userimage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像相对路径',
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '性别',
  `phone` int(11) NULL DEFAULT NULL COMMENT '电话',
  `resume` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '个人介绍',
  `work` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '当前职业',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户状态：0：OK；1：黑名单禁止登陆',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES (1, '123', '123', '123', '123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for tbl_userdo
-- ----------------------------
DROP TABLE IF EXISTS `tbl_userdo`;
CREATE TABLE `tbl_userdo`  (
  `id` int(11) NOT NULL COMMENT 'id',
  `userid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '针对用户而言',
  `rarticleid` varchar(0) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '阅读记录的文章id，1,2,3,4,：按照顺序去重',
  `larticleid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '点赞的文章id，1,2,3,4,：',
  `carticleid` varchar(0) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收藏的文章id，1,2,3,4,',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createdate` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updatedate` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
