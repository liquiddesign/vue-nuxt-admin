<template>
  <BasePageHeader title="Ceníky" icon="pe-7s-edit" description="Administrace ceníků">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'pricelists-new'})">Přidat ceník</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters = {}">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název, kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseDropdown class="btn-outline-primary btn-sm me-1" icon="fa-bolt">
        <BaseDropdownItem @click="makeCopy()">Aktualizovat DPH</BaseDropdownItem>
      </BaseDropdown>
    </template>
    <PricelistsTable :page="page" :on-page="onPage" :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">

const { $user } = useNuxtApp();
const { filters, page, onPage } = useTableVars($user.settings);

</script>