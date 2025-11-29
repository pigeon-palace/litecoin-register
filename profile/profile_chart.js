async function draw_chart() {
    const ctx = document.getElementById('myChart');
    var style = getComputedStyle(document.body);
    var grid_color = style.getPropertyValue('--grid-color');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chart_labels,
            datasets: [{
                label: chart_title,
                data: chart_ltc_data,
                borderWidth: 1,
                yAxisID: 'y'
            }]
        },
        options: {
            stepped: 'after',
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
                    text: chart_title
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
                    grid: {
                      color: grid_color
                    },
                    title: {
                        display: true,
                        text: 'LTC'
                    },
                    type: 'linear',
                    display: true,
                    beginAtZero: true,
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
draw_chart();
