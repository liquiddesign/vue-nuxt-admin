<script setup lang="ts">
import {RouteParamValue} from 'vue-router';
import {required} from '@vuelidate/validators';

withDefaults(defineProps<{
  url: string,
  data: any,
  lang: string,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);

const rules = {
  priority: {required},
  code: {required},
  name: {
    cs: {required},
  },
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>

<template>
  <BaseForm ref="form" :url="url" :lang="lang" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$refs?.imageBox?.upload($event.result); $emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
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
          <BaseTextBox name="comgateMethod" wrap="col-lg-10" label="Polovené metody pro Comgate" placeholder="Zadejte povolené metody plateb" type="text" />
          <BaseTextBox name="priority" wrap="col-lg-2" label="Priorita" type="number" />
        </div>

        <div class="form-wrapper-light mt-3">
          <div class="row mt-2">
            <div class="col-lg-6">
              <label>Obrázek</label>
<!--              <BaseImageBox ref="imageBox" url="payment-type" :slug="slug" action="image" :directory="`https://www.abel.cz//userfiles/paymenttype_images/thumb/` + data?.imageFileName" :testx="data?.imageFileName" :files="!data?.imageFileName ? [] : [data?.imageFileName]" />-->
              <BaseImageBox ref="imageBox" url="payment-type" :slug="slug" action="image" :directory="''" :testx="data?.imageFileName" :files="!data?.imageFileName ? [] : [data?.imageFileName]" />
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <BaseTextAreaLocale name="perex" wrap="col-lg-12" label="Popis" type="text" rows="4" />
        </div>
        <div class="row mt-2">
          <BaseTextAreaLocale name="instructions" wrap="col-lg-12" label="Instrukce" type="text" rows="4" />
        </div>

        <div class="row mt-2">
          <BaseMultiSelect name="exclusive" label="Exkluzivní pro skupinu zákazníků" wrap="col-lg-6 flex-shrink-0" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
        <div class="row mt-2">
          <div class="d-flex gap-3">
            <BaseCheckBox name="recommended" label="Doporučeno" wrap="flex-shrink-0" />
            <BaseCheckBox name="hidden" label="Skryto" wrap="flex-shrink-0" />
          </div>
        </div>
      </div>
      <div class="col-lg-6 ">
        <div class="row form-wrapper-blue">
          <div class="col-lg-6">
            <h5 class="card-title">EXTERNÍ ID</h5>
            <BaseTextBox name="externalId" wrap="row mt-2 flex-nowrap" label="Externí ID: Obecné" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: Default" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: AGEM.CZ" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: Arles" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: ASBIS" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: AT Computers" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: BHC" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: eD system" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: FAST s.r.o." type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: LAMA" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: Starý eshop" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: QI" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: QIAll" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: TONERCENTRUM" type="text" />
            <BaseTextBox name="externalId " wrap="row mt-2 flex-nowrap" label="Externí ID: TechData" type="text" />
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-lg-6">
          <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
          <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
        </div>
      </div>
    </div>
  </BaseForm>
</template>