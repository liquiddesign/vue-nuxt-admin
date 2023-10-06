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
      <BaseButtonSave @click="deleteItem"  :wide="true" class="btn-sm me-1" />
      <BaseButtonDelete @click="deleteItem()" :outline="true" :wide="true" class="btn-sm"  />
    </template>

    <template #body>
      <div class="row">
      <BaseForm ref="form" wrap="col-lg-6" url="customer" :lang="lang" :input="input" :rules="rules" @success="success">
        <h5 class="card-title">Nová doprava</h5>
        <div class="row">
          <BaseTextBoxLocale name="name" wrap="col-lg-8" label="Název" type="text" />
          <div class="col-lg-4">
            <label>Kód</label>
            <div class="input-group">
              <BaseTextBox name="code" />
              <BaseButton wrap="input-group-append" type="button" class="btn-sm btn-outline-primary"><i class="fa fa-refresh"></i></BaseButton>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <BaseTextBox name="trackingLink" wrap="col-lg-10" label="Odkaz pro sledování zásilky" type="text" />
          <BaseTextBox name="priority" wrap="col-lg-2" label="Priorita" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="defaultDisplayDelivery" wrap="col-lg-6" label="Výchozí zobrazované doručení" type="text" />
          <BaseTextBox name="exclusive" wrap="col-lg-6" label="Exkluzivní pro skupinu uživatelů" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="pickupPointType" wrap="col-lg-6" label="Typ výdejních míst" type="text" />
          <BaseTextBox name="allowedPaymentTypes" wrap="col-lg-6" label="Povolené typy plateb" type="text" />
        </div>
        <div class="row mt-3">
          <div class="d-flex gap-3">
            <BaseCheckBox name="recommended" label="Doporučení" wrap="flex-shrink-0" />
            <BaseCheckBox name="hidden" label="Skryto" wrap="flex-shrink-0" />
            <BaseCheckBox name="externalCarrier" label="Externí dopravce" wrap="flex-shrink-0" />
          </div>
        </div>
        <div class="form-wrapper-blue mt-3">
            <h5 class="card-title">Maximalní rozměry a váha na přepravu</h5>
          <div class="row">
            <BaseTextBox name="maxWidth" wrap="col-lg-4" label="Šírka" type="text" />
            <BaseTextBox name="maxLength" wrap="col-lg-4" label="Délka" type="text" />
            <BaseTextBox name="maxDepth" wrap="col-lg-4" label="Hloubka" type="text" />
          </div>
            <div class="row mt-2">
              <BaseTextBox name="maxWeight" wrap="col-lg-4" label="Váha" type="text" />
            </div>
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale name="perex" wrap="col-lg-12" label="Perex" type="text" rows="4" />
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale name="text" wrap="col-lg-12" label="Instrukce (např. do emailu)" type="text" rows="4" />
        </div>
        <div class="form-wrapper-blue mt-3">


          <h5 class="card-title mt-2">Externí ID</h5>
        <div class="row mt-2">
          <BaseTextBox name="externalId" wrap="col-lg-6" label="Obecné" type="text" />
          <BaseTextBox name="externalIdHeureka" wrap="col-lg-6" label="Heuréka.cz" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="externalIdZbozi" wrap="col-lg-6" label="Zboží.cz" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Pohoda" type="text" />
        </div>
          <div class="row mt-3">
          <BaseCheckBox v-model="isCompany" label="Poskytovat v XML feedech" />
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

          <div class="row">
            <BaseTextBox v-model="input.price" name="price" wrap="col-lg-3" label="Cena" type="number" @change="input.priceVat = Math.round(parseInt(input.price) * 1.21)" />
            <BaseTextBox v-model="input.priceVat" wrap="col-lg-3" label="Cena s DPH" type="number" @change="input.price = Math.round(parseInt(input.priceVat) / 1.21)" />
            <BaseMultiSelect wrap="col-lg-3" label="Měna" v-model="input.currency" options-url="currency" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="phone" wrap="col-lg-3" label="Dostupné do váhy" type="text" />
            <BaseTextBox name="email" wrap="col-lg-3" label="Dostupné do rozměru" type="text" />
            <div class="col-lg-4">
              <label>&nbsp;</label><br>
              <button class="btn btn-sm btn-outline-danger me-2"><i class="fa fa-trash-o" /></button>
            </div>
          </div>
          <hr class="pt-1" style="color: white">
          <div class="row">
            <BaseTextBox v-model="input.price" name="price" wrap="col-lg-3" label="Cena" type="number" @change="input.priceVat = Math.round(parseInt(input.price) * 1.21)" />
            <BaseTextBox v-model="input.priceVat" wrap="col-lg-3" label="Cena s DPH" type="number" @change="input.price = Math.round(parseInt(input.priceVat) / 1.21)" />
            <BaseMultiSelect wrap="col-lg-3" label="Měna" v-model="input.currency" options-url="currency" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="phone" wrap="col-lg-3" label="Dostupné do váhy" type="text" />
            <BaseTextBox name="email" wrap="col-lg-3" label="Dostupné do rozměru" type="text" />
            <div class="col-lg-4">
              <label>&nbsp;</label><br>
              <button class="btn btn-sm btn-outline-danger me-2"><i class="fa fa-trash-o" /></button>
            </div>
          </div>
          <div class="mt-3">
            <button class="btn btn-sm btn-outline-secondary me-2"><i class="fa fa-plus" /></button>
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
import {required} from "@vuelidate/validators";

const toast: ToastPluginApi = inject('toast', useToast());

const lang = ref('cs');
const langs = ref(['cs', 'en']);


const input:any = ref({ });

const rules = {
  name: { cs: {required} , en: {required} },
  priority: { required },
  code: { required },
};


function success() {

  //const mouse = useFetch('https://api.nuxtjs.dev/api/eshop-producer');
  //dataTest.value = mouse.data;

  toast.success('uloženo');
}

function deleteItem() {
  alert('mazu');
}


</script>