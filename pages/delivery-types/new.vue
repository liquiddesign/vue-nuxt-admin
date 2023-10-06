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
        <div class="row">
          <BaseTextBoxLocale name="name" wrap="col-lg-8" label="Název" type="text" />
          <div class="col-lg-4">
            <label>Kód</label>
            <div class="input-group">
              <input type="text" class="form-control form-control-sm">
              <div class="input-group-append">
                <button class="btn btn-sm btn-outline-primary"><i class="fa fa-refresh"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <BaseTextBox name="ic" wrap="col-lg-10" label="Odkaz pro sledování zásilky" type="text" />
          <BaseTextBox name="company" wrap="col-lg-2" label="Priorita" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="ic" wrap="col-lg-6" label="Výchozí zobrazované doručení" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Exkluzivní pro skupinu uživatelů" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="ic" wrap="col-lg-6" label="Typ výdejních míst" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Povolené typy plateb" type="text" />
        </div>
        <div class="form-wrapper-blue mt-3">
            <h5 class="card-title">Maximalní rozměry a váha na přepravu</h5>
          <div class="row">
            <BaseTextBox name="ic" wrap="col-lg-4" label="IC" type="text" />
            <BaseTextBox name="company" wrap="col-lg-4" label="Company" type="text" />
            <BaseTextBox name="company" wrap="col-lg-4" label="Company" type="text" />
          </div>
            <div class="row mt-2">
              <BaseTextBox name="ic" wrap="col-lg-4" label="IC" type="text" />
            </div>
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale name="ic" wrap="col-lg-12" label="Perex" type="text" rows="4" />
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale name="ic" wrap="col-lg-12" label="Instrukce (např. do emailu)" type="text" rows="4" />
        </div>
        <div class="form-wrapper-blue mt-3">


          <h5 class="card-title mt-2">Externí ID</h5>
        <div class="row mt-2">
          <BaseTextBox name="ic" wrap="col-lg-6" label="Obecné" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Heuréka.cz" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="ic" wrap="col-lg-6" label="Zboží.cz" type="text" />
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
            <BaseTextBox name="phone" wrap="col-lg-4" label="Cena" type="text" />
            <BaseTextBox name="email" wrap="col-lg-4" label="Cena s DPH" type="text" />
            <BaseTextBox name="email" wrap="col-lg-2" label="Měna" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="phone" wrap="col-lg-4" label="Dostupné do váhy" type="text" />
            <BaseTextBox name="email" wrap="col-lg-4" label="Dostupné do rozměru" type="text" />
            <div class="col-lg-4">
              <label>&nbsp;</label><br>
              <button class="btn btn-sm btn-outline-secondary me-2"><i class="fa fa-trash-o" /></button>
            </div>
          </div>
          <hr class="pt-1" style="color: white">
          <div class="row">
            <BaseTextBox name="phone" wrap="col-lg-4" label="Cena" type="text" />
            <BaseTextBox name="email" wrap="col-lg-4" label="Cena s DPH" type="text" />
            <BaseTextBox name="email" wrap="col-lg-2" label="Měna" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox name="phone" wrap="col-lg-4" label="Dostupné do váhy" type="text" />
            <BaseTextBox name="email" wrap="col-lg-4" label="Dostupné do rozměru" type="text" />
            <div class="col-lg-4">
              <label>&nbsp;</label><br>
              <button class="btn btn-sm btn-outline-secondary me-2"><i class="fa fa-trash-o" /></button>
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
import Editor from '@tinymce/tinymce-vue';

const toast: ToastPluginApi = inject('toast', useToast());

const lang = ref('cs');
const langs = ref(['cs', 'en']);


const input:any = ref({ });

const rules = {
  login: { required },
  password: { required },
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