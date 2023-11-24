<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currencies'})" />
      <BaseButtonSave class="btn-sm me-2" @click="form.submit()" />
    </template>
    <template #body>
      <CurrenciesForm ref="currencyForm" :lang="lang" :data="formData" :slug="route.params.id" @success="success" @clear="clear">
        <template #top><h5 class="card-title">Měna #{{ formData?.id }}</h5></template>
      </CurrenciesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {inject} from 'vue';

const route = useRoute();
const config = useRuntimeConfig();
const toast: ToastPluginApi = inject('toast', useToast());

const deliveryForm = ref(null);
const lang = ref('cs');
const langs = ref(['cs', 'en']);

const formData:any = ref({ });


const form = computed(() => {
  return deliveryForm.value?.$refs?.form;
});

function clear() {
  alert('clear');
  formData.value = {};
}

function success() {
  formData.value = {};

  navigateTo({name: 'currencies'});
}


</script>