---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

Here're lists of posts groupped by tags:

{% for tag in site.tags %}
  {% for page in site.pages %}
    {% unless page.main_tag == tags[0] %}
- [{{ tag[0] }}]({{ page.url }})
    {% endunless %}
  {% endfor %}
{% endfor %}
