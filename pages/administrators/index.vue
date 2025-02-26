<template>
  <BasePageHeader title="Administratoři" icon="Users" description="Správa administrátorů">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'administrators-new'})">Přidat administrátora</BaseButtonNew>
  </BasePageHeader>
  <BaseTabs class="col-xl-6 col-lg-12" :active="$route.name" :tabs="{'administrators': 'Administratoři', 'roles': 'Role', 'groups': 'Skupiny'}" @select="navigateTo($event)" />
  <BaseCard wrap="col-lg-12">
    <template #headerLeft>
      <BaseFilter @cancel="filters = {}">
        <BaseTextBox v-model="filters.idn" wrap="flex-shrink-0" placeholder="id" type="number" style="width: 60px;" />
        <BaseTextBox v-model="filters.search" wrap="flex-shrink-0" placeholder="Login, příjmení, jméno, zkratka" type="text" size="40" />
        <BaseMultiSelect v-model="filters.roles" placeholder="Role" :multiple="true" wrap="flex-shrink-0" options-url="roles" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
        <BaseMultiSelect v-model="filters.groups" placeholder="Skupiny" :multiple="true" wrap="flex-shrink-0" options-url="groups" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseLiveUsers class="me-2" />
      <BaseDropdown class="btn-outline-primary btn-sm me-1" icon-name="Zap">
        <BaseDropdownItem>Hromadná akce</BaseDropdownItem>
      </BaseDropdown>
    </template>
    <AdministratorsTable :filters="filters" />
  </BaseCard>
</template>


<script setup lang="ts">

const { filters } = useTableVars();

</script>