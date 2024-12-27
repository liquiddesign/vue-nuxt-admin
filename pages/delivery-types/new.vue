<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'delivery-types'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #body>
      <DeliveryTypesForm ref="form" :lang="lang" :data="formData" @success="redirect">
        <template #top><h5 class="card-title">Doprava #{{ formData?.id }}</h5></template>
      </DeliveryTypesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">

const lang = ref('cs');
const langs = ref(['cs', 'en']);

const formData:any = ref({ priority: 0, externalCarrier: true, prices: [{ currency: 'CZK'}]});

function redirect(id) {
  formData.value = { priority: 0, externalCarrier: true, prices: [{ currency: 'CZK'}]};
  id ? navigateTo({name: 'delivery-types-id', params: {id: id}}) :  navigateTo({name: 'delivery-types'});
}


</script>