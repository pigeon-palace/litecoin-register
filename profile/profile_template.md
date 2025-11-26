
# {{ site.data.profiles[page.coin].name.name }}

{{ site.data.profiles[page.coin].description }}

* Balance: <b><span class="ltc_amount">{{ site.data.profiles[page.coin].events[0].amount }}</span> LTC</b> ($<span class="ltc_to_usd_amount">{{ site.data.profiles[page.coin].events[0].amount }}</span>)
* Symbol: `{{ site.data.profiles[page.coin].short }}`
* Homepage: [{{ site.data.profiles[page.coin].name.homepage }}]({{ site.data.profiles[page.coin].name.homepage }})
* Type: `{{ site.data.profiles[page.coin].type }}`
* Country: {{ site.data.profiles[page.coin].country }}

#### Historical Data
<table>
<tr><th>Date</th><th>Amount</th><th>Source</th></tr>
{% for event in site.data.profiles[page.coin].events %}
  <tr><td>{{ event.date }}</td><td class="ltc_amount">{{ event.amount }}</td><td style="
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30ch;
  white-space: nowrap;"
  ><a href="{{ event.source }}">{{ event.source }}</a></td></tr>
{% endfor %}
</table>

<script src="/scripts/load_price.js?version=1"></script>
<script src="/scripts/profile_main.js?version=1"></script>
