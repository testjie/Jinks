# -*- conding:utf-8 -*-
__author__ = 'snake'

import traceback

from flask import abort
from flask import request
from flask import session
from functools import wraps
from flask import jsonify as json
from app.api.utils.json import get_json


def is_logined():
    """
    判断用户是否登录
    """
    if session.get("user"):
        return True
    return False


def _set_user_session(user):
    """
    设置user的session，内容为user的数据库信息
    :param user: user数据库信息
    :return:
    """
    session.clear()
    session["user"] = user
    session["user_token"] = user.get("token")


def params_json_required(func):
    """
    获取flask的请求参数
    :return:
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not request.is_json:
            abort(406)
        try:
            return func(*args, **kwargs)
        except:
            print(traceback.print_exc())
            abort(500)

    return wrapper


def user_permission_required(func):
    """
    登陆装饰器
    :param func:
    :return: json
    """
    @wraps(func)
    def wrapper(*args, **kwargs):

        if not request.is_json:
            abort(406)

        token = request.get_json().get("token")
        if token is not None and token != ""\
                and token == session.get("user_token"):
            try:
                return func(*args, **kwargs)
            except:
                print(traceback.print_exc())
                return json(get_json(code=500, msg="内部错误,请检查参数是否正确!"))
        return get_json(code=-300, msg="权限错误,请先登录!")

    return wrapper