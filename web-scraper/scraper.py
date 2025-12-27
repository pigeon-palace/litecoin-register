import requests
from bs4 import BeautifulSoup
import re
import time
import json
from datetime import datetime

HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0"}
class Scraper():
    def __init__(self, _url, _regex, _filename, _formatter):
        self.url = _url
        self.regex = _regex
        self.filename = _filename
        self.formatter = _formatter

    def query(self):
        print("Requesting:", self.url)
        response = requests.get(self.url, headers=HEADERS)
        if response.status_code != 200:
            print("waiting 60 secs to retry...")
            time.sleep(60)
            response = requests.get(self.url, headers=HEADERS)
            if response.status_code != 200:
                print("aborting due to no connection")
                return
        print("Parsing...")
        soup = BeautifulSoup(response.text, 'html.parser')
        print("Matching...")
        matched = re.search(self.regex, soup.text)
        if not matched:
            print("aborting due to no match found")
            return
        with open(self.filename, "r") as f:
            data = json.load(f)
        data['amount'] = self.formatter(matched)
        data['events'] = [{
            'amount': self.formatter(matched), 
            'source': self.url, 
            'date': datetime.fromtimestamp(time.time()).strftime("%B %d, %Y")
        }] + data['events']
        with open(self.filename, 'w') as f:
            f.write(json.dumps(data, indent=4))
        print("Finished!")
    
