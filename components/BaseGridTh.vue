<template>
  <th :style="orderBy ? 'cursor:pointer;' : ''" @click="() => props.orderBy ? $parent.orderBy(props.orderBy) : null">
    <slot />
    <template v-if="orderBy">
      <i class="fa ms-1" :class="{'fa-sort' : $parent.orderByValue !== orderBy, 'fa-sort-down' : $parent.orderByValue === orderBy && !$parent.orderByAsc, 'fa-sort-up' : $parent.orderByValue === orderBy && $parent.orderByAsc}" />
    </template>
  </th>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  orderBy?: string,
}>(), {orderBy: undefined});


</script>