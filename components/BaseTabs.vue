<template>
  <BaseWrapper :wrap="wrap">
    <ul v-bind="$attrs" class="tabs-animated-shadow tabs-animated nav nav-justified">
      <li v-for="(tab,i) in tabs" :key="i" class="nav-item">
        <a role="tab" class="nav-link" :class="{'bg-light': i !== active, 'active show': i === active}" aria-selected="true" @click.stop="emit('select', i);">
          <span>{{ tab }}</span>
        </a>
      </li>
    </ul>
    <slot />
    <slot :name="active" />
  </BaseWrapper>
</template>
<script setup lang="ts">

import {withDefaults} from "vue";

withDefaults(defineProps<{
  wrap?: string
  active: string
  loading?: boolean
  tabs: object
}>(), { loading: false, wrap: undefined });

defineOptions({
  inheritAttrs: false
});

const emit = defineEmits(['select']);

</script>