# -*- coding:utf-8 -*-
__author__ = 'snake'


import os, hashlib


def create_token():
    '''
    生成登陆后的token，格式如下：
    "eca7f38788d4764959919b46c61005038cf37f68"
    '''
    return hashlib.sha1(os.urandom(64)).hexdigest()


if __name__ == "__main__":
    print(create_token())