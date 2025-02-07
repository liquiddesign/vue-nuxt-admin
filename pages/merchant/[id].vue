<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'merchant'})" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink v-if="0" class="me-1" />
      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />
      <BaseDropdown class="btn-outline-primary me-1" icon="fa-bolt">
        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />
    </template>
    <MerchantForm ref="form" :data="data" url="eshop/merchant" :slug="route.params.id" :loading="pending" @success="redirect" />
  </BaseCard>
</template>

<script setup lang="ts">
const route = useRoute();

const {data, pending, refresh} = useApiFetch('eshop/merchant/' + route.params.id + '?expand=customerGroup,pricelists,visibilityLists,customers');
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/merchant/', 'merchant');
</script>