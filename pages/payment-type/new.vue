<script setup lang="ts">
const lang = ref('cs');
const langs = ref(['cs', 'en']);

const formData:any = ref({ code: '', name: {cs: '', en: ''}, priority: 0});

function redirect(id) {
  formData.value = { code: '', name: {cs: '', en: ''}, priority: 0};
  id ? navigateTo({name: 'payment-type-id', params: {id: id}}) :  navigateTo({name: 'payment-type'});
}
</script>

<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'payment-type'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <PaymentTypeForm ref="form" :lang="lang" :data="formData" @success="redirect" />
  </BaseCard>
</template>