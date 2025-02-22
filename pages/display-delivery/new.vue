<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'display-delivery'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <DisplayDeliveryForm ref="form" :lang="lang" :data="formData" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const lang = ref('cs');
const langs = ref(['cs', 'en']);

const formData:any = ref({ label: {cs: '', en: ''}, priority: 0, timeThreshold: ''});

function redirect(id) {
  formData.value = { priority: 0, externalCarrier: true, prices: [{ currency: 'CZK'}]};
  id ? navigateTo({name: 'display-delivery-id', params: {id: id}}) :  navigateTo({name: 'display-delivery'});
}
</script>