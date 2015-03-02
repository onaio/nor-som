#!/usr/bin/env python

import requests
import json

def execute_carto_sql(user, api_key, sql):
    url = "http://%s.cartodb.com/api/v1/sql?api_key=%s&q=%s" % (user, api_key, sql)
    response = requests.get(url)
    return json.dumps(response.json(), sort_keys=True, indent=4, separators=(',', ': '))


if __name__ == '__main__':
    from sys import argv
    query = open(argv[1]).read()
    print execute_carto_sql('ona', '71318d1aefad674aeeeda099af88240beb003209', query)
