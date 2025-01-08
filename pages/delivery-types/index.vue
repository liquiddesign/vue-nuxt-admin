<template>
  <BasePageHeader title="Administratoři" icon="pe-7s-users" description="Správa administrátorů">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'administrators-new'})">Přidat administrátora</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <DeliveryTypesTableFilter v-model="filters">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang = $event" />
      </DeliveryTypesTableFilter>
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
    </template>
    <DeliveryTypesTable :filters="filters" />
  </BaseCard>
</template>


<script setup lang="ts">

const { filters, lang, langs } = useTableVars();

</script>