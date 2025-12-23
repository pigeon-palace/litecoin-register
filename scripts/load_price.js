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

function updateLTCValues() {
  const myNumber = document.querySelectorAll('.ltc_amount');
  myNumber.forEach((e) => {
      const numericValue = parseFloat(e.textContent);
      const formattedValue = Math.round(numericValue).toLocaleString();
      e.textContent = formattedValue;
  });
}
function updateUSDValues() {
  var myNumber = document.querySelectorAll('.ltc_to_usd_amount');
  myNumber.forEach((e) => {
      const numericValue = parseFloat(e.getAttribute("ltc_amount")) * price;
      const formattedValue = Math.round(numericValue).toLocaleString();
      e.textContent = '$' + formattedValue;
  });
  myNumber = document.querySelectorAll('.ltc_to_usd_amount_exact');
  myNumber.forEach((e) => {
      const numericValue = parseFloat(e.getAttribute("ltc_amount")) * price;
      const formattedValue = numericValue.toLocaleString();
      e.textContent = '$' + formattedValue;
  });
  myNumber = document.querySelectorAll('.ltc_to_usd_amount_compact');
  myNumber.forEach((e) => {
      const numericValue = parseFloat(e.getAttribute("ltc_amount")) * price;
      const formattedValue = Math.round(numericValue).toLocaleString();
      let formatter = Intl.NumberFormat('en', { notation: 'compact' });
      e.textContent = '$' + formatter.format(numericValue);
  });
}

async function load_price() {
    const cache = sessionStorage.getItem("price");
    const cache_date = sessionStorage.getItem("price_date");
    console.log(cache);
    const FIVE_MINUTES = 5 * 60 * 1000; /* ms */
    if (cache == null || cache_date == null || ((new Date()) - new Date(cache_date)) > FIVE_MINUTES){
        console.log('fetching');
        const priceResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=litecoin")
            .then(response => response.json()) // Parse JSON
            .then(result => {
                price = result['litecoin']['usd'];
                sessionStorage.setItem("price",price);
                sessionStorage.setItem("price_date",new Date());
               updateLTCValues();
               updateUSDValues();
            })
            .catch(error => {
                console.error('Error fetching price JSON:', error);
                price = 85;
               updateLTCValues();
               updateUSDValues();
            });
    } else {
        price = parseFloat(cache);
       updateLTCValues();
       updateUSDValues();
    }
}
