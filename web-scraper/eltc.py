from scraper import Scraper

url = "https://bitwiseinvestments.eu/products/bitwise-physical-litecoin-etp/#"
regex = """AUM in Cold-Storage
 LTC ([0-9,.]+)"""
filename = "../_data/profiles/eltc.json"
formatter = lambda match : float(match.group(1).replace(",",""))
    
Scraper(url, regex, filename, formatter).query()
