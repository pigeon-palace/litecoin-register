async function draw_chart() {
    const ctx = document.getElementById('myChart');

    var style = getComputedStyle(document.body);
    var grid_color = style.getPropertyValue('--grid-color');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Total Treasury & ETF Holdings (USD)',
                data: usddata,
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Total Treasury & ETF Holdings (LTC)',
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
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Total Treasury & ETF Holdings"
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
}
