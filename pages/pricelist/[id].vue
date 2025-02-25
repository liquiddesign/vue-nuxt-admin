<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'pricelist'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon-name="Zap">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />
    </template>
    <PricelistForm ref="form" :data="data" url="eshop/pricelist" :slug="route.params.id" :loading="pending" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const route = useRoute();

const {data, pending, refresh} = useApiFetch('eshop/pricelist/' + route.params.id + '?expand=supplier,discounts-uuid,internalRibbons-uuid');
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/pricelist/', 'pricelist');
</script>