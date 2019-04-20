# -*- conding:utf-8 -*-
__author__ = 'snake'

from app import bp
from app.api.utils.json import get_json


@bp.app_errorhandler(404)
def page_not_found(e):
    """
    404
    :param e:
    :return:
    """
    return get_json(msg="请求接口不存在", code=404, url="/")


@bp.app_errorhandler(406)
def page_not_found(e):
    return get_json(msg="参数必须为JSON格式", code=420, url="/")


@bp.app_errorhandler(405)
def page_not_found(e):
    return get_json(msg="方法不允许", code=405, url="/")


@bp.app_errorhandler(500)
def internal_server_error(e):
    return get_json(msg="服务器异常", code=500)

