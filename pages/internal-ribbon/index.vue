<template>
  <BasePageHeader title="Interní štítky" description="Slouží k označování položek v administraci pro jednuduší filtrace a přehlednost" icon="Tags">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'internal-ribbon-new'})">Přidat štítek</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <InternalRibbonTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <InternalRibbonTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, page, onPage, order } = useTableVars();
</script>