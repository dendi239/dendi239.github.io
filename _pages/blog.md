---
title: Blog
description: "All of the posts in my blog"
permalink: /blog
nav: custom
---

<ul>
{% for post in site.posts %}
<li> {% include blog-listing.html %} </li>
{% endfor %}
</ul>