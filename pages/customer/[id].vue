<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'customer'})" />
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
    <template #body>
      <CustomerForm ref="form" url="eshop/customer" :data="data" :slug="route.params.id" :loading="pending" @success="redirect" />
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
const route = useRoute();

const {data, pending, refresh} = useApiFetch('eshop/customer/' + route.params.id);
const {deleteItem, makeCopy, redirect} = useDetailMethods('eshop/customer', 'customer');
</script>