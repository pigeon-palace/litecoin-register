from scraper import Scraper

url = "https://www.mwebexplorer.com/charts/mwebbalance"
regex = "Litecoin MWEB Balance\s+([0-9,.]+) LTC"
filename = "../_data/profiles/mweb.json"
formatter = lambda match : float(match.group(1).replace(",",""))
    
Scraper(url, regex, filename, formatter).query()
