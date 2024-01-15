<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currencies'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #body>
      <CurrenciesForm ref="form" :data="formData" @success="redirect">
        <template #top><h5 class="card-title">Nová měna</h5></template>
      </CurrenciesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {inject} from 'vue';

const config = useRuntimeConfig();
const toast: ToastPluginApi = inject('toast', useToast());

const defaultFormData = { priority: 0};
const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'currencies-id', params: {id: id}}) :  navigateTo({name: 'currencies'})
}


</script>