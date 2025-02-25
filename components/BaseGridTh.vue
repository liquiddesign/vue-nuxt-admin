<template>
  <th :style="orderBy ? 'cursor:pointer;' : ''" @click="() => props.orderBy ? $parent.orderBy(props.orderBy) : null">
    <slot />
    <template v-if="orderBy">
      <BaseIcon v-if="$parent.orderByValue !== orderBy" icon-name="ArrowDownUp" class="ms-1" />
      <BaseIcon v-else-if="$parent.orderByValue === orderBy && !$parent.orderByAsc" icon-name="ArrowDownWideNarrow" class="ms-1" />
      <BaseIcon v-else-if="$parent.orderByValue === orderBy && $parent.orderByAsc" icon-name="ArrowUpNarrowWide" class="ms-1" />
    </template>
  </th>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  orderBy?: string,
}>(), {orderBy: undefined});


</script>