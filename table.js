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

async function load_table() {

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
        .then(response_json => {
            data = response_json;
            return response_json;
        }) // Parse JSON
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
    
    // stacked area chart.
        data.sort(function(a, b){ return b['events'][0]["amount"] - a['events'][0]["amount"]});
        var labels = [];
        var datasets = [];
        var min_year = null;
        var max_year = null;
        for(var i = 0; i < data.length; i++ ){
            for(var j = 0; j < data[i]['events'].length; j++ ){
                const last = new Date(data[i]['events'][j]["date"]).getFullYear();
                if(min_year == null || last < min_year){
                    min_year = last;
                }
                if(max_year == null || last > max_year){
                    max_year = last;
                }
            };
        };
        for(var j = min_year; j <= max_year; j++){
            labels.push(j);
        }
        for(var i = 0; i < data.length; i++ ){
            var dataset_push = {label: data[i]['name']['name'], fill: 'stack'};
            var dataset_push_data = [];
            for(var j = min_year; j <= max_year; j++){
                dataset_push_data.push(0);
            }
            for(var j = 0; j < data[i]['events'].length; j++ ){
                const last = new Date(data[i]['events'][j]["date"]).getFullYear();
                if(dataset_push_data[last - min_year] == 0){
                    dataset_push_data[last - min_year] = data[i]['events'][j]["amount"];
                }
            };
            dataset_push.data = dataset_push_data;
            datasets.push(dataset_push);
        };
      
        // Get the drawing context on the canvas
        var myContext = document.getElementById("stackedLineChartID");
        var myChart = new Chart(myContext, {
            type: 'line',
            data: {
              labels: labels,
              datasets: datasets
            },
            
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: (ctx) => 'Litecoin Treasury Holdings Chart - Stacked Area'
              },
              tooltip: {
                mode: 'index'
              },
            },
            interaction: {
              mode: 'nearest',
              axis: 'x',
              intersect: false
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Year'
                }
              },
              y: {
                stacked: true,
                min: 0,
                title: {
                  display: true,
                  text: 'Litecoin'
                }
              }
            }
        }
        });
        
    // pi chart
    
        data.sort(function(a, b){ return ('' + b['type']).localeCompare( a['type']) || b['events'][0]["amount"] - a['events'][0]["amount"]});
        var name_group = Map.groupBy(data, item => item['name']['name']);
        var type_group = Map.groupBy(data, item => item['type']);
        var pi_labels = [];
        var name_labels = Array.from(name_group.keys());
        var type_labels = Array.from(type_group.keys());
        type_labels.forEach(item=>pi_labels.push(item));
        name_labels.forEach(item=>pi_labels.push(item));
        name_group.forEach((value, key, map) => map.set(key,map.get(key)[0]['events'][0]["amount"]));
        type_group.forEach((value, key, map) => {
            var s = 0;
            for(var i = 0; i < map.get(key).length; i++){
                s += map.get(key)[i]['events'][0]["amount"]
            }
            map.set(key,s);
        });
        var name_values = Array.from(name_group.values());
        var type_values = Array.from(type_group.values());
    var piContext = document.getElementById("pieChartID");
    var piChart = new Chart(piContext, {
      type: 'pie',
      data: {
          labels: pi_labels,
          datasets: [
            {
              data: type_values
            },
            {
              data: name_values
            }
          ]
        },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: (ctx) => 'Litecoin Treasury Holdings Chart - Pie'
          },
          legend: {
            labels: {
              generateLabels: function(chart) {
                // Get the default label list
                const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
                const labelsOriginal = original.call(this, chart);
                // Build an array of colors used in the datasets of the chart
                let datasetColors = chart.data.datasets.map(function(e) {
                  return e.backgroundColor;
                });
                datasetColors = datasetColors.flat();

                // Modify the color and hide state of each label
                labelsOriginal.forEach(label => {
                  // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                  label.datasetIndex = label.index >= type_values.length ? 1 : 0;

                  // The hidden state must match the dataset's hidden state
                  label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                  // Change the color to match the dataset
                  label.fillStyle = datasetColors[label.index];
                });

                return labelsOriginal;
              }
            },
            onClick: function(mouseEvent, legendItem, legend) {
              // toggle the visibility of the dataset from what it currently is
              legend.chart.getDatasetMeta(
                legendItem.datasetIndex
              ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
              legend.chart.update();
            }
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                const labelIndex = (context[0].datasetIndex * type_values.length) + context[0].dataIndex;
                return context[0].chart.data.labels[labelIndex] + ': ' + context[0].formattedValue;
              }
            }
          }
        }
      },
    });
}
load_table(); 
