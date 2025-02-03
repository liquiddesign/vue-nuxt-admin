<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
        <BaseGridTh class="minimal" order-by="symbol">Symbol</BaseGridTh>
        <BaseGridTh order-by="name">Název</BaseGridTh>
        <BaseGridTh class="minimal" order-by="convertRatio">Kurz</BaseGridTh>
        <BaseGridTh class="minimal" order-by="enableConversion">Konverze</BaseGridTh>
        <BaseGridTh class="minimal"><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal">{{ item.id }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'currency-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.code }}</td>
        <td>{{ item.symbol ?? '-' }}</td>
        <td>{{ item.name ?? '-' }}</td>
        <td class="minimal">{{ item.convertRatio }}</td>
        <td class="minimal"><BaseCheckBox v-model="item.enableConversion" @change="(e) => updateRow(e.target.checked, 'enableConversion')" /></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer="{deleteRows, exportRows, selectedCount, disabledControls, selectedQuery, resetSelect}">
      <BaseGridSelectAll wrap="flex-shrink-0 me-1 ms-1" />
      <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;">
        <BaseButtonEdit class="btn-paging" :outline="true" :disabled="disabledControls" @click="$refs.modalUpdate.open();">({{ selectedCount(totalCount) }})</BaseButtonEdit>
        <BaseButtonExport class="btn-paging" :outline="true" :disabled="disabledControls" @click="exportRows();">({{ selectedCount(totalCount) }})</BaseButtonExport>
        <BaseButtonDelete class="btn-paging" :outline="true" :disabled="disabledControls" :confirmation="true" @confirm="deleteRows();">({{ selectedCount(totalCount) }})</BaseButtonDelete>
        <BaseModal ref="modalUpdate" :title="'Hromadná úprava (celkem ' + selectedCount(totalCount) + ')'">
          <BaseForm ref="form" method="PATCH" :data="formData" :url="'currency' + selectedQuery" :params="filters" @success="setDefaults(); resetSelect(); $refs.grid.refresh();">
<!--            <div class="row">-->
<!--              <BaseCheckBox label="Skrytý" name="recommended.value" wrap="col-lg-6 pt-1" :disabled="formData.recommended.strategy === 'noAction'" />-->
<!--              <BaseSelect name="recommended.strategy" :class="{'border-success': formData.recommended.strategy !== 'noAction'}" :options="{noAction: 'původní', replace: 'nahradit'}" wrap="col-lg-6" />-->
<!--            </div>-->
<!--            <div class="row mt-3">-->
<!--              <BaseCheckBox label="Doporučený" name="hidden.value" wrap="col-lg-6 pt-1" :disabled="formData.hidden.strategy === 'noAction'" />-->
<!--              <BaseSelect name="hidden.strategy" :class="{'border-success': formData.hidden.strategy !== 'noAction'}" :options="{noAction: 'původní', replace: 'nahradit'}" wrap="col-lg-6" />-->
<!--            </div>-->
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
import type {GridOrder} from '~/composables/useTableVars';

withDefaults(defineProps<{
  lang: string,
  filters?: any,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {}  });

const url = 'eshop/currency';
const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);


const defaultFormData = {recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}};
const formData: any = ref(Object.assign({}, defaultFormData));

function setDefaults()
{
  formData.value = defaultFormData;
}

</script>