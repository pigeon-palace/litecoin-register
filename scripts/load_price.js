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

async function load_price() {
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
}
