
// add event listeners for the buttons
document.getElementById("0").addEventListener('click', () => {
  const chart = document.getElementById("myChart");
  chart.config.format = { monthly format };
  chart.data = monthlyData;
  chart.options = { monthly options };
  chart.update();
}

document.getElementById("1").addEventListener('click', () => {
  const chart = document.getElementById("myChart");
  chart.config.format = { cumulative format };
  chart.data= cumulativeData;
  chart.options = { cumulative options };
  chart.update();
}
