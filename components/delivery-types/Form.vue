<template>
  <BaseForm ref="form" :url="url" :lang="lang" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$refs?.imageBox?.upload($event.result); $emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <BaseAlert v-if="data?.prices?.length === 0" wrap="col-lg-12" type="warning" icon="CircleAlert">
        K této dopravě neexistuje žádný ceník. Doprava tedy nebude zobrazena
      </BaseAlert>
      <div class="col-lg-6">
        <slot name="top" />
        <div class="row">
          <BaseTextBoxLocale name="name" wrap="col-lg-8" label="Název" type="text" />
          <div class="col-lg-4">
            <label>Kód</label>
            <div class="input-group">
              <BaseTextBox name="code" />
              <BaseButton wrap="input-group-append" type="button" class="btn-sm btn-outline-primary text-center"><BaseIcon icon-name="RefreshCw" :size="16" :stroke-width="2" style="vertical-align: sub;" /></BaseButton>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <BaseTextBox name="trackingLink" wrap="col-lg-10" label="Odkaz pro sledování zásilky" placeholder="Vložte odkaz na službu, kde může zákazník vidět reálný stav doručení" type="text" />
          <BaseTextBox name="priority" wrap="col-lg-2" label="Priorita" type="number" />
        </div>
        <div class="form-wrapper-light mt-3">
          <h5 class="card-title">Obrázky</h5>
          <div class="row mt-2">
            <div class="col-lg-6">
              <label>Logo dopravce</label>
              <BaseImageBox ref="imageBox" url="delivery-types" :slug="slug" action="image" :directory="`delivery-type/${slug}/thumbs`" :testx="data?.imageFileName" :files="!data?.imageFileName ? [] : [data?.imageFileName]" />
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <BaseTextAreaLocale name="perex" wrap="col-lg-12" label="Popis při výběru dopravy" type="text" rows="4" />
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale name="instructions" wrap="col-lg-12" label="Instrukce (např. do emailu)" type="text" rows="4" />
        </div>

        <div class="form-wrapper-blue mt-3">
          <h5 class="card-title">Maximalní rozměry a váha na balík</h5>
          <div class="row">
            <BaseTextBox name="maxWidth" wrap="col-lg-4" label="Šírka" type="number" placeholder="nelimitovat" :nullable="true" />
            <BaseTextBox name="maxLength" wrap="col-lg-4" label="Délka" type="number" placeholder="nelimitovat" :nullable="true" />
            <BaseTextBox name="maxDepth" wrap="col-lg-4" label="Hloubka" type="number" placeholder="nelimitovat" :nullable="true" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="maxWeight" wrap="col-lg-4" :label="`Váha ()`" placeholder="nelimitovat" type="number" :nullable="true" />
          </div>
          <br>
          <BaseFormRowInfo>Pokud bude některá z jednotek překročena. Bude zásilka rozdělena na více balíků.</BaseFormRowInfo>
        </div>
        <div class="row mt-2">
          <BaseMultiSelect name="defaultDisplayDelivery" wrap="col-lg-6" label="Výchozí zobrazované doručení" options-url="eshop/display-delivery?property=label" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseMultiSelect name="exclusive" wrap="col-lg-6" label="Exkluzivní pro skupinu uživatelů" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect name="pickupPointType" wrap="col-lg-6" label="Typ výdejních míst" options-url="eshop/pickup-point-type?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseMultiSelect name="allowedPaymentTypes" wrap="col-lg-6" :multiple="true" label="Povolené typy plateb" options-url="eshop/payment-type?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
        <div class="row mt-3">
          <div class="d-flex gap-3">
            <BaseCheckBox name="recommended" label="Doporučeno" wrap="flex-shrink-0" />
            <BaseCheckBox name="hidden" label="Skryto" wrap="flex-shrink-0" />
            <BaseCheckBox name="externalCarrier" label="Externí dopravce" wrap="flex-shrink-0" />
          </div>
        </div>
        <div class="form-wrapper-blue mt-3">
          <h5 class="card-title mt-2">Externí ID</h5>
          <div class="row mt-2">
            <BaseTextBox name="externalId" wrap="col-lg-6" label="Obecné" type="text" />
            <BaseTextBox name="externalIdHeureka" wrap="col-lg-6" label="Heuréka.cz" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="externalIdZbozi" wrap="col-lg-6" label="Zboží.cz" type="text" />
          </div>
          <div class="row mt-3">
            <BaseCheckBox name="exportToFeed" label="Poskytovat v XML feedech" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </div>
      <div class="col-lg-6 ps-5">
        <h5 class="card-title">Ceník</h5>
        <div v-if="data?.deliveryTypePrices" class="form-wrapper-light mt-3">
          <template v-for="(price, index) in data.deliveryTypePrices" :key="index">
            <div class="row">
              <BaseTextBox :name="`deliveryTypePrices.${index}.price`" :validation-errors="pricesErrors?.[index].price" wrap="col-lg-3" label="Cena" type="number" @change="price.priceVat = Math.round(parseInt(price.price) * 1.21)" />
              <BaseTextBox :name="`deliveryTypePrices.${index}.priceVat`" :validation-errors="pricesErrors?.[index].priceVat" wrap="col-lg-3" label="Cena" type="number" />
              <BaseMultiSelect :name="`deliveryTypePrices.${index}.currency`" wrap="col-lg-2" label="Měna" :options="currencies" />
              <div class="col-lg-1">
                <label>&nbsp;</label><br>
                <BaseButtonDelete class="btn btn-sm btn-outline-danger me-2" @click="data.deliveryTypePrices.splice(index, 1);" />
              </div>
            </div>
            <div class="row mt-2">
              <BaseCheckBox v-model="limitPriceList[index]" label="Limitovat na max. váhu nebo rozměr" @change="data.deliveryTypePrices[index].weightTo = null; data.deliveryTypePrices[index].dimensionTo = null;" />
              <template v-if="limitPriceList[index]">
                <BaseTextBox :name="`deliveryTypePrices.${index}.weightTo`" wrap="col-lg-3" label="Dostupné do váhy" placeholder="nelimitovat" type="float" :nullable="true" />
                <BaseTextBox :name="`deliveryTypePrices.${index}.dimensionTo`" wrap="col-lg-3" label="Dostupné do rozměru" placeholder="nelimitovat" type="float" :nullable="true" />
              </template>
            </div>
            <hr class="pt-1" style="color: white">
          </template>
          <div class="mt-3">
            <button class="btn btn-sm btn-outline-secondary me-2" @click="data.deliveryTypePrices.push({deliveryType: slug, price: null,currency: 'CZK', country: 'CZ'});"><BaseIcon icon-name="Plus" /></button>
          </div>
        </div>
      </div>
    </div>
  </BaseForm>
