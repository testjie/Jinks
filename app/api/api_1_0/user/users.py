# -*- conding:utf-8 -*-
__author__ = 'snake'


import os, config, traceback

from app import bp
from io import BytesIO
from functools import wraps
from app.api.utils.json import get_json
from flask import jsonify as json, request, session, make_response
from app.api.utils.database import query, excute
from app.api.utils.date import get_current_time
from app.api.utils.captcha import captcha_picture
from app.api.utils.token import create_token


def _is_logined():
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


def _user_permission_required(func):
    """
    登陆装饰器
    :param func:
    :return: json
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
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


def _upload_files(file, file_name):
    """
    上传图片公共方法
    :param file: 上传的file文件
    :return: True:成功;False失败
    """
    try:
        upload_path = os.path.join(config.upload_config.get("UPLOAD_FOLDER"), file_name)  # 注意：没有的文件夹一定要先创建，不然会提示没有该路径
        file.save(upload_path)
        return True
    except:
        return False


def _parameters_filter(paras):
    """
    参数过滤，过滤条件为None或者""
    :param paras: []
    :return: False:不通过;True:通过
    """
    for para in paras:
        if para is None or para == "":
            return False
    return True


@bp.route('/resgistCaptcha')
def get_captcha():
    # 把strs发给前端,或者在后台使用session保存
    code_img, strs = captcha_picture()
    buf = BytesIO()
    code_img.save(buf, 'JPEG', quality=70)

    buf_str = buf.getvalue()
    response = make_response(buf_str)
    response.headers['Content-Type'] = 'image/jpeg'

    #  把验证码保存在session中，进行判断
    session["captcha"] = strs

    return response





@bp.route("/userLogin", methods=["POST"])
def user_login():
    """
    用户登录
    :arg {"username":"user", "password":"123", "captcha":"123456"}
    :return json
    """
    user_info = request.get_json()
    captcha = user_info.get("captcha")
    username = user_info.get("username")
    password = user_info.get("password")

    # 参数校验
    if not _parameters_filter([username, password, captcha]):
        return json(get_json(code=-200, msg="参数存在空值，请检查参数!"))

    # 如果没有获取验证码接口，则指定默认的9527为默认验证码，方便接口测试
    user_captcha = session.get("captcha")
    if captcha is None or captcha == "":
        user_captcha = "9527"

    if "9527" == captcha:
        query_login_sql = "select * from t_user where username='%s' and password='%s'" % (username, password)
        result = query(query_login_sql)
        if result:
            if result[0].get("status") == 1:
                # 生成并插入token
                user_token = create_token()
                insert_token_sql = "update t_user set token='%s' where id=%d" % (user_token, result[0]["id"])
                excute(insert_token_sql)

                # 查询IMG并更新Token
                try:
                    query_img_sql = "select * from tbl_image_sources where id=%d" % result[0].get("imgId")
                    result[0]["img"] = query(query_img_sql)[0].get("path")
                except:
                    result[0]["img"] = ""
                result[0]["token"] = user_token

                # 保存用户信息
                _set_user_session(result[0])
                return json(get_json(data={"token": user_token}, msg="登录成功!"))
            else:
                return json(get_json(msg="登录失败, 您已经禁止登陆网站, 请联系管理员处理!"))

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
@_user_permission_required
def user_logout():
    """
    用户退出，删除session
    :arg {"token":"xxxxx"}
    :return:
    """
    session.pop("user", None)
    session.pop("user_token", None)
    return get_json()