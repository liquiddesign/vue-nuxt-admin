<template>
  <BasePageHeader title="Role" icon="pe-7s-users" description="Správa administrátorských rolí">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'roles-new'})">Přidat roli</BaseButtonNew>
  </BasePageHeader>
  <BaseTabs class="col-xl-6 col-lg-12" :active="$route.name" :tabs="{'administrators': 'Administratoři', 'roles': 'Role', 'groups': 'Skupiny'}" @select="navigateTo($event)" />
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters = {}">
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název, kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
      <BaseDropdown class="btn-outline-primary btn-sm me-1" icon="fa-bolt">
        <BaseDropdownItem>Hromadná akce</BaseDropdownItem>
      </BaseDropdown>
    </template>
    <RolesTable :filters="filters" />
  </BaseCard>
</template>


<script setup lang="ts">
const { $user } = useNuxtApp();
const { filters } = useTableVars($user.settings);


</script>