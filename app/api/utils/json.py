# -*- coding:utf-8 -*-
__author__ = 'snake'

from flask import jsonify


def get_json(code=200, msg="操作成功!", data={}, url=""):
    """
        获取指定格式的Json数据
        args:
            code=200
            msg="OK"
            data={}
        return: {}
    """
    return jsonify({"code": code, "msg": msg, "data": data, "url":url})