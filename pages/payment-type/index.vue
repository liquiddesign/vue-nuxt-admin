<template>
  <BasePageHeader title="Typy plateb" description="Administrace typů plateb" icon="HandCoins">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'payment-type-new'})">Přidat typ platby</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <PaymentTypeTableFilter v-model="filters" @clear="clearFilters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </PaymentTypeTableFilter>
    </template>
    <PaymentTypeTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" :lang="lang" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, clearFilters, lang, langs, page, onPage, order } = useTableVars();
</script>