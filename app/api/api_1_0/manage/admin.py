# -*- conding:utf-8 -*-
__author__ = "snake"

from app import bp
from functools import wraps
from flask import request, session
from app.api.utils.database import query, excute
from app.api.utils.token import create_token
from app.api.utils.json import get_json

import traceback


def _admin_permission_required(func):
    """
    登陆装饰器
    :param func:
    :return: json
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.get_json().get("token")
        if token is not None and token != ""\
                and token == session.get("admin_token"):
            try:
                return func(*args, **kwargs)
            except:
                print(traceback.print_exc())
                return get_json(code=500, msg="内部错误,请检查参数是否正确!")
        return get_json(code=-300, msg="权限错误,请先登录!")

    return wrapper


def _admin_parameters_filter(paras):
    """
    参数过滤，过滤条件为None或者""
    :param paras: []
    :return: False:不通过;True:通过
    """
    for para in paras:
        if para is None or para == "":
            return False
    return True


def _get_admin_session():
    """
    返回不包含password和token的user信息和token信息
    :return: {"adminInfo":{}}
    """

    from copy import copy
    admin = copy(session.get("admin"))
    admin.pop("token", None)
    admin.pop("password", None)

    return {"adminInfo": admin}


def _set_admin_session(admin):
    """
    设置admin的session，内容为admin的数据库信息
    :param user: admin数据库信息
    :return:
    """
    session.clear()
    session["admin"] = admin
    session["admin_token"] = admin.get("token")


@bp.route("/adminLogin/", methods=["post"])
def adminlogin():
    '''
    管理员登陆
    arg:{"username":"admin","password":"a123456"}
    return: json
    '''
    admininfo = request.get_json()
    username = admininfo["username"]
    password = admininfo["password"]
    if username != None and password != None:
        result = query("SELECT * FROM tbl_admin where username = '%s' and password = '%s';" % (username, password))
        if result:
            token = create_token()
            result[0]["token"] = token
            _set_admin_session(result[0])
            excute("UPDATE `tbl_admin` SET `token`='%s' WHERE (`id`='%d') LIMIT 1" % (token, result[0].get("id")))

            return get_json(code=200, data={"token": token}, msg="登陆成功!")
        else:
            return get_json(code=200, data={"token": 0}, msg="账号或者密码错误!")

    else:
        return get_json(code=200, data={"token": 0}, msg="账号或者密码不能为空!")


@bp.route('/adminLogout/')
def logout():
    # 如果会话中有用户名就删除它。
    # 同时从客户端浏览器中删除 session的 name属性
    session.pop('token', None)
    session.pop('admin', None)

    return get_json(code=200, data={"token": 1}, msg="退出登陆!")