</template>

 <script setup lang="ts">

 import {required, helpers} from '@vuelidate/validators';
 import {RouteParamValue} from 'vue-router';
 import BaseAlert from '~/components/BaseAlert.vue';


 const props = withDefaults(defineProps<{
   url: string,
   data: any,
   lang: string,
   loading?: boolean,
   slug?: string|RouteParamValue[],
 }>(), { loading: false, slug: undefined });

 const rules = {
   priority: { required },
   code: { required },
   name: {
     cs: {required},
   },
   deliveryTypePrices: {
     $each: helpers.forEach({
       price: {
         required,
       },
       priceVat: {
         required,
       },
     }),
   },
 };

 const { currencies } = usePrefetchedData();


 const form = ref(null);
 const goBack: Ref<boolean> = ref(false);
 const limitPriceList: Ref<any> = ref({});

 watch(() => props.data?.deliveryTypePrices, (value) => {
   let i:number = 0;
   value.forEach((val: any) => {
     if (val.weightTo || val.dimensionTo) {
       limitPriceList.value[i] = true;
     }
     i++;
   });
 });

 const pricesErrors = computed(() => {
   return form.value?.v$?.deliveryTypePrices?.$each?.$response?.$errors;
 });

 function submit()
 {
   form.value?.submit();
 }


 const $emit = defineEmits(['success']);
 defineExpose({ submit } );

 </script>