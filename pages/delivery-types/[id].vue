<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'delivery-types'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
      <BaseLanguageList :langs="settings.langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon-name="Zap">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm" @confirm="deleteItem()" />
    </template>
    <template #body>
      <DeliveryTypesForm ref="form" :lang="lang" :data="data" :extra="{test: 'supplierDeliveryType'}" url="eshop/delivery-type" :slug="route.params.id" :loading="pending" @success="redirect">
        <template #top><h5 class="card-title">Doprava ID {{ data?.id }}</h5></template>
      </DeliveryTypesForm>
    </template>
  </BaseCard>
</template>
<script setup lang="ts">
const route = useRoute();
const { settings } = useUser();
const lang: Ref<string> = ref(settings.value.defaultLang);

// {name, property, sort, Sortdirection}
//QueryOneRI('eshop/delivery-type', id, [expand], [extraRead], [select]);
//QueryManyRI('eshop/delivery-type', [id], [expand], [extraRead], [select]);
//MutationOneRI('eshop/delivery-type', id, 'POST', [extraWrite]);
//MutationManyRI('eshop/delivery-type', [id], 'POST', [extraWrite]);

const {data, pending, refresh} = useApiFetch('eshop/delivery-type/' + route.params.id  + '/?expand=deliveryTypePrices,allowedPaymentTypes-uuid&extra-test=supplierDeliveryType');
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/delivery-type/', 'delivery-types');

</script>