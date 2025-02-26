<template>
  <BasePageHeader title="Obchodníci" description="Administrace obchodníků" icon="Store">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'merchant-new' })">Přidat obchodníka</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <MerchantTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <MerchantTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, page, onPage, order } = useTableVars();
</script>