<template>
  <BaseForm ref="form" url="currency" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <slot name="top" />
        <div class="row">
          <BaseTextBox name="name" wrap="col-lg-8" label="Název" type="text" />
          <BaseTextBox name="code" wrap="col-lg-4" label="Kód" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="symbol" wrap="col-lg-4" label="Symbol" type="text" />
          <BaseTextBox name="priority" wrap="col-lg-2" label="Priorita" type="text" />
        </div>
        <div class="row mt-3">
          <div class="d-flex gap-3">
            <BaseCheckBox name="recommended" label="Doporučeno" wrap="flex-shrink-0" />
            <BaseCheckBox name="hidden" label="Skryto" wrap="flex-shrink-0" />
          </div>
        </div>
        <div class="row mt-3">
          <BaseCheckBox name="isVirtual">Virtuální měna <small class="ps-1 text-secondary"><i class="fa fa-info-circle" /> Jako měnu můžete přidat například kredity nebo jiné alternativní jednotky</small></BaseCheckBox>
        </div>

        <div class="row mt-3">
          <BaseCheckBox name="cashback">Povolit odměny <small class="ps-1 text-secondary"><i class="fa fa-info-circle" /> U produktů budete moci nastavit výši odměny v této měně</small></BaseCheckBox>
        </div>
        <div class="form-wrapper-blue mt-3">
          <h5 class="card-title">Formát</h5>
          <div class="row">
            <BaseTextBox name="formatDecimals" wrap="col-lg-3" label="Počet desetinných míst" type="number" :nullable="true" />
            <BaseTextBox name="formatDecimalSeparator" wrap="col-lg-3" label="Oddělovač desetinných míst" :nullable="true" />
            <BaseTextBox name="formatThousandsSeparator" wrap="col-lg-3" label="Oddělovač tisícovek" :nullable="true" />
            <BaseSelect name="formatSymbolPosition" wrap="col-lg-3" label="Pozice symbolu" :options="{before: 'Před', after: 'Za'}" />
          </div>
          <br>
          <i class="fa fa-info-circle" /> Ukázka formátování: <span>2 981 543.01 Kč</span>
        </div>
        <h5 class="card-title mt-3">Konverze a přepočet</h5>
        <div class="row mt-2">
          <BaseTextBox name="convertRatio" wrap="col-lg-3" label="Kurz" type="float" :nullable="true" />
          <BaseMultiSelect name="convertCurrency" wrap="col-lg-2" label="Vztažen k měně" options-url="eshop/currency?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseTextBox name="calculationPrecision" wrap="col-lg-3" label="Počet desetiných míst při konverzi" type="number" :nullable="true" />
        </div>
        <div class="row mt-3">
          <BaseCheckBox name="allowAutoConvert" label="Pravidelně aktualizovat kurz z ČNB" wrap="flex-shrink-0" />
        </div>
        <div class="row mt-3">
          <BaseCheckBox name="enableConversion">Povolit dynamickou konverzi <small class="ps-1 text-secondary"><i class="fa fa-info-circle" /> Produkt nemusí být v ceníku dané měny, stačí když se bude vyskytovat v konverzní měně</small></BaseCheckBox>
        </div>
        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">

import {required} from '@vuelidate/validators';
import {RouteParamValue} from 'vue-router';


withDefaults(defineProps<{
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });


const rules = {
  code: { required },
  priority: { required },
  name: { required },
};


const form = ref(null);
const goBack: Ref<boolean> = ref(false);

function submit()
{
  form.value?.submit();
}


const $emit = defineEmits(['success']);
defineExpose({ submit } );

</script>