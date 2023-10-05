<template>
    <flag :iso="iso"/>
</template>
<script setup lang="ts">

const props = defineProps<{
  lang: string
}>();

const iso = computed(() => {
  const table: any = {
    'cs' : 'cz',
    'en' : 'gb'
  }

  return table[props.lang] !== undefined ? table[props.lang] : props.lang;
});

</script>