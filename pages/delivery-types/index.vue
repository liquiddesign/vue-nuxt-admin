<template>
  <BasePageHeader title="Typy dopravy" icon="pe-7s-car" description="Administrace možných doprav vašeho zboží">
    <BaseButtonNew class="btn-sm" @click="navigateTo({ name: 'delivery-types-new'})">Přidat dopravu</BaseButtonNew>
  </BasePageHeader>

  <BaseCard wrap="col-lg-12">
    <template #headerLeft>

      <BaseFilter @cancel="filters={}">
        <BaseLanguageDropdown class="me-1" :lang="lang" :langs="langs" @select="lang=$event" />
        <BaseTextBox v-model="filters.q" wrap="flex-shrink-0" :placeholder="'Název (' + lang + '), kód, #id'" type="text" />
      </BaseFilter>
    </template>
    <template #headerRight>
      <BaseCurrencyDropdown class="me-2" :currency="currency" :currencies="currencies" @select="currency=$event;" />
    </template>
    <BaseGrid ref="grid" url="delivery-type" :page="page" :on-page="onPage" :filters="filters" :params="{currency: currency, lang: lang}">
      <template #header>
        <tr>
          <BaseGridThSelect />
          <BaseGridTh class="minimal" order-by="id">#</BaseGridTh>
          <BaseGridTh></BaseGridTh>
          <BaseGridTh class="minimal" order-by="code">Kód</BaseGridTh>
          <BaseGridTh></BaseGridTh>
          <BaseGridTh order-by="name"><BaseFlag :lang="lang" /> Název</BaseGridTh>
          <BaseGridTh class="number">Min. cena</BaseGridTh>
          <BaseGridTh class="number">Max. cena</BaseGridTh>
          <BaseGridTh class="minimal" order-by="priority">Priorita</BaseGridTh>
          <BaseGridTh class="minimal" order-by="recommended"><i class="fa fa-thumbs-o-up"></i></BaseGridTh>
          <BaseGridTh class="minimal" order-by="hidden"><i class="fa fa-eye-slash"></i></BaseGridTh>
          <BaseGridTh><BaseGridThSettings /></BaseGridTh>
        </tr>
      </template>
      <template #body="{item, selected, deleteRow, updateRow}">
        <tr :class="{'inactive': item.hidden, 'active': selected}">
          <BaseGridTdSelect :id="item.uuid" />
          <td class="minimal">{{ item.id }}</td>
          <td class="minimal"><BaseButtonEdit class="btn-xs" @click="navigateTo({name: 'delivery-types-id', params: { id: item.uuid }})"/></td>
          <td class="minimal">{{ item.code }}</td>
          <td class="minimal"><img height="20" src="https://w7.pngwing.com/pngs/130/549/png-transparent-ppl-pakket-servicepunt-dhl-express-logo-others-blue-text-service-thumbnail.png" /></td>
          <td>{{ item.name[lang] }}</td>
          <td class="number">{{ $price(item.minPrice, currency) }}</td>
          <td class="number">{{ $price(item.maxPrice, currency) }}</td>
          <td class="minimal"><BaseTextBox v-model="item.priority" type="number" class="form-control-xs" style="width: 50px;" @change="(e) => updateRow(parseInt(e.target.value), 'priority')" /></td>
          <td class="minimal"><BaseCheckBox v-model="item.recommended" @change="(e) => updateRow(e.target.checked, 'recommended')" /></td>
          <td class="minimal"><BaseCheckBox v-model="item.hidden" @change="(e) => updateRow(e.target.checked, 'hidden')" /></td>
          <td class="minimal"><BaseButtonDelete class="btn-xs" :confirmation="true" @confirm="deleteRow();" /></td>
        </tr>
      </template>
      <template #footer="{deleteRows, exportRows, selectedCount, disabledControls, selectedQuery, resetSelect}">
        <BaseGridSelectAll wrap="flex-shrink-0 me-1 ms-1" />
        <BaseGridPaginator v-slot="{ totalCount }" wrap="flex-shrink-0" url="delivery-type" :page="page" :on-page="onPage" :filters="filters" @change-page="page = $event" @change-on-page="onPage = $event; page = 1;">
          <BaseButtonEdit class="btn-paging" :outline="true" :disabled="disabledControls" @click="$refs.modalUpdate.open();">({{ selectedCount(totalCount) }})</BaseButtonEdit>
          <BaseButtonExport class="btn-paging" :outline="true" :disabled="disabledControls" @click="exportRows();">({{ selectedCount(totalCount) }})</BaseButtonExport>
          <BaseButtonDelete class="btn-paging" :outline="true" :disabled="disabledControls" :confirmation="true" @confirm="deleteRows();">({{ selectedCount(totalCount) }})</BaseButtonDelete>
          <BaseModal ref="modalUpdate" :title="'Hromadná úprava (celkem ' + selectedCount(totalCount) + ')'">
            <BaseForm ref="form" method="PATCH" :input="formData" :url="'delivery-type' + selectedQuery" :params="filters" @success="setDefaults(); resetSelect(); $refs.grid.refresh();">
              <div class="row">
                <BaseCheckBox label="Skrytý" name="recommended.value" wrap="col-lg-6 pt-1" :disabled="formData.recommended.strategy === 'noAction'" />
                <BaseSelect name="recommended.strategy" :class="{'border-success': formData.recommended.strategy !== 'noAction'}" :options="{noAction: 'původní', replace: 'nahradit'}" wrap="col-lg-6"  />
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
  </BaseCard>

</template>
<script setup lang="ts">
import {ToastPluginApi, useToast} from "vue-toast-notification";

const { $price } = useNuxtApp()

const filters: any = ref({});
const defaultFormData = {recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}};
const formData: any = ref({recommended: {strategy: 'noAction', value: false}, hidden: {strategy: 'noAction', value: false}});
const page = ref(1);
const onPage = ref(20);
const lang = ref('cs');
const currency = ref('CZK');
const currencies = ref(['CZK', 'EUR','USD']);
const langs = ref(['cs', 'en']);
const toast: ToastPluginApi = inject('toast', useToast());

function setDefaults()
{
  Object.assign(formData.value.recommended, defaultFormData.recommended);
  Object.assign(formData.value.hidden, defaultFormData.hidden);
}

</script>