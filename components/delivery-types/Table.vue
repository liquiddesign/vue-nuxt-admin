<template>
  <BaseGrid ref="grid" :url="url" :page="page" :on-page="onPage" :filters="filters" :order="order" :params="{currency: currency}" @change-order="emit('update:order', $event)">
    <template #header>
      <tr>
        <BaseGridThSelect />
        <BaseGridTh class="minimal" order-by="id">ID</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
        <BaseGridTh />
        <BaseGridTh order-by="name"><BaseFlag :lang="lang" /> Název</BaseGridTh>
        <BaseGridTh order-by="name">Doručení</BaseGridTh>
        <BaseGridTh><BaseFlag :lang="lang" /> Povolené platby</BaseGridTh>
        <BaseGridTh class="number" order-by="totalMaxWeight">Limit váhy</BaseGridTh>
        <BaseGridTh class="number">Min. cena</BaseGridTh>
        <BaseGridTh class="number">Max. cena</BaseGridTh>
        <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
        <BaseGridTh class="minimal" order-by="recommended"><BaseIcon icon-name="ThumbsUp" /></BaseGridTh>
        <BaseGridTh class="minimal" order-by="hidden"><BaseIcon icon-name="EyeOff" /></BaseGridTh>
        <BaseGridTh><BaseGridThSettings /></BaseGridTh>
      </tr>
    </template>
    <template #body="{item, selected, deleteRow, updateRow}">
      <tr :class="{'inactive': item.hidden, 'active': selected}">
        <BaseGridTdSelect :id="item.uuid" />
        <td class="minimal handle">{{ item.id ?? '-' }}  ☰</td>
        <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'delivery-types-id', params: { id: item.uuid }})" /></td>
        <td class="minimal">{{ item.code }}</td>
        <td class="minimal"><img height="20" alt="packeta" src="https://w7.pngwing.com/pngs/130/549/png-transparent-ppl-pakket-servicepunt-dhl-express-logo-others-blue-text-service-thumbnail.png"></td>
        <td>{{ item.name[lang] }}</td>
        <td> <button class="btn btn-outline-secondary btn-xs" style="top: -1px;">1</button> {{ item.defaultDisplayDelivery?.label }}</td>
        <td>{{ item.allowedPaymentTypes?.map(item => item['name'][lang] || null).join(', ') }}</td>
        <td class="number">{{ formatNumber(item.totalMaxWeight, settings.defaultWeightUnit) }}</td>
        <td class="number minimal">{{ formatPrice(item.minPrice, item.currencyCode ?? currency) }}</td>
        <td class="number minimal">{{ formatPrice(item.maxPrice, item.currencyCode ?? currency) }}</td>
        <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.recommended" @change="(e) => updateRow(e.target.checked, 'recommended')" /></td>
        <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
        <td class="minimal"><BaseButtonDelete class="btn-xs btn-danger" :confirmation="true" @confirm="deleteRow();" /></td>
      </tr>
    </template>
    <template #footer="{deleteRows, exportRows, selectedCount, disabledControls, selectedQuery, resetSelect}">
      <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" :url="url" :page="page" :on-page="onPage" :filters="filters" @change-page="emit('update:page', $event)" @change-on-page="emit('update:onPage', $event); page = 1;">
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


import type {GridOrder} from '~/composables/useTableVars';

const url: string = 'eshop/delivery-type?expand=defaultDisplayDelivery,allowedPaymentTypes';
//const url: string = 'eshop/delivery-type?expand=defaultDisplayDelivery.,allowedPaymentTypes';

const { settings } = useUser();

const emit = defineEmits(['update:page', 'update:onPage', 'update:order']);


withDefaults(defineProps<{
  filters?: any
  lang: string,
  currency: string,
  page: number,
  onPage: number,
  order: GridOrder,
}>(), { filters: {}  });

const defaultFormData = {recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}};
const formData: any = ref(Object.assign({}, defaultFormData));

function setDefaults()
{
  formData.value = defaultFormData;
}




</script>