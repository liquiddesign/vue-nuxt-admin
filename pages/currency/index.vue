<template>
  <BasePageHeader title="Měny" description="" icon="CircleDollarSign">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'currency-new'})">Přidat měnu</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <CurrencyTableFilter v-model="filters" @clear="clearFilters" />
    </template>
    <CurrencyTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" :lang="lang" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, lang, page, onPage, order } = useTableVars();
</script>