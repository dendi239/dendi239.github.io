---
title: Blog
description: "All of the posts in Derek’s Digital Garden"
og-type: website
permalink: /blog
nav: custom
---

{% assign display-post-type = true %}
{% for post in site.posts %}
{%- unless post.categories contains "rss-club" or post.categories contains "unlisted" -%}
{% include blog-listing.html %}
{% endunless %}
{% endfor %}