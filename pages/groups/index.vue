<template>
  <BasePageHeader title="Skupiny" icon="Users" description="Správa administrátorských skupin">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'groups-new'})">Přidat skupinu</BaseButtonNew>
  </BasePageHeader>
  <BaseTabs class="col-xl-6 col-lg-12" :active="route.name.toString()" :tabs="{'administrators': 'Administratoři', 'roles': 'Role', 'groups': 'Skupiny'}" @select="navigateTo($event)" />
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters = {}">
        <BaseTextBox v-model="filters['f:name%+id']" wrap="flex-shrink-0" :placeholder="'Název, #id'" type="text" />
        <BaseTextBox v-model="filters['f:>id']" wrap="flex-shrink-0" :placeholder="'Od'" type="text" />
        <BaseTextBox v-model="filters['f:>>id']" wrap="flex-shrink-0" :placeholder="'Od (včetně)'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
      <BaseDropdown class="btn-outline-primary btn-sm me-2" icon-name="Zap">
        <BaseDropdownItem>Hromadná akce</BaseDropdownItem>
      </BaseDropdown>
    </template>
    <GroupsTable :filters="filters" />
  </BaseCard>
</template>


<script setup lang="ts">
const route = useRoute();
const { filters } = useTableVars();

</script>