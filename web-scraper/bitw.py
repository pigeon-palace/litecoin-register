from scraper import Scraper

url = "https://bitwetp.com/"
regex = """Litecoin\$([0-9,.]+)-?[0-9,.]+%\$[0-9,]+.\d\d([0-9.]+)%.*Net Assets \(AUM\)\$([0-9,.]+)"""
filename = "../_data/profiles/bitw.json"
formatter = lambda match : float(match.group(2).replace(",",""))*float(match.group(3).replace(",",""))/(100*float(match.group(1).replace(",","")))
    
Scraper(url, regex, filename, formatter).query()
