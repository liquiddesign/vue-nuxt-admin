<template>
  <ul class="vertical-nav-menu metismenu">
    <template v-for="(header, index) in menu" :key="index">
      <li class="app-sidebar__heading text-lqd">{{ header.title }}</li>
      <li v-for="(item, index2) in header.items" :key="index2" :class="{'mm-active' : active2[item.name] === true}">
        <a v-if="!item.hidden" href="#" :aria-expanded="active2[item.name] === true ? 'true' : 'false'" @click.stop.prevent="item.items.length ? active2[item.name] = !active2[item.name] : navigateTo({name: item.route})">
          <i class="metismenu-icon" :class="[item.icon]" />{{ item.title }}
          <i v-if="item.items.length" class="metismenu-state-icon pe-7s-angle-down caret-left" />
        </a>
        <ul v-if="item.items.length" class="mm-collapse" :class="{'mm-show' : active2[item.name] === true}">
          <li v-for="(subItem, index3) in item.items" :key="index3">
            <a v-if="!subItem.hidden" href="#" :class="{'mm-active': subItem.route === $route.name || _startsWith($route.name, subItem.route), 'disabled': subItem.disabled}" @click.stop.prevent="navigateTo({name: subItem.route})">
              <i class="metismenu-icon" />{{ subItem.title }}
            </a>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>
<script setup lang="ts">

import data from 'assets/data/menu.js';

const { $user } = useNuxtApp();

const active: any = reactive({});
const active2: any = reactive({});
const route = useRoute();

const menu = reactive(data);

onMounted(function () {
  for(const i in data) {
    for(const j in data[i].items) {
      let deletedCount = 0;
      for(const k in data[i].items[j].items) {
        if (!$user.hasPermission(data[i].items[j].items[k].route)) {
          menu[i].items[j].items[k].hidden = true;
          deletedCount++;
          continue;
        }

        if (_startsWith(route.name?.toString(), data[i].items[j].items[k].route)) {
          active[data[i].items[j].items[k].route] = true;
          active2[data[i].items[j].name] = true;
        }
      }

      if (data[i].items[j].items.length === deletedCount && deletedCount) {
          menu[i].items[j].hidden = true;
      }
    }
  }

});







</script>