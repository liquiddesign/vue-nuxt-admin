<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'delivery-types'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon="fa-bolt">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm" @confirm="deleteItem()" />
    </template>
    <template #body>
      <DeliveryTypesForm ref="form" :lang="lang" :data="formData" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Doprava #{{ formData?.id }}</h5></template>
      </DeliveryTypesForm>
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

const formData:any = ref({ priority: 0, externalCarrier: true, prices: [{ currency: 'CZK'}]});

const {data, pending, refresh} = useFetch(config.public.baseURL + 'delivery-type/' + route.params.id);

watch(data, (value) => {
  Object.assign(formData.value, value);
});

function deleteItem() {
  $fetch(config.public.baseURL + 'delivery-type/' + route.params.id, { method: 'DELETE'}).then(() => {
    toast.success('Smazáno');
    navigateTo({name: 'delivery-types'});
  }).catch(() => {
    toast.error('Smazání se nezdařilo');
  });
}

function makeCopy() {
  $fetch(config.public.baseURL +  'delivery-type/' + route.params.id, { method: 'POST', body: {'_op': 'makeCopy'}})
    .then((response) => {
      toast.success('Kopie vyvtořena');
      navigateTo({name: 'delivery-types'});
    }).catch(() => {
    toast.error('Nepodařilo se vytvořit kopii');
  });
}

function redirect(id) {
  id || navigateTo({name: 'delivery-types'})
}


</script>