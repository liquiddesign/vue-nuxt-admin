<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="navigateTo({name: 'delivery-types'})" />
      <BaseLanguageList :langs="langs" :lang="lang" @select="lang = $event" />
    </template>
    <template #headerRight>
      <BaseButtonExternalLink :wide="true" class="me-1" />
      <BaseDropdown class="btn-outline-primary me-1" icon="fa-bolt">
        <BaseDropdownItem>Vytvořit kopii</BaseDropdownItem>
      </BaseDropdown>
      <BaseButtonSave :wide="true" class="btn-sm me-1" @click="deleteItem" />
      <BaseButtonDelete :outline="true" :wide="true" class="btn-sm" @click="deleteItem()" />
    </template>

    <template #body>
      <div class="row">
        <BaseForm ref="form" wrap="col-lg-6" url="delivery-type" :lang="lang" :input="input" :rules="rules" @success="success">
          <BaseTextBox name="test.0.price" />
          <BaseTextBox name="test.1.price" />
          <BaseTextBox name="test.2.price" />
          <h5 class="card-title">Nová doprava</h5>
          <div class="row">
            <BaseTextBoxLocale name="name" wrap="col-lg-8" label="Název" type="text" />
            <div class="col-lg-4">
              <label>Kód</label>
              <div class="input-group">
                <BaseTextBox name="code" />
                <BaseButton wrap="input-group-append" type="button" class="btn-sm btn-outline-primary"><i class="fa fa-refresh" /></BaseButton>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <BaseTextBox name="trackingLink" wrap="col-lg-10" label="Odkaz pro sledování zásilky" type="text" />
            <BaseTextBox name="priority" wrap="col-lg-2" label="Priorita" type="number" />
          </div>
          <div class="row mt-2">
            <BaseMultiSelect name="defaultDisplayDelivery" wrap="col-lg-6" label="Výchozí zobrazované doručení" options-url="display-delivery" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
            <BaseMultiSelect name="exclusive" wrap="col-lg-6" label="Exkluzivní pro skupinu uživatelů" options-url="customer-group" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
          </div>
          <div class="row mt-2">
            <BaseMultiSelect name="pickupPointType" wrap="col-lg-6" label="Typ výdejních míst" options-url="pickup-point-type" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
            <BaseMultiSelect name="allowedPaymentTypes" wrap="col-lg-6" :multiple="true" label="Povolené typy plateb" options-url="payment-type" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
          </div>
          <div class="row mt-3">
            <div class="d-flex gap-3">
              <BaseCheckBox name="recommended" label="Doporučeno" wrap="flex-shrink-0" />
              <BaseCheckBox name="hidden" label="Skryto" wrap="flex-shrink-0" />
              <BaseCheckBox name="externalCarrier" label="Externí dopravce" wrap="flex-shrink-0" />
            </div>
          </div>
          <div class="form-wrapper-blue mt-3">
            <h5 class="card-title">Maximalní rozměry a váha na přepravu</h5>
            <div class="row">
              <BaseTextBox name="maxWidth" wrap="col-lg-4" label="Šírka" type="number" :nullable="true" />
              <BaseTextBox name="maxLength" wrap="col-lg-4" label="Délka" type="number" :nullable="true" />
              <BaseTextBox name="maxDepth" wrap="col-lg-4" label="Hloubka" type="number" :nullable="true" />
            </div>
            <div class="row mt-2">
              <BaseTextBox name="maxWeight" wrap="col-lg-4" label="Váha" type="number" :nullable="true" />
            </div>
          </div>
          <div class="row mt-2">
            <BaseTextAreaLocale name="perex" wrap="col-lg-12" label="Perex" type="text" rows="4" />
          </div>
          <div class="row mt-2">
            <BaseTextAreaLocale name="instructions" wrap="col-lg-12" label="Instrukce (např. do emailu)" type="text" rows="4" />
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
              <BaseFormButton class="btn-success btn-sm me-1" @click="goBack=true;">Uložit</BaseFormButton>
              <BaseFormButton class="btn-outline-primary btn-sm" @click="goBack=false;">Uložit a pokračovat</BaseFormButton>
            </div>
          </div>
        </BaseForm>
        <div class="col-lg-6 ps-5">
          <h5 class="card-title">Ceník</h5>
          <div class="form-wrapper-light mt-3">
            <template v-for="(price, index) in input.prices" :key="index">
              <div class="row">
                <BaseTextBox v-model="price.price" name="price" wrap="col-lg-3" label="Cena bez DPH" type="number" @change="price.priceVat = Math.round(parseInt(price.price) * 1.21)" />
                <BaseTextBox v-model="price.priceVat" wrap="col-lg-3" label="Cena s DPH" type="number" @change="price.price = Math.round(parseInt(price.priceVat) / 1.21)" />
                <BaseMultiSelect v-model="price.currency" wrap="col-lg-3" label="Měna" options-url="currency" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
              </div>
              <div class="row mt-2">
                <BaseTextBox v-model="price.weightTo" wrap="col-lg-3" label="Dostupné do váhy" type="float" :nullable="true" />
                <BaseTextBox v-model="price.dimensionTo" wrap="col-lg-3" label="Dostupné do rozměru" type="float" :nullable="true" />
                <div class="col-lg-4">
                  <label>&nbsp;</label><br>
                  <button class="btn btn-sm btn-outline-danger me-2" @click="input.prices.splice(index, 1);"><i class="fa fa-trash-o" /></button>
                </div>
              </div>
              <hr class="pt-1" style="color: white">
            </template>
            <div class="mt-3">
              <button class="btn btn-sm btn-outline-secondary me-2" @click="input.prices.push({currency: 'CZK'})"><i class="fa fa-plus" /></button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {required, helpers} from '@vuelidate/validators';

const toast: ToastPluginApi = inject('toast', useToast());

const lang = ref('cs');
const langs = ref(['cs', 'en']);


const input:any = ref({ priority: 0, externalCarrier: true, prices: [{ currency: 'CZK'}]});

const rules = {
  priority: { required },
  code: { required },
  name: {
    cs: {
      required,
    },
  },
  test: {
    $each: helpers.forEach({
      price: {
        required,
      },
    }),
  },
};


function success() {

  //const mouse = useFetch('https://api.nuxtjs.dev/api/eshop-producer');
  //dataTest.value = mouse.data;
}

function deleteItem() {
  alert('mazu');
}


</script>