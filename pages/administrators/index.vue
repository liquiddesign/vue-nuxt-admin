<template>
  <BasePageHeader title="Administratoři" icon="pe-7s-users" description="Správa administrátoru, rolí a práv">
    <div style="display: inline-block" class="me-4">
      <span title="Lukáš Knotek"><img width="30" class="rounded-circle me-2" style="border: 2px solid #ff6464;" src="https://api.dokonalynajemnik.cz/userfiles/administrators/63b6c8c71357a00154123794/thumbs/Knotek.jpeg" alt=""><!----><!----></span>
      <span title="Lukáš Knotek"><img width="30" class="rounded-circle" style="border: 2px solid #0b0c0d;" src="https://api.dokonalynajemnik.cz/userfiles/administrators/63b6c8c71357a00154123794/thumbs/Knotek.jpeg" alt=""><!----><!----></span>
    </div>


    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'administrators-new'})">Přidat administrátora</BaseButtonNew>
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
    <AdministratorsTable :page="page" :on-page="onPage" :filters="filters" />
  </BaseCard>
</template>


<script setup lang="ts">
const { $user } = useNuxtApp();
const { filters, page, onPage } = useTableVars($user.settings);

</script>