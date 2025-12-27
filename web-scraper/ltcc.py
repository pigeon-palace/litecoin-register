from scraper import Scraper

url = "https://canaryetfs.com/ltcc/#Holdings"
regex = """\d+/\d+/\d+
LTCC
LITECOIN
LTCUSD
LTCUSD
([0-9,.]+)"""
filename = "../_data/profiles/ltcc.json"
formatter = lambda match : float(match.group(1).replace(",",""))
    
Scraper(url, regex, filename, formatter).query()
