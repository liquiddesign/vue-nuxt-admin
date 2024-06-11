<template>
  <BasePageHeader title="Administratoři" icon="pe-7s-users" description="Správa administrátoru, rolí a práv">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'groups-new'})">Přidat administrátora</BaseButtonNew>
  </BasePageHeader>
  <BaseTabs class="col-xl-6 col-lg-12" :active="$route.name" :tabs="{'administrators': 'Administratoři', 'roles': 'Role', 'groups': 'Skupiny'}" @select="navigateTo($event)" />
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters = {}">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název, kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseDropdown class="btn-outline-primary btn-sm me-1" icon="fa-bolt">
        <BaseDropdownItem>Aktualizovat kurzy z CNB</BaseDropdownItem>
      </BaseDropdown>
    </template>
    <GroupsTable :page="page" :on-page="onPage" :filters="filters" />
  </BaseCard>
</template>


<script setup lang="ts">
const { $user } = useNuxtApp();
const { filters, page, onPage } = useTableVars($user.settings);

</script>