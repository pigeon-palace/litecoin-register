
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
            plugins: {
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
                beginAtZero: true
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
                },
          }
        }
      });
  }
