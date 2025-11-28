
<script src="/scripts/chart.js" ></script>
<script src="/scripts/collapsetable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>

<script>
var chart_ltc_data = [];
var chart_labels = [];

chart_ltc_data.push({{ site.data.profiles[page.coin].amount }});
chart_labels.push(new Date());

{% for event in site.data.profiles[page.coin].events %}
chart_ltc_data.push({{ event.amount }});
chart_labels.push(new Date("{{ event.date }}"));
{% endfor %}


chart_title = "{{ site.data.profiles[page.coin].name.name }} Holdings (LTC)";
</script>

<div class="flex-container">
<div class="flex-item">
<h1> {{ site.data.profiles[page.coin].name.name }} </h1>

{{ site.data.profiles[page.coin].description }}

<ul>
<li> Balance: <b><span class="ltc_amount">{{ site.data.profiles[page.coin].events[0].amount }}</span> LTC</b> (<span class="ltc_to_usd_amount" ltc_amount="{{ site.data.profiles[page.coin].events[0].amount }}"></span>)</li>
<li> Symbol: <code>{{ site.data.profiles[page.coin].short }}</code></li>
<li> Homepage: <a href="{{ site.data.profiles[page.coin].name.homepage }}">{{ site.data.profiles[page.coin].name.homepage }}</a></li>
<li> Type: <code>{{ site.data.profiles[page.coin].type }}</code></li>
<li> Country: {{ site.data.profiles[page.coin].country }}</li>
</ul>
</div>
<div class="chart flex-item">
  <canvas id="myChart"></canvas>
</div>
</div>

#### Historical Data
<table id="main-table">
<thead>
<tr><th>Date</th><th>Amount</th><th>Source</th></tr>
</thead>
{% for event in site.data.profiles[page.coin].events %}
  <tr><td>{{ event.date }}</td><td class="ltc_amount">{{ event.amount }}</td><td style="
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30ch;
  white-space: nowrap;"
  ><a href="{{ event.source }}">{{ event.source }}</a></td></tr>
{% endfor %}
</table>

<script>
  var ct = new CollapseTable();
  ct.set("main-table");
</script>

<script src="/scripts/load_price.js?version=1"></script>
<script src="/scripts/profile_main.js?version=1"></script>
<script src="/profile/profile_chart.js" ></script>
