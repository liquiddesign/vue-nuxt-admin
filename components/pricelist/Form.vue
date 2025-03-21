<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-4">
        <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
        <div class="row">
          <BaseTextBox wrap="col-lg-8" name="name" label="Název" type="text" />
          <BaseTextBox wrap="col-lg-4" name="code" label="Kód" type="text" />
        </div>

        <div class="row mt-2">
          <BaseTextArea wrap="col-lg-12" name="description" label="Popis" />
        </div>

        <div class="form-wrapper-light mt-3">
          <div class="row">
            <BaseMultiSelect wrap="col-lg-4" name="currency" label="Měna" options-url="eshop/currency?property=code" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
            <BaseMultiSelect wrap="col-lg-8" name="country" label="Země DPH" options-url="eshop/country?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          </div>

          <div class="row mt-2">
            <BaseMultiSelect wrap="col-lg-8" name="discounts" label="Akce" :multiple="true" options-url="eshop/discount?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
            <BaseTextBox wrap="col-lg-4" name="priority" label="Priorita" type="number" />
          </div>

          <div class="row mt-3">
            <BaseCheckBox name="allowDiscountLevel" wrap="col-lg-6"> Povolit procentuální slevy </BaseCheckBox>
          </div>
          <div class="col-lg-12 mt-2">
            <BaseFormRowInfo>
              Aplikuje se vždy největší z čtveřice: procentuální slevy produktu, procentuální slevy zákazníka, slevy věrnostního programu zákazníka nebo slevového kupónu.
              <br> Pokud je povoleno, aplikuje zmíněnou procentuální slevu. Jinak aplikuje pouze slevu v rámci cen v aktivních ceníkách.
            </BaseFormRowInfo>
          </div>

          <div class="row mt-3">
            <BaseCheckBox name="isActive" wrap="col-lg-6"> Aktivní </BaseCheckBox>
          </div>
        </div>

        <div class="row mt-3">
          <BaseTextBox wrap="col-lg-12" name="customLabel" label="Vlastní štítek" type="text" />
          <div class="col-lg-12 mt-2">
            <BaseFormRowInfo>Použitý při exportu XML produktů pro Google jako "custom_label_1".</BaseFormRowInfo>
          </div>
          <BaseMultiSelect wrap="col-lg-12 mt-2" name="internalRibbons" label="Interní štítky" :multiple="true" options-url="eshop/internal-ribbon?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseTextBox wrap="col-lg-12 mt-2" name="lastUpdateTs" label="Poslední aktualizace" type="date" />
        </div>

        <div class="row mt-3">
          <div class="">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </div>

      <div class="col-lg-8 ps-5">
        <!--        <h5 class="card-title">CENY</h5>-->
        <div class="row d-flex justify-content-between">
          <div class="col-xl-6 col-lg-12">
            <BaseTabs :active="activeTab" :tabs="{'price': 'Ceny ceníku', 'quantity-price': 'Množstevní ceny ceníku'}" @select="activeTab = $event" />
          </div>
          <div class="col-lg-1">
            <BaseButtonFilter type="button" class="btn-sm btn-outline-primary" :show-filters="showFilters" @click="showFilters = !showFilters" />
          </div>
        </div>


        <template v-if="activeTab === 'price'">
          <PriceTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" :show-filters="showFilters" />
        </template>

        <template v-if="activeTab === 'quantity-price'">
          <QuantityPriceTableFilter v-model="filters" class="mb-2" @clear="clearFilters" />
          <QuantityPriceTable v-model:page="page" v-model:on-page="onPage" v-model:order="order" :filters="filters" />
        </template>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">
import {RouteParamValue} from 'vue-router';
import {required} from '@vuelidate/validators';

withDefaults(defineProps<{
  url: string,
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);
const { filters, showFilters, clearFilters, page, onPage, order } = useTableVars();

const rules = {
  name: {required},
  code: {required},
  priority: {required},
};

const activeTab: Ref<string> = ref('price');

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>