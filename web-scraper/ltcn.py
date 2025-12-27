from scraper import Scraper

url = "https://www.grayscale.com/funds/grayscale-litecoin-trust#performance"
regex = "SHARES OUTSTANDING([0-9,.]+).*LITECOIN PER SHARE([0-9,.]+)"
filename = "../_data/profiles/ltcn.json"
formatter = lambda match : float(match.group(1).replace(",","")) * float(match.group(2).replace(",",""))
    
Scraper(url, regex, filename, formatter).query()
