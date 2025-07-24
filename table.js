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

var table = new DataTable('#example', {
    responsive: true,
    columnDefs: [
        {
            targets: 1,
            className: 'noVis'
        }
    ],
     columns: [
        {
            "title": "Rank", 
            data: "rank",
            responsivePriority: 3
        },
        {
            "title": "Short", 
            data: "short",
            responsivePriority: 6
        },
        {
            "title": "Name", 
            data: "name",
            render: function (data, type) {
                if (type === 'display') {
                    return '<a href="' + data["homepage"] + '">' + data["name"] + '</a>';
                }
 
                return data["name"];
            },
            responsivePriority: 2
        },
        {
            "title": "Type", 
            data: "type",
            responsivePriority: 5
        },
        {
            "title": "Country", 
            data: "country",
            responsivePriority: 7
        },
        {
            "title": "Amount (LTC)", 
            data: "events",
            render: function (data, type) {
                if (type === 'display') {
                    if(data[0]['approx']){
                        prefix = "~";
                    } else {
                        prefix = "";
                    }
                    return '<a href="' + data[0]["source"] + '">' + prefix + data[0]["amount"].toLocaleString(
                                              undefined, // leave undefined to use the visitor's browser 
                                                         // locale or a string like 'en-US' to override it.
                                              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                                            ) + '</a>';
                }
                
                return data[0]["amount"];
            },
            responsivePriority: 1
        },
        {
            "title": "Amount (USD)", 
            data: "events",
            render: function (data, type) {
                if (type === 'display') {
                    if(data[0]['approx']){
                        prefix = "~";
                    } else {
                        prefix = "";
                    }
                    return prefix + (price * data[0]["amount"]).toLocaleString(
                                              undefined, // leave undefined to use the visitor's browser 
                                                         // locale or a string like 'en-US' to override it.
                                              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                                            );
                }
 
                return data[0]["amount"];
            },
            responsivePriority: 4
        }
    ],    
    layout: {
        topStart: {   
            buttons: [
                {            
                    text: 'Columns',
                    extend: 'colvis',
                    columns: ':not(.noVis)',
                    popoverTitle: 'Column visibility selector'
                }
            ],
            pageLength: {
                menu: [5, 10, 25, 50, -1]
            }
        },        
        topEnd: "search",
        bottomStart: {
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: ['copy', 'excel', 'csv', 'pdf', 'print']
                }
            ]
        },
        bottomEnd: {      
            info: {
                text: 'Table display: _START_ to _END_ of _TOTAL_ records'
            },      
            paging: {}
        }
    },
    order: [5, "desc"]
})

async function load() {

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
        
    const tableResponse = await fetch("table.json")
        .then(response => response.json()) // Parse JSON
        .then(result => {
            result.sort(function(a, b){ return b['events'][0]["amount"] - a['events'][0]["amount"]});
            for(var i = 0; i < result.length; i++ ){
                result[i]['rank'] = i + 1;
            };
            table.rows.add(result).draw();
        })
        .catch(error => console.error('Error fetching JSON:', error));
        
    table.responsive.rebuild();
    table.responsive.recalc();
}

load(); 
