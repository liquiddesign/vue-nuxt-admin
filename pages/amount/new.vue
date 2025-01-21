<script setup lang="ts">

const lang = ref('cs');
const langs = ref(['cs', 'en']);

const formData:any = ref({ label: {cs: '', en: ''}, priority: 0, displayDelivery: null, isSold: false});

function redirect(id) {
  formData.value = { label: {cs: '', en: ''}, priority: 0, displayDelivery: null, isSold: false};
  id ? navigateTo({name: 'amount-id', params: {id: id}}) :  navigateTo({name: 'amount'});
}

</script>

<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'amount'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #body>
      <AmountForm ref="form" :lang="lang" :data="formData" @success="redirect" />
    </template>
  </BaseCard>
</template>