<template>
  <BasePageHeader title="Měny" description="" icon="pe-7s-date">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'currency-new'})">Přidat měnu</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <CurrencyTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </CurrencyTableFilter>
    </template>
    <CurrencyTable :filters="filters" :lang="lang" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters, lang, langs } = useTableVars();
</script>