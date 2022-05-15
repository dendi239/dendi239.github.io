---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

Here're lists of posts groupped by tags:

{% for page in site.pages %}
  {% if page.main_tag %}
  {% for tag in site.tags %}
    {% if page.main_tag == tag[0] %}
- [{{ tag[0] }}]({{ page.url }})
    {% endif %}
  {% endfor %}
  {% endif %}
{% endfor %}
