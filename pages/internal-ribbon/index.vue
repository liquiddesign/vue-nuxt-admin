<template>
  <BasePageHeader title="Štítky" description="Administrace štítků" icon="pe-7s-ribbon">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'internal-ribbon-new'})">Přidat štítek</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <InternalRibbonTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <template #headerRight>
      <BaseButtonFilter class="me-3" :show-filters="showFilters" @click="showFilters = !showFilters" />
    </template>
    <InternalRibbonTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" :show-filters="showFilters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, showFilters, page, onPage, order } = useTableVars();
</script>