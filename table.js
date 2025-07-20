var dataSet = [];

var table = new DataTable('#example', {
    columnDefs: [
        {
            target: 5,
            visible: false
        }
    ],
     columns: [
        {
            "title": "Short", 
            data: "short"
        },
        {
            "title": "Name", 
            data: "name",
            render: function (data, type) {
                if (type === 'display') {
                    return '<a href="' + data["homepage"] + '">' + data["name"] + '</a>';
                }
 
                return data["name"];
            }
        },
        {
            "title": "Type", 
            data: "type"
        },
        {"title": "Country", data: "country"},
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
                                              { minimumFractionDigits: 2 }
                                            ) + '</a>';
                }
                
                return data[0]["amount"];
            }
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
                                              { minimumFractionDigits: 2 }
                                            );
                }
 
                return data[0]["amount"];
            }
        }
    ],    
    layout: {
        topStart: {      
            buttons: [
                'columnsToggle'
            ]
        },
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
            pageLength: {
                menu: [5, 10, 25, 50, -1]
            },
            paging: {}
        }
    },
    data: dataSet,
    order: [4, "desc"]
})

var price;

async function fetchData(filename) { 
    const priceResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=litecoin")
        .then(response => response.json()) // Parse JSON
        .then(result => {
            price = result['litecoin']['usd'];
            document.getElementById("price-span").textContent="1 LTC = " + price + " USD (Powered by CoinGecko)";
        }) // Parse JSON
        .catch(error => {
            console.error('Error fetching price JSON:', error);
            document.getElementById("price-span").textContent="Error fetching price information.";
        });
    const response = await fetch("table.json")
        .then(response => response.json()) // Parse JSON
        .then(result => table.rows.add(result).draw()) // Parse JSON
        .catch(error => console.error('Error fetching JSON:', error));
    return [response, priceResponse];
}

async function load() {
    const result = fetchData();
    ;
}

load(); 
