import sys
import json
import csv

"""
Usage:

/usr/bin/env python csv_to_json.py <source_csv_filename>
"""

def csv_to_json(csv_file):
    reader = csv.DictReader(csv_file)
    entries = list(reader)
    print entries[1]
    pretty_json = json.dumps(entries, sort_keys=True, indent=4)
    return pretty_json

if __name__ == '__main__':
    csv_file = open(sys.argv[1])
    pretty_json = csv_to_json(csv_file)
    print pretty_json

