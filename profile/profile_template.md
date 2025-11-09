
# {{ site.data.profiles[page.coin].name.name }}

* Symbol: `{{ site.data.profiles[page.coin].short }}`
* Homepage: [{{ site.data.profiles[page.coin].name.homepage }}]({{ site.data.profiles[page.coin].name.homepage }})
* Type: `{{ site.data.profiles[page.coin].type }}`
* Country: {{ site.data.profiles[page.coin].country }}

<table>
<tr><th>Date</th><th>Amount</th><th>Source</th></tr>
{% for event in site.data.profiles[page.coin].events %}
  <tr><td>{{ event.date }}</td><td>{{ event.amount }}</td><td>{{ event.source }}</td></tr>
{% endfor %}
</table>
