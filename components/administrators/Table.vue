<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh class="minimal" order-by="login">Login</BaseGridTh>
        <BaseGridTh order-by="name">Zkratka</BaseGridTh>
        <BaseGridTh order-by="name">Příjmení a jméno</BaseGridTh>
        <BaseGridTh order-by="name">Role</BaseGridTh>
        <BaseGridTh order-by="name">E-mail</BaseGridTh>
        <BaseGridTh order-by="name">Telefon</BaseGridTh>
        <BaseGridTh order-by="name">Popis</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">2FA</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Pořadí</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Aktivní</BaseGridTh>
        <BaseGridTh><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.administrator_id }}</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'administrators-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.login }}</td>
        <td>{{ item.administrator_nickname }}</td>
        <td>{{ item.administrator_surname ?? '-' }} {{ item.administrator_name ?? '-' }}</td>
        <td>{{ item.role_name ?? '-' }}</td>
        <td>{{ item.administrator_email ?? '-' }}</td>
        <td>{{ item.administrator_phone ?? '-' }}</td>
        <td>{{ item.administrator_description ?? '-' }}</td>
        <td>{{ item.administrator_google2faEnabled ? 'ano' : 'ne' }}</td>
        <td class="minimal"><BaseTextBox v-model="item.administrator_priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
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

const url = 'administrators';

const { settings } = useUser();
const page = ref<number>(1);
const onPage = ref<number>(settings.value.defaultOnPage);

</script>