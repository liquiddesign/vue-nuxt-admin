<template>
  <BaseButton :loading="form.pending.value" @click="form.submit"><slot /></BaseButton>
</template>

<script setup lang="ts">
import {inject} from 'vue';

const form: any = inject('form') as any;


</script>