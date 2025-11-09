
# {{ site.data.profiles[page.coin].name.name }}

{{ site.data.profiles[page.coin].description }}

* Symbol: `{{ site.data.profiles[page.coin].short }}`
* Homepage: [{{ site.data.profiles[page.coin].name.homepage }}]({{ site.data.profiles[page.coin].name.homepage }})
* Type: `{{ site.data.profiles[page.coin].type }}`
* Country: {{ site.data.profiles[page.coin].country }}


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
