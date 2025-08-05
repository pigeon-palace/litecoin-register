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

var stacked_area_labels = [];
var stacked_area_datasets = [];
var stacked_area_chart_config = {
    type: 'line',
    data: {
        labels: stacked_area_labels,
        datasets: stacked_area_datasets
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
}

function draw_stacked_area_chart() {
    data.sort(function(a, b){ return b['events'][0]["amount"] - a['events'][0]["amount"]});
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
        stacked_area_labels.push(j);
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
        stacked_area_datasets.push(dataset_push);
    };

    // Get the drawing context on the canvas
    var myContext = document.getElementById("stackedLineChartID");
    var myChart = new Chart(myContext, stacked_area_chart_config);
}
