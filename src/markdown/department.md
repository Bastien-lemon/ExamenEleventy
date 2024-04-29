---
title: "Metropolitan Museum of Arts Department"
permalink: /department/{{ pagination.items[0].departmentId }}
layout: default
pagination:
  data: departements.elements
  size: 1
---

{% for item in pagination.items %}

## {{item.displayName}}

{% include "components/objects.njk" %}

{% endfor %}
