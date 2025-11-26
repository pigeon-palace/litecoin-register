
async function draw_chart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Total Treasury & ETF Holdings (USD)',
            usddata: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            yAxisID: 'y'
          }, {
            label: 'Total Treasury & ETF Holdings (LTC)',
            ltcdata: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            yAxisID: 'y1'
          }]
        },
        options: {
                responsive: true,
                maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
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
              y: {
                title: {
                    display: true,
                    text: 'USD'
                },
                type: 'linear',
                display: true,
                position: 'left',
                beginAtZero: true,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        let formatter = Intl.NumberFormat('en', { notation: 'compact' });
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
                        let formatter = Intl.NumberFormat('en', { notation: 'compact' });
                        return formatter.format(value);
                    }
                },
                },
          }
        }
      });
  }
