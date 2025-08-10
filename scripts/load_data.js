/*
    Copyright 2025 litecoinregister.com Developers

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var price;
var data;

async function load_data() {
    const priceResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=litecoin")
        .then(response => response.json()) // Parse JSON
        .then(result => {
            price = result['litecoin']['usd'];
            document.getElementById("price-span").textContent="1 LTC = " + price + " USD (Powered by CoinGecko)";
        })
        .catch(error => {
            console.error('Error fetching price JSON:', error);
            document.getElementById("price-span").textContent="Error fetching price information.";
        });
        
    const tableResponse = await fetch("../table.json")
        .then(response => response.json()) // Parse JSON
        .then(response_json => {
            data = response_json;
        }) 
        
    await importData("MWEB");
    await importData("cbLTC");
}

async function importData(short) {
    try {
        const target = "../litecoin-register-scraper/data/" + short + ".csv"; 
        
        const res = await fetch(target, {
            method: 'get',
            headers: {
                'content-type': 'text/csv;charset=UTF-8'
            }
        });

        if (res.status === 200) {
            const csv = parseCSV(await res.text());
            for(var i = 0; i < data.length; i++){
                if(data[i]["short"] == short){
                    csv.forEach(item => data[i]['events'].push(item));
                    data[i]['events'].sort(function(a, b){ return (new Date(b["date"])).getTime() - (new Date(a["date"])).getTime()});
                    break;
                }
            }
        } else {
            console.log(`Error code ${res.status}`);
        }
    } catch (err) {
        console.log(err)
    }
}

function parseCSV(csv){
    csv = Papa.parse(csv).data;
    var out = []
    for(var i = 0; i < csv.length; i++){
        if(csv[i].length < 4){
            continue;
        }
        var out_add = {};
        out_add['amount'] = parseFloat(csv[i][0]);
        out_add['source'] = csv[i][1];
        out_add['date'] = csv[i][2];
        out_add['approx'] = csv[i][3] == "true";
        out.push(out_add);
    }
    return out;
}
