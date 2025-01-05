<template>
  <BaseButton :loading="form.pending.value" :disabled="form?.disabled.value || $attrs['disabled']" @click="form.submit"><slot /></BaseButton>
</template>

<script setup lang="ts">
import { inject } from 'vue';

withDefaults(defineProps<{
  formRef?: object|null,
}>(), {formRef: null});


const form: any = inject('form') as any;

</script>