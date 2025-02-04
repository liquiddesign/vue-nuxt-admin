<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'display-amount'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #body>
      <DisplayAmountForm ref="form" :lang="lang" :data="formData" @success="redirect" />
    </template>
  </BaseCard>
</template>

<script setup lang="ts">

const lang = ref('cs');
const langs = ref(['cs', 'en']);

const formData:any = ref({ label: {cs: '', en: ''}, priority: 0, displayDelivery: null, isSold: false});

function redirect(id) {
  formData.value = { label: {cs: '', en: ''}, priority: 0, displayDelivery: null, isSold: false};
  id ? navigateTo({name: 'display-amount-id', params: {id: id}}) :  navigateTo({name: 'display-amount'});
}

</script>