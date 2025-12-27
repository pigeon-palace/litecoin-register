from scraper import Scraper

url = "https://www.virtune.com/en/product/litecoin"
regex = """Proof Of HoldingsRequired collateral([0-9,.]+) LTC"""
filename = "../_data/profiles/virtune_ltc.json"
formatter = lambda match : float(match.group(1).replace(",",""))
    
Scraper(url, regex, filename, formatter).query()
