# -*- conding:utf-8 -*-
__author__ = 'snake'

"""
    文章相关接口
"""

import math

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


@bp.route("/getArticleList", methods=["GET"])
def get_article_list():
    p = request.values.get("p")

    # 设置首页
    show_shouye_status = 0  # 显示首页状态
    if p == "" or p is None or p == "None":
        p = 1
    else:
        p = int(p)
        show_shouye_status = 1

    limit_start = (int(p) - 1) * 10

    # 查询n-10*n条记录，首页
    sql = """
            SELECT
                tbl_article.*,
                (select count(*) from tbl_article_study where artcleid=tbl_article.id) as studycount,
                (select count(*) from tbl_comment where acticleid=tbl_article.id) as commentcount
            FROM
                tbl_article WHERE tbl_article.status = 0 ORDER BY tbl_article.createtime DESC limit {0},10
          """.format(limit_start)
    # sql = "select * from tbl_article ORDER BY tbl_article.createtime limit {0},10".format(limit_start)
    article_list = query(sql)

    # 查询总条数
    sql = "select count(*) as pageTotal from tbl_article where status=0"
    count = query(sql)[0].get("pageTotal")
    total = int(math.ceil(count / 10.0))  # 总页数
    dic = _get_page(total, p)

    # 返回数据给前端
    data = {
        "data": article_list,
        "p": int(p),
        'total': total,
        'show_shouye_status': show_shouye_status,
        'dic_list': dic
    }

    return get_json(data=data)


def _get_page(total, p):
    """
    计算分页方法
    :param total:
    :param p:
    :return:
    """
    show_page = 5  # 显示的页码数
    pageoffset = 2  # 偏移量
    start = 1  # 分页条开始
    end = total  # 分页条结束

    if total > show_page:
        if p > pageoffset:
            start = p - pageoffset
            if total > p + pageoffset:
                end = p + pageoffset
            else:
                end = total
        else:
            start = 1
            if total > show_page:
                end = show_page
            else:
                end = total
        if p + pageoffset > total:
            start = start - (p + pageoffset - end)
    # 用于模版中循环
    dic = {"start":start, "end":end+1}
    return dic