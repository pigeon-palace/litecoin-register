---
layout: default
javascript_post_hook: table_inject.html
---


<script src="/scripts/chart.js" ></script>
<script src="/scripts/collapsetable.min.js"></script>
<table id="main-table">
<thead>
    <tr>
        <th>#</th>
        <th>Short</th>
        <th data-priority="1">Name</th>
        <th>Type</th>
        <th>Country</th>
        <th data-priority="1">Amount (LTC)</th>
        <th>Amount (USD)</th>
    </tr>
</thead>
    {% assign data = "" | split: ',' %}
    {% for coin in site.data.profiles %}
        {% assign data = data | push: coin[1] %}
    {% endfor %}
    {% assign dataSorted = data | sort: 'amount' %}
    {% assign rank = 1 %}    
    {% for coin in dataSorted reversed %}
    <tr>
        <td>{{ rank }} {% assign rank = rank | plus:1 %}</td>
        <td>{{ coin.short }}</td>
        <td><a href="profile/{{ coin.name.slug }}.html">{{ coin.name.name }}</a></td>
        <td>{{ coin.type }}</td>
        <td>{{ coin.country }}</td>
        <td class="ltc_amount">{{ coin.events[0].amount }}</td>
        <td style="text-align:right">$<span class="ltc_to_usd_amount" ltc_amount="{{ coin.events[0].amount }}">Loading...</span></td>
    </tr>
    {% endfor %}
</table>


<div class="chart">
  <canvas id="myChart"></canvas>
</div>
<script src="/chart/chart.js?version=3"></script>
<script src="/scripts/load_price.js"></script>
<script src="/scripts/table_main.js?version=3"></script>
<script>
  var ct = new CollapseTable();
  ct.set("main-table");
</script>

 
