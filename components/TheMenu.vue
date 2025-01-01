<template>
  <ul class="vertical-nav-menu metismenu">
    <template v-for="(header, index) in menu" :key="index">
      <li class="app-sidebar__heading text-lqd">{{ header.title }}</li>
      <li v-for="(item, index2) in header.items" :key="index2" :class="{'mm-active' : active[item.name] === true || item.route === route.name}">
        <a v-if="!item.hidden" href="#" :aria-expanded="active[item.name] === true ? 'true' : 'false'" @click.stop.prevent="item.items.length ? active[item.name] = !active[item.name] : navigateTo({name: item.route})">
          <i class="metismenu-icon" :class="[item.icon]" />{{ item.title }}
          <i v-if="item.items.length" class="metismenu-state-icon pe-7s-angle-down caret-left" />
        </a>
        <ul v-if="item.items.length" class="mm-collapse" :class="{'mm-show' : active[item.name] === true}">
          <li v-for="(subItem, index3) in item.items" :key="index3">
            <a v-if="!subItem.hidden" :class="{'mm-active': subItem.route === route.name || _startsWith($route.name, subItem.route), 'disabled': subItem.disabled}" @click.stop.prevent="navigateTo({name: subItem.route})">
              <i class="metismenu-icon" />{{ subItem.title }}
            </a>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
<script setup lang="ts">

import data from '~/utils/Menu';
import {type MenuItem} from '~/utils/Menu';
const { $user } = useNuxtApp();

const active: any = reactive({});
const route = useRoute();
const menu = reactive(data);

onMounted(() => {
  data.forEach((section: MenuItem, i) => {
    section.items.forEach((item: MenuItem, j) => {
      item.items.forEach((subItem: MenuItem, k) => {
        if (subItem.route && !$user.hasPermission(subItem.route)) {
          menu[i].items[j].items[k].hidden = true;
          return;
        }

        if (_startsWith(route.name?.toString(), subItem.route)) {
          active[item.name] = true;
        }
      });

      if (item.items.length && item.items.every((item: MenuItem) => item.hidden)) {
        menu[i].items[j].hidden = true;
      }
    });
  });
});







</script>