import os
import json
from datetime import datetime
import requests
import csv
import re

data_path = "../_data/profiles"
columns = {}
HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0"}

def load():
    dir_list = os.listdir(data_path)
    events = []
    for file in dir_list:

        with open(data_path + '/' + file, 'r') as file:
            data = json.load(file)
        
        slug = data['name']['slug']
        columns[slug] = len(columns.keys())
        for event in data['events']:
            date = datetime.strptime(event['date'], "%B %d, %Y")
            events.append((date, slug, event['amount']))
        
    events = sorted(events, key = lambda x : x[0])
    
    table = [
        [events[0][0]] + [0 for i in range(len(columns.keys()))]
    ]     

    for event in events:
        if table[-1][0] < event[0]:
            table.append([event[0]] + [table[row][column+1] for column in range(len(columns.keys()))])
        row = len(table) - 1
        column = columns[event[1]]
        table[row][column + 1] = event[2]
        
    return table
    
def get_price():
    with open('price.csv', 'r', newline='') as f:
        reader = csv.reader(f)
        table = list(reader)
        
    #price = requests.get("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=litecoin", headers=HEADERS).json()['litecoin']['usd']
    #table.append([datetime.now().strftime("%m/%d/%y"), price])
    
    with open('price.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(table)
        
    for row in table:
        row[0] = datetime.strptime(row[0], "%m/%d/%y")
        
    return table
    
def write_table():
    price_table = get_price()
    event_table = load()
    i = 0 
    out_table = []
    for row in price_table:
        if i + 1 < len(event_table) and row[0] >= event_table[i+1][0]:
            i += 1
        row = list(row + event_table[i][1:])
        row.append(sum(event_table[i][1:]))
        row.append(row[-1] * float(row[1]))
        out_table.append(row)
        
    with open('table.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(out_table)
        
def update_js():
    with open('table.csv', 'r', newline='') as f:
        reader = csv.reader(f)
        table = list(reader)
        
    dates = "\", \"".join([x[0][0:10] for x in table])
    usddata = ", ".join([str(x[-1]) for x in table])
    ltcdata = ", ".join([str(x[-2]) for x in table])
    
    js = 'var dates= ["' + dates + '"];\n'
    js = js + 'var usddata = [' + usddata + '];\n'
    js = js + 'var ltcdata = [' + ltcdata + '];\n'
   
    with open('chart_data.js', 'w', newline='') as f:
        f.write(js)
    
if __name__ == "__main__":
    write_table()
    update_js()
