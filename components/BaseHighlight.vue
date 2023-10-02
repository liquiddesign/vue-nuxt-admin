<template>
  <BaseWrapper :wrap="wrap">
    <div class="mb-3 widget-content" v-bind="$attrs">
      <div class="widget-content-wrapper">
        <div v-if="icon" class="widget-content-left pe-2" style="font-size: 2.0rem; line-height: 100%;">
          <i class="metismenu-icon pe-7s-users"></i>
        </div>
        <div class="widget-content-left">
          <div v-if="heading" class="widget-heading">{{ heading }}</div>
          <div v-if="subheading" class="widget-subheading">{{ subheading }}</div>
        </div>
        <div class="widget-content-right">
          <div class="widget-numbers"><span><slot /></span></div>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">

import {withDefaults} from "vue";

withDefaults(defineProps<{
  wrap?: string
  heading?: string
  subheading?: string
  icon?: string
}>(), { wrap: undefined, heading: undefined, subheading: undefined, icon: undefined });

defineOptions({
  inheritAttrs: false
});

</script>