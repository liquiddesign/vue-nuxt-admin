<template>
  <BasePageHeader title="Typy dopravy" icon="pe-7s-car" description="Administrace možných doprav vašeho zboží">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'delivery-types-new'})">Přidat dopravu</BaseButtonNew>
  </BasePageHeader>

  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters = {}; page = 1;">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název (' + lang + '), kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseCurrencyDropdown class="me-2" :currency="currency" :currencies="currencies" @select="currency = $event;" />
    </template>
    <DeliveryTypesTable :page="page" :on-page="onPage" :lang="lang" :currency="currency" :filters="filters" />
  </BaseCard>
</template>
<script setup lang="ts">

const { $user } = useNuxtApp();
const { filters, page, onPage, lang, currency, currencies, langs } = useTableVars($user.settings);


</script>