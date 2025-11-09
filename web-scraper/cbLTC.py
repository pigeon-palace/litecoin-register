from scraper import Scraper

url = "https://basescan.org/tokencheck-tool?t=0xcb17c9db87b595717c857a08468793f5bab6445f"
regex = "Token Quantity([0-9,.]+) cbLTC"
filename = "../_data/profiles/cbltc.json"
formatter = lambda match : float(match.group(1).replace(",",""))
    
Scraper(url, regex, filename, formatter).query()
