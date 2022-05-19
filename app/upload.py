#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#

from flask import Flask, request, jsonify, make_response
import os
import json
import redis
import sys
import base64
import uuid

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/post_data', methods=['GET', 'POST'])
def check():

    data = request.data

    #path = "./" + dict_data['name'] + ".json"
    #f = open(path, 'w')
    #f.write(make_response(json.dumps(dict_data)))
    #f.close()

    #sys.stderr.write(str(make_response(json.dumps(dict_data))))

    r = redis.Redis(host='localhost', port=6379, db=0)
    r.set(str(uuid.uuid4()), data)

    return "DONE"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
