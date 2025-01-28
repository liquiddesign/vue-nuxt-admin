<template>
  <BasePageHeader title="Zákaznici" description="Administrace zákazníků" icon="pe-7s-users">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'customer-new'})">Přidat zákazníka</BaseButtonNew>
  </BasePageHeader>
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <CustomerTableFilter v-model="filters" />
    </template>
    <CustomerTable :filters="filters" />
  </BaseCard>
</template>

<script setup lang="ts">
const { filters } = useTableVars();
</script>