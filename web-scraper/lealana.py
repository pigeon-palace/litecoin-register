# http://lealana.com/fulllistltc.txt
# https://wiki.coin.community/Lealana

import requests
import time
import json
from datetime import datetime
import csv
import os

def api_call(address):
    time.sleep(0.5)
    response = requests.get("https://litecoinspace.org/api/address/" + address + '/txs/chain')
    print(response.status_code)
    if response.status_code != 200:
        print("waiting 60 secs to retry...")
        time.sleep(60)
        response = requests.get("https://litecoinspace.org/api/address/" + address + '/txs/chain')
        if response.status_code != 200:
            print("aborting due to no connection")
            return False
    return response

def run():
    with open("lealana_addresses.txt", "r") as f:
        addresses = f.read()
        
    addresses = addresses.split('\n')
    addresses.pop()

    i = 0
    remaining_total = 0
    table = []

    for address in addresses:
        i+=1
        print(i, len(addresses), address, end="...\t")
        response = api_call(address)
        if not response:
            return
        data = response.json()
        spend_date = ''
        fund_date = ''
        fund_amount = 0
        if len(data) > 0:
            mint_tx = data[-1]['txid']
            for tx in data[:-1]:
                for vin in tx['vin']:
                    if vin['txid'] == mint_tx:
                        spend_date = datetime.fromtimestamp(tx['status']['block_time']).strftime("%B %d, %Y")
            for vout in data[-1]['vout']:
                if vout['scriptpubkey_address'] == address:
                    fund_amount = vout['value'] / 10**8   
                fund_date = datetime.fromtimestamp(data[-1]['status']['block_time']).strftime("%B %d, %Y")
                    
            if spend_date == '':
                remaining_total += fund_amount
            
            if fund_date:
                table.append([address, fund_date, fund_amount])
            if spend_date:
                table.append([address, spend_date, -1*fund_amount])
            
    table = sorted(table, key = lambda x : datetime.strptime(x[1], "%B %d, %Y"))
    
    try:
        os.remove('lealana.csv')
    except OSError:
        pass
        
    with open('lealana.csv', 'a') as f:
        writer = csv.writer(f)
        writer.writerows(table)
            
    with open('../_data/profiles/lealana.json', "r") as f:
        data = json.load(f)
    if data['amount'] == remaining_total:
        return
        
    data['amount'] = remaining_total
    data['events'] = [{
        'amount': remaining_total, 
        'source': "https://wiki.coin.community/Lealana_Address_List_LTC", 
        'date': datetime.fromtimestamp(time.time()).strftime("%B %d, %Y")
    }] + data['events']

    with open('../_data/profiles/lealana.json', 'w+') as f:
        f.write(json.dumps(data, indent=4))

run()
