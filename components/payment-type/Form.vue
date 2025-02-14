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

        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </div>

      <div class="col-lg-6 ps-5">
        <h5 class="card-title">Ceník</h5>
        <div v-if="data?.paymentTypePrices" class="form-wrapper-light mt-3">
          <template v-for="(price, index) in data.paymentTypePrices" :key="index">
            <div class="row">
              <BaseCurrencyInput :name="`paymentTypePrices.${index}.price`" wrap="col-lg-3" label="Cena" :currency="currency" :precision="2" :min="0" />
              <BaseCurrencyInput :name="`paymentTypePrices.${index}.priceVat`" wrap="col-lg-3" label="Cena s DPH" :currency="currency" :precision="2" :min="0" />
<!--              <BaseTextBox :name="`paymentTypePrices.${index}.price`" :validation-errors="pricesErrors?.[index].price" wrap="col-lg-3" label="Cena" type="number" @change="price.priceVat = Math.round(parseInt(price.price) * 1.21)" />-->
<!--              <BaseTextBox :name="`paymentTypePrices.${index}.priceVat`" :validation-errors="pricesErrors?.[index].priceVat" wrap="col-lg-3" label="Cena s DPH" type="number" />-->
              <BaseMultiSelect v-model="currency" :name="`paymentTypePrices.${index}.currency`" wrap="col-lg-2" label="Měna" options-url="eshop/currency?property=code" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
              <div class="col-lg-1">
                <label>&nbsp;</label><br>
                <button class="btn btn-sm btn-outline-danger me-2" @click="data.paymentTypePrices.splice(index, 1);"><Trash2 :size="16" :stroke-width="2" /></button>
              </div>
            </div>
            <hr class="pt-1" style="color: white">
          </template>
          <div class="mt-3">
            <button class="btn btn-sm btn-outline-secondary me-2" @click="data.paymentTypePrices.push({paymentType: slug, price: null,currency: 'CZK', country: 'CZ'});"><i class="fa fa-plus" /></button>
          </div>
        </div>
        <div class="row form-wrapper-blue mt-3">
          <div class="col-lg-6">
            <h5 class="card-title">EXTERNÍ ID</h5>
            <BaseTextBox name="externalId" wrap="row mt-2 flex-nowrap" label="Obecné" type="text" />
            <template v-if="suppliers?.items">
              <template v-for="(item, index) in suppliers.items" :key="index">
                <BaseTextBox :name="item[item.code]" wrap="row mt-2 flex-nowrap" :label="item.name" type="text" />
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">
import {RouteParamValue} from 'vue-router';
import {helpers, required} from '@vuelidate/validators';
import { Trash2 } from 'lucide-vue-next';

withDefaults(defineProps<{
  url: string,
  data: any,
  lang: string,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);
const currency: Ref<string> = ref('CZK');
const { currencies } = usePrefetchedData();

const pricesErrors = computed(() => {
  return form.value?.v$?.paymentTypePrices?.$each?.$response?.$errors;
});

const {data: suppliers} = useApiFetch('eshop/supplier/');

const rules = {
  priority: {required},
  code: {required},
  name: {
    cs: {required},
  },
  paymentTypePrices: {
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

function submit()
{
  form.value?.submit();
}


const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>