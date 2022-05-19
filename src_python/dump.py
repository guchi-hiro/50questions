#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#

from flask import Flask, request, jsonify, make_response
import os
import json
import redis
import sys
import base64
import ast

def dump():

    path_w = 'result.json'
    output_list = []
    r = redis.Redis(host='localhost', port=6379, db=0)

    for key in r.scan_iter():
        base64_value = r.get(key)
        str_value = base64.b64decode(base64_value).decode()
        print(str_value)
        dict_value = ast.literal_eval(str_value)

        output_list.append(dict_value)

    print(str(output_list))
    with open(path_w, mode='w') as f:
        f.write(str(output_list))

if __name__ == "__main__":
    dump()
