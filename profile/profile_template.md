
# {{ site.data.profiles[page.coin].name.name }}

{{ site.data.profiles[page.coin].description }}

* Balance: <b><span id="profile_balance">{{ site.data.profiles[page.coin].events[0].amount }}</span> LTC</b> ($<span id="profile_balance_usd"></span>)
* Symbol: `{{ site.data.profiles[page.coin].short }}`
* Homepage: [{{ site.data.profiles[page.coin].name.homepage }}]({{ site.data.profiles[page.coin].name.homepage }})
* Type: `{{ site.data.profiles[page.coin].type }}`
* Country: {{ site.data.profiles[page.coin].country }}

#### Historical Data
<table>
<tr><th>Date</th><th>Amount</th><th>Source</th></tr>
{% for event in site.data.profiles[page.coin].events %}
  <tr><td>{{ event.date }}</td><td>{{ event.amount }}</td><td style="
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30ch;
  white-space: nowrap;"
  ><a href="{{ event.source }}">{{ event.source }}</a></td></tr>
{% endfor %}
</table>

<script>
  var profile_balance = parseFloat(document.getElementById('profile_balance').innerText);
  document.getElementById("profile_balance").textContent=profile_balance.toLocaleString();
</script>

<script src="/scripts/load_price_profile.js?version=1"></script>
<script src="/scripts/profile_main.js?version=1"></script>
