# -*- conding:utf-8 -*-
__author__ = 'snake'

"""
    主页相关接口
"""

from app import bp
from flask import abort
from flask import request
from app.api import errors
from flask import render_template
from app.api.utils.json import get_json
from app.api.utils.database import query
from app.api.utils.date import get_current_time
from app.api.utils.flaskuitls import params_json_required
from app.api.utils.flaskuitls import user_permission_required


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


@bp.route("/getArticles", methods=["GET"])
def get_articles():
    """
    获取列表
    :return:
    """
    sql = """
            SELECT
                tbl_article.*,
                (select count(*) from tbl_article_study where artcleid=tbl_article.id) as studycount,
                (select count(*) from tbl_comment where acticleid=tbl_article.id) as commentcount
            FROM
                tbl_article WHERE tbl_article.status = 0 ORDER BY tbl_article.createtime DESC limit 0, 2
          """
    result = get_json(data=query(sql))
    return result


@bp.route("/goArticleDetails", methods=["GET"])
def go_article_details():
    """
    跳转到文章详情页面
    :return:
    """
    return render_template("articleDetails.html", aid=request.values.get("id"))


@bp.route("/articleDetails", methods=["POST"])
@params_json_required
def article_details():
    """
    获取文章详情
    :return:
    """
    id = request.get_json().get("aid")
    sql = """
        SELECT
            tbl_article.*,
            (select count(*) from tbl_article_study where artcleid=tbl_article.id) as studycount,
            (select count(*) from tbl_comment where acticleid=tbl_article.id) as commentcount
        FROM
            tbl_article 
        WHERE
            tbl_article.id = {} AND tbl_article.status = 0""".format(id)
    result = get_json(data=query(sql))
    return result

