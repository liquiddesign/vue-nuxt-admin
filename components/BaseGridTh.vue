<template>
  <th @click="() => props.orderBy ? $parent.orderBy(props.orderBy) : null" :style="orderBy ? 'cursor:pointer;' : ''">
    <slot />
    <template v-if="orderBy">
      <i class="fa ms-1" :class="{'fa-sort' : $parent.orderByValue !== orderBy, 'fa-sort-down' : $parent.orderByValue === orderBy && !$parent.orderByAsc, 'fa-sort-up' : $parent.orderByValue === orderBy && $parent.orderByAsc}"></i>
    </template>
  </th>
</template>

<script setup lang="ts">
import {withDefaults} from "vue";

const props = withDefaults(defineProps<{
  orderBy?: string,
}>(), {});


</script>