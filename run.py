# -*- coding:utf-8 -*-
__author__ = 'snake'

from app import create_app
from app.api.api_1_0.user import users
from app.api.api_1_0.admin import admin
from app.api.api_1_0.common import index


app = create_app("DevelopConfig")

if __name__ == "__main__":
    app.run()
