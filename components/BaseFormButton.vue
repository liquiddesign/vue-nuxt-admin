<template>
  <BaseButton :loading="form.pending.value" @click="form.submit"><slot /></BaseButton>
</template>

<script setup lang="ts">
import {inject, withDefaults} from 'vue';

withDefaults(defineProps<{
  formRef?: object|null,
}>(), {formRef: null});


const form: any = inject('form') as any;

</script>