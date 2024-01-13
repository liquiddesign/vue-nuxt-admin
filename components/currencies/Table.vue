<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
        <BaseGridTh order-by="name">Název</BaseGridTh>
        <BaseGridTh order-by="name">Typ</BaseGridTh>
        <BaseGridTh order-by="name">Kurz</BaseGridTh>
        <BaseGridTh order-by="name">Konverze</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh class="minimal" order-by="recommended"><i class="fa fa-thumbs-o-up" /></BaseGridTh>
        <BaseGridTh class="minimal" order-by="hidden"><i class="fa fa-eye-slash" /></BaseGridTh>
        <BaseGridTh><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'delivery-types-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.code }}</td>
        <td>{{ item.name ?? '-' }}</td>
        <td>{{ 'realna' }}</td>
        <td>{{ 'realna' }}</td>
        <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.recommended" @change="(e) => updateRow(e.target.checked, 'recommended')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer="{deleteRows, exportRows, selectedCount, disabledControls, selectedQuery, resetSelect}">
      <BaseGridSelectAll wrap="flex-shrink-0 me-1 ms-1" />
      <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;">
        <BaseButtonEdit class="btn-paging" :outline="true" :disabled="disabledControls" @click="$refs.modalUpdate.open();">({{ selectedCount(totalCount) }})</BaseButtonEdit>
        <BaseButtonExport class="btn-paging" :outline="true" :disabled="disabledControls" @click="exportRows();">({{ selectedCount(totalCount) }})</BaseButtonExport>
        <BaseButtonDelete class="btn-paging" :outline="true" :disabled="disabledControls" :confirmation="true" @confirm="deleteRows();">({{ selectedCount(totalCount) }})</BaseButtonDelete>
        <BaseModal ref="modalUpdate" :title="'Hromadná úprava (celkem ' + selectedCount(totalCount) + ')'">
          <BaseForm ref="form" method="PATCH" :data="formData" :url="'delivery-type' + selectedQuery" :params="filters" @success="setDefaults(); resetSelect(); $refs.grid.refresh();">
            <div class="row">
              <BaseCheckBox label="Skrytý" name="recommended.value" wrap="col-lg-6 pt-1" :disabled="formData.recommended.strategy === 'noAction'" />
              <BaseSelect name="recommended.strategy" :class="{'border-success': formData.recommended.strategy !== 'noAction'}" :options="{noAction: 'původní', replace: 'nahradit'}" wrap="col-lg-6" />
            </div>
            <div class="row mt-3">
              <BaseCheckBox label="Doporučený" name="hidden.value" wrap="col-lg-6 pt-1" :disabled="formData.hidden.strategy === 'noAction'" />
              <BaseSelect name="hidden.strategy" :class="{'border-success': formData.hidden.strategy !== 'noAction'}" :options="{noAction: 'původní', replace: 'nahradit'}" wrap="col-lg-6" />
            </div>
          </BaseForm>
          <template #footer="{close}">
            <BaseButton class="btn-primary" :loading="$refs.form?.pending" wrap="flex-shrink-0" @click="$refs.form?.submit(); close();">Upravit záznamy</BaseButton>
          </template>
        </BaseModal>
      </BaseGridPaginator>
    </template>
  </BaseGrid>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  page: number
  onPage: number
  filters: object
}>(), {  });

const url = 'currency';

const defaultFormData = {recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}};
const formData: any = ref(Object.assign({}, defaultFormData));

function setDefaults()
{
  formData.value = defaultFormData;
}

</script>