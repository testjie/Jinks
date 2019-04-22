# -*- conding:utf-8 -*-
__author__ = 'snake'


import os, config, traceback

from app import bp
from io import BytesIO
from functools import wraps
from flask import render_template
from app.api.utils.json import get_json
from app.api.utils.token import create_token
from app.api.utils.date import get_current_time
from app.api.utils.captcha import captcha_picture
from app.api.utils.database import query, excute
from app.api.utils.flaskuitls import set_user_session
from app.api.utils.flaskuitls import user_permission_required
from flask import jsonify as json, request, session, make_response


def _is_logined():
    """
    判断用户是否登录
    """
    if session.get("user"):
        return True
    return False


def _get_user_session():
    """
    返回不包含password和token的user信息
    :return: {"userInfo":{}}
    """
    from copy import copy
    user = copy(session.get("user"))
    user.pop("token", None)
    user.pop("password", None)

    return {"userInfo": user}


@bp.route("/goUserLogin", methods=["GET"])
def go_login_page():
    """
    跳转到userLogin页面
    :return:
    """
    return render_template("userLogin.html")


@bp.route("/userLogin", methods=["POST"])
def user_login():
    """
    用户登录
    :arg {"username":"user", "password":"123", "captcha":"123456"}
    :return json
    """
    # 获取参数
    user_info = request.get_json()
    username, password, captcha = user_info.get("username"), user_info.get("password"), user_info.get("captcha")

    # 验证码默认为9527
    if captcha != "123456":
        return get_json(code=-300, msg="登录失败，验证码错误!(默认为123456)")

    sql = "select * from tbl_user where username='{}' and password='{}'".format(username, password)
    result = query(sql)
    if result:
        if result[0].get("status") == 0:
            result[0]["token"] = user_token
            set_user_session(result)
            return get_json(data={"token": user_token}, msg="登录成功!")
        else:
            return get_json(msg="登录失败, 您已经禁止登陆网站, 请联系管理员处理!")
    else:
        return get_json(code="-100", msg="登录失败，用户名或密码不正确!")


@bp.route("/userRegist", methods=["POST"])
def user_regist():
    """
    用户注册
    :arg {"username":"user", "password":"123", "nickname":"nickname"}
    :return json
    """
    user_info = request.get_json()
    nickname = user_info.get("nickname")
    username = user_info.get("username")
    password = user_info.get("password")
    create_date = get_current_time()

    # 参数校验
    if not _parameters_filter([username, password, nickname]):
        return json(get_json(code=-200, msg="参数存在空值，请检查参数!"))

    # 判断用户名是否已被占用
    query_user_sql = "select * from t_user where username='%s'" % username
    if query(query_user_sql):
        return json(get_json(code=-300, msg="用户名已存在!"))

    # 没被占用，进行注册
    user_reg_sql = "insert into t_user values(NULL, '%s', '%s', '%s'," \
                   "NULL, 1,'','','',NULL,'','','','',NULL,'','%s',NULL)" % (username, password, nickname, create_date)
    if excute(user_reg_sql):
        return json(get_json(msg="注册成功!"))

    return get_json(code=-100, msg="注册失败，用户名可能已经存在了!")


@bp.route("/userLogout/", methods=["post"])
@user_permission_required
def user_logout():
    """
    用户退出，删除session
    :arg {"token":"xxxxx"}
    :return:
    """
    session.pop("user", None)
    session.pop("user_token", None)
    return get_json()