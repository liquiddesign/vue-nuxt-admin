<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'discount'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <DiscountForm ref="form" url="eshop/discount" :data="formData" :lang="lang" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const { settings } = useUser();
const lang: Ref<string> = ref(settings.value.defaultLang);

const defaultFormData = {
  uuid: '',
  name: '',
  validFrom: '',
  validTo: '',
  pricelists: [],
  ribbons: [],
  recommended: false,
};

const formData:any = ref(Object.assign({}, defaultFormData));

function redirect(id) {
  formData.value = Object.assign({}, defaultFormData);
  id ? navigateTo({name: 'discount-id', params: {id: id}}) :  navigateTo({name: 'discount'});
}
</script>