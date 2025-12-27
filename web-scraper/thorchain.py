import requests
from datetime import datetime
import time
import json

class Thorchain:
    def __init__(self):
        data = requests.get("https://midgard.ninerealms.com/v2/history/depths/LTC.LTC?interval=day&count=1").json()
        interval = data['intervals'][0]
        amount = float(interval['assetDepth'])/10**8

        data = requests.get("https://midgard.ninerealms.com/v2/history/savers/LTC.LTC?interval=day&count=1").json()
        interval = data['intervals'][0]
        amount += float(interval['saversDepth'])/10**8
            
        filename = "../_data/profiles/thorchain.json"
        with open(filename, "r") as f:
            data = json.load(f)
        data['amount'] = amount
        data['events'] = [{
            'amount': amount, 
            'source': "https://midgard.ninerealms.com", 
            'date': datetime.fromtimestamp(time.time()).strftime("%B %d, %Y")
        }] + data['events']
        with open(filename, 'w') as f:
            f.write(json.dumps(data, indent=4))
            
Thorchain()
