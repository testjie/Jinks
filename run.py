# -*- coding:utf-8 -*-
__author__ = 'snake'

from app import create_app
from app.api.api_1_0 import users, admin


app = create_app("DevelopConfig")

if __name__ == "__main__":
    app.run()
