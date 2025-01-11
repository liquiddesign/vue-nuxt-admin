<template>
  <BasePageHeader title="Administratoři" icon="pe-7s-users" description="Správa administrátorů">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'administrators-new'})">Přidat administrátora</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <DeliveryTypesTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
        <BaseCurrencyDropdown class="me-1" :currency="currency" :currencies="currencies" @select="currency = $event" />
      </DeliveryTypesTableFilter>
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
    </template>
    <DeliveryTypesTable :filters="filters" :lang="lang" :currency="currency" />
  </BaseCard>
</template>


<script setup lang="ts">

const { filters, lang, langs, currencies, currency } = useTableVars();

</script>