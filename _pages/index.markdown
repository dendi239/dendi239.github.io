---
title:      Home
permalink:  /
---

Hi, it's home of my website.
There's plenty of articles in [blog](/blog), go check them.
This page is WIP, so thank you for coming by.

## Posts
Here're three the most recent posts, take a look:
<ul>
{% for post in site.posts limit:3 %}
<li> {%- include blog-listing.html -%} </li>
{% endfor %}
</ul>
