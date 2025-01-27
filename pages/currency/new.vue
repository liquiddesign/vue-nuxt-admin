<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'currency'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #body>
      <CurrencyForm ref="form" url="eshop/currency" :data="formData" @success="redirect">
        <template #top><h5 class="card-title">Nová měna</h5></template>
      </CurrencyForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
const lang = ref('cs');
const langs = ref(['cs', 'en']);

const defaultFormData = {
  uuid: '',
  code: '',
  name: '',
  symbol: '',
  formatDecimals: 0,
  formatDecimalSeparator: '',
  formatThousandsSeparator: '',
  formatSymbolPosition: '',
  convertRatio: 0,
  calculationPrecision: 0,
  enableConversion: false,
  cashback: false,
  convertCurrency: '',
  // priority: null,
  // hidden: false,
  // recommended: false,
};
const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'currency-id', params: {id: id}}) :  navigateTo({name: 'currency'});
}


</script>