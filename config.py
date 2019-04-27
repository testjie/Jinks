# -*- coding:utf-8 -*-
__author__ = 'snake'

import os, sys
from datetime import timedelta

# 开发环境
DevelopConfig = {
    "DEBUG": True,
    "HOST": "0.0.0.0",
    "SEND_FILE_MAX_AGE_DEFAULT":timedelta(seconds=10),
    "JSON_AS_ASCII": False,  # json 中文支持
    "BABEL_DEFAULT_LOCALE": "zh",
    "SECRET_KEY": os.urandom(24)  # SESSION配置
}

# 线上环境
ProductionConfig = {
    "DEBUG": False,
    "HOST": "0.0.0.0",
    "SEND_FILE_MAX_AGE_DEFAULT": timedelta(seconds=10),
    "JSON_AS_ASCII": False,  # json 中文支持
    "BABEL_DEFAULT_LOCALE": "zh",
    "SECRET_KEY": os.urandom(24)  # SESSION配置
}


# Flask配置信息
FlaskConfig = {
    "DevelopConfig": DevelopConfig,
    "ProductionConfig": ProductionConfig
}


# 数据库信息
DBConfig = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '123456',
    'db': 'jinks',
    'charset': 'utf8mb4'
}

UploadConfig = {
    "UPLOAD_FOLDER": sys.path[1] + "\\app\\static\\uploads"
}


if __name__ == "__main__":
    print(UploadConfig["UPLOAD_FOLDER"])
