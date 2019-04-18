# -*- conding:utf-8 -*-
__author__ = 'snake'

"""
    主页相关接口
"""

import os, config, traceback

from app import bp
from functools import wraps
from app.utils.json import get_json
from flask import jsonify as json, request, session, render_template, make_response
from app.utils.database import query, excute
from app.utils.date import get_current_time
from app.utils.captcha import captcha_picture
from app.utils.token import create_token


@bp.route("/", methods=["GET"])
def index():
    """
    访问首页接口
    :return: 跳转到index
    """
    return render_template("index.html")


@bp.route("/getCarousel", methods=["GET"])
def get_carousel():
    """
    获取轮播页面
    条件：
        1. 启用状态
        2. 有效期内
    :return:
    """
    now = get_current_time()
    sql = "select * from tbl_carousels where status = 1 and starttime < '{}' and endtime > '{}'".format(now, now)
    result = get_json(data=query(sql))
    return result


@bp.route("/getArticleCategories", methods=["GET"])
def get_article_categories():
    """
    获取文章分类
    :return:
    """
    sql = "select * from tbl_categories";
    result = get_json(data=query(sql))
    return result


@bp.route("/goArticleDetails", methods=["GET"])
def go_article_details():
    """
    跳转到文章详情页面
    :return:
    """
    return render_template("articleDetails.html")