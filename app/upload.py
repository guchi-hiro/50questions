#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#

from flask import Flask, request, jsonify, make_response
import os
import json
import redis

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/post_data', methods=['GET', 'POST'])
def check():

    json_data = request.data.decode('utf-8')
    dict_data = json.loads(json_data)

    print(make_response(json.dumps(dict_data)))

    #path = "./" + dict_data['name'] + ".json"
    #f = open(path, 'w')
    #f.write(make_response(json.dumps(dict_data)))
    #f.close()

    r = redis.Redis(host='localhost', port=6379, db=0)
    #r.set(dict_data['name'], make_response(json.dumps(dict_data)))
    r.set(dict_data['name'], 'Sample')

    return "DONE"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
