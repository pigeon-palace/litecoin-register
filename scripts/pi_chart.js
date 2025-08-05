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

var pi_labels = [];
var pi_datasets = [];
var type_values = [];
var pi_chart_config = {
    type: 'pie',
    data: {
        labels: pi_labels,
        datasets: pi_datasets
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
    }
}

function draw_pi_chart() {
    data.sort(function(a, b) {
        return ('' + b['type']).localeCompare(a['type']) || b['events'][0]["amount"] - a['events'][0]["amount"]
    });
    var name_group = Map.groupBy(data, item => item['name']['name']);
    var type_group = Map.groupBy(data, item => item['type']);
    var name_labels = Array.from(name_group.keys());
    type_labels = Array.from(type_group.keys());
    type_labels.forEach(item => pi_labels.push(item));
    name_labels.forEach(item => pi_labels.push(item));
    name_group.forEach((value, key, map) => map.set(key, map.get(key)[0]['events'][0]["amount"]));
    type_group.forEach((value, key, map) => {
        var s = 0;
        for (var i = 0; i < map.get(key).length; i++) {
            s += map.get(key)[i]['events'][0]["amount"]
        }
        map.set(key, s);
    });
    var name_values = Array.from(name_group.values());
    Array.from(type_group.values()).forEach(item => type_values.push(item));
    pi_datasets.push({
        data: type_values
    });
    pi_datasets.push({
        data: name_values
    });
    var piContext = document.getElementById("pieChartID");
    var piChart = new Chart(piContext, pi_chart_config);
}
