<script setup lang="ts">
const { filters, lang, langs } = useTableVars();
</script>

<template>
  <BasePageHeader title="Typy plateb" description="Administrace typů plateb" icon="pe-7s-cash">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'payment-type-new'})">Přidat typ platby</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <PaymentTypeTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </PaymentTypeTableFilter>
    </template>
    <PaymentTypeTable :filters="filters" :lang="lang" />
  </BaseCard>
</template>