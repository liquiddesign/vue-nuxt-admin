<template>
  <BasePageHeader title="Měny" icon="pe-7s-edit" description="Administrace dostupných měn">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'currencies-new'})">Přidat měnu</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters={}">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název, kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseDropdown class="btn-outline-primary btn-sm me-1" icon="fa-bolt">
        <BaseDropdownItem @click="makeCopy()">Aktualizovat kurzy z CNB</BaseDropdownItem>
      </BaseDropdown>
    </template>
    <VatRatesFormTable :page="page" :on-page="onPage" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">

const { $user } = useNuxtApp();
const { filters, page, onPage } = useTableVars($user.settings);

</script>