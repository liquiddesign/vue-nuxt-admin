<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">ID</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh order-by="name">Název</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh class="minimal" order-by="hidden"><i class="fa fa-eye-slash" /></BaseGridTh>
        <BaseGridTh><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow, changed}">
      <tr :class="{'inactive': item.hidden, 'active': selected, 'changed': changed}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'groups-id', params: { id: item.uuid }})" /></td>
        <td>{{ item.name ?? '-' }}</td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer="{deleteRows, exportRows, selectedCount, disabledControls}">
      <BaseGridSelectAll wrap="flex-shrink-0 me-1 ms-1" />
      <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;">
        <BaseButtonExport class="btn-paging" :outline="true" :disabled="disabledControls" @click="exportRows();">({{ selectedCount(totalCount) }})</BaseButtonExport>
        <BaseButtonDelete class="btn-paging" :outline="true" :disabled="disabledControls" :confirmation="true" @confirm="deleteRows();">({{ selectedCount(totalCount) }})</BaseButtonDelete>
      </BaseGridPaginator>
    </template>
  </BaseGrid>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  filters: object
}>(), {  });

const { $user } = useNuxtApp();
const { page, onPage } = useTableVars($user.settings);

const url = 'groups';

</script>