<template>
  <BaseCard>
    <BaseButtonBack @click.prevent="success"/>
  </BaseCard>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
const toast: ToastPluginApi = inject('toast', useToast());

function success() {
  toast.success('uloženo');
}


</script>