---
layout: default
javascript_post_hook: table_inject.html
---


<script src="/scripts/chart.js" ></script>
<script src="/scripts/collapsetable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>


<div class="flex-container">
<div class="flex-item posts">
<h3>Latest News</h3>
<ul>
  {% for post in site.posts limit: 3 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span>({{ post.date  | date: "%B %-d, %Y" }}) {{ post.content  | markdownify | strip_html | truncatewords: 20 }}</span>
    </li>
  {% endfor %}
</ul>
<a href="/posts.html">More news...</a>
</div>
<div class="flex-item chart-wrapper">
    <div class="top-bar">
    <span class="title">
      Total Treasury, ETF, & DeFi Value 
      </span>
      <span style="float:right">
          <a class="range" id="3M">3M</a>
          <a class="range" id="1Y">1Y</a>
          <a class="range" id="3Y">3Y</a>
          <a class="range" id="All">All</a>
      </span>
    </div>
  <div class="chart">
    <canvas id="myChart"></canvas>
  </div>
</div>
</div>

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
        <td style="text-align:right"><span class="ltc_to_usd_amount_compact" ltc_amount="{{ coin.events[0].amount }}">Loading...</span></td>
    </tr>
    {% endfor %}
</table>


<script src="/chart/chart_data.js"></script>
<script src="/chart/chart.js"></script>
<script src="/scripts/load_price.js"></script>
<script src="/scripts/table_main.js?version=3"></script>
<script>
  var ct = new CollapseTable();
  ct.set("main-table");
</script>

 
