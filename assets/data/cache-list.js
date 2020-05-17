---
# The list to be cached by PWA
---

const include = [

  /*--- CSS ---*/

  '{{ "/assets/css/home.css" | relative_url }}',
  '{{ "/assets/css/categories.css" | relative_url }}',
  '{{ "/assets/css/tags.css" | relative_url }}',
  '{{ "/assets/css/archives.css" | relative_url }}',
  '{{ "/assets/css/page.css" | relative_url }}',
  '{{ "/assets/css/post.css" | relative_url }}',
  '{{ "/assets/css/category-tag.css" | relative_url }}',
  '{{ "/assets/lib/bootstrap-toc-1.0.1/bootstrap-toc.min.css" | relative_url }}',

  /*--- Javascripts ---*/

  '{{ "/assets/js/dist/commons.js" | relative_url }}',
  '{{ "/assets/js/dist/timeago.min.js" | relative_url }}',
  '{{ "/assets/js/dist/category-collapse.min.js" | relative_url }}',
  '{{ "/assets/js/dist/toc.min.js" | relative_url }}',
  '{{ "/assets/lib/bootstrap-toc-1.0.1/bootstrap-toc.min.js" | relative_url }}',

  /*--- HTML ---*/

  /* Tabs */
  {% for tab in site.data.tabs %}
    {% capture item %}
      {%- unless tab.name == 'Home' -%}
        /tabs/{{ tab.name | downcase }}
      {%- endunless -%}
      {{- "/" -}}
    {% endcapture %}
    '{{ item | relative_url }}',
  {% endfor %}

  /* The posts of first Home page and recent update list */
  {% assign post_list = "" | split: "" %}
  {% assign sum = 0 %}

  {% for post in site.posts %}
    {% assign post_list = post_list | push: post.url %}
    {% assign sum = sum | plus: 1 %}
    {% if sum >= site.paginate %}
      {% break %}
    {% endif %}
  {% endfor %}

  {% include update_list.html %}
  {% for item in update_list %}
    {% assign url = item | split: "::" | last | prepend: "/posts/" | append: "/" %}
    {% assign post_list = post_list | push: url %}
  {% endfor %}

  {% assign post_list = post_list | uniq %}

  {% for url in post_list %}
    '{{ url }}',
  {% endfor %}

  /* Trending tags */
  {% include trending-tags.html %}
  {% for tag in trending_tags %}
    {% capture tag_url %}/tags/{{ tag | downcase | url_encode }}/{% endcapture %}
    '{{ tag_url | relative_url }}',
  {% endfor %}

  /*--- Icons ---*/

  {%- capture icon_url -%}
    {{ "/assets/img/favicons" | relative_url }}
  {%- endcapture -%}
  '{{ icon_url }}/favicon.ico',
  '{{ icon_url }}/android-icon-192x192.png',
  '{{ icon_url }}/favicon-32x32.png',
  '{{ icon_url }}/favicon-16x16.png',
  '{{ icon_url }}/manifest.json',
  '{{ icon_url }}/browserconfig.xml',

  /*--- Others ---*/

  {% if site.google_analytics.pv.enabled %}
    '{{ "/assets/lib/countUp.min.js" | relative_url }}',
    '{{ "/assets/js/dist/pageviews.min.js" | relative_url }}',
  {% endif %}

  '{{ "/assets/data/search.json" | relative_url }}',
  '{{ "/404.html" | relative_url }}',

  '{{ "/app.js" | relative_url }}',
  '{{ "/sw.js" | relative_url }}'
];

const exclude = [
  '/assets/data/pv-data.json',
  '/img.shields.io/'
];
