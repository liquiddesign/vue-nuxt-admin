<template>
  <BaseWrapper :wrap="wrap">
    <label class="form-check-label" style="line-height: 1;">
      <input v-model="$parent.selectAll" v-bind="$attrs" type="checkbox" :class="{'form-check-input' : true}"> &sum;
    </label>
  </BaseWrapper>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  wrap?: string,
}>(), { wrap: undefined });

defineOptions({
  inheritAttrs: false,
});

</script>