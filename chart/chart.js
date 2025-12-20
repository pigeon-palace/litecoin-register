var myChart;
async function draw_chart() {
    const ctx = document.getElementById('myChart');

    var style = getComputedStyle(document.body);
    var grid_color = style.getPropertyValue('--grid-color');
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Total Value (USD)',
                data: usddata,
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Total Value (LTC)',
                data: ltcdata,
                borderWidth: 1,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 1
                }
            },
            plugins: {
                legend: {
                    display:false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: grid_color
                    },
                    type: 'time'
                },
                y: {
                    title: {
                        display: true,
                        text: 'USD'
                    },
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    grid: {
                        color: grid_color
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            let formatter = Intl.NumberFormat('en', {
                                notation: 'compact'
                            });
                            return '$' + formatter.format(value);
                        }
                    }
                },
                y1: {
                    title: {
                        display: true,
                        text: 'LTC'
                    },
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,

                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            let formatter = Intl.NumberFormat('en', {
                                notation: 'compact'
                            });
                            return formatter.format(value);
                        }
                    },
                },
            }
        }
    });
    
    
    var three_months = new Date();
    three_months.setMonth(three_months.getMonth() - 3);
    var one_year = new Date();
    one_year.setFullYear(one_year.getFullYear() - 1);
    var three_years = new Date();
    three_years.setFullYear(three_years.getFullYear() - 3);

    document.getElementById('3M').addEventListener('click', function() { filterDate(three_months)}, false);
    document.getElementById('1Y').addEventListener('click', function() { filterDate(one_year)}, false);
    document.getElementById('3Y').addEventListener('click', function() { filterDate(three_years)}, false);
    document.getElementById('All').addEventListener('click', function() { filterDate(0)}, false);
    filterDate(one_year);
}

function filterDate(initialDate){
    //first I cloned my dataset [labels (x) and data (y)] like this:
    console.log(initialDate);
    if (initialDate == 0) {
        initialDate = new Date(dates[0]);
    }
    labelsData2 = dates;
    usddata2 = usddata;
    ltcdata2 = ltcdata;
    
    const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    console.log(labelsData2);
    console.log(initialDate.toISOString().split('T')[0]);
    labelsData2 = labelsData2.slice(dates.indexOf(initialDate.toISOString().split('T')[0]), dates.length);
    usddata2 = usddata2.slice(dates.indexOf(initialDate.toISOString().split('T')[0]), dates.length);
    ltcdata2 = ltcdata2.slice(dates.indexOf(initialDate.toISOString().split('T')[0]), dates.length);

    console.log(labelsData2);
    
    //then I updated my chart!
    myChart.data.datasets[0].data = usddata2;
    myChart.data.datasets[1].data = ltcdata2;
    myChart.data.labels = labelsData2;
    myChart.update('none');
}

