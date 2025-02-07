<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <slot name="top" />
        <div class="row">
          <BaseTextBox name="name" wrap="col-lg-8" label="Název" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="code" wrap="col-lg-4" label="Kód" type="text" />
          <BaseTextBox name="symbol" wrap="col-lg-4" label="Symbol" type="text" />
        </div>
        <div class="row mt-3">
          <BaseCheckBox name="isVirtual">Virtuální měna <small class="ps-1 text-secondary"><i class="fa fa-info-circle" /> Jako měnu můžete přidat například kredity nebo jiné alternativní jednotky</small></BaseCheckBox>
        </div>

        <div class="row mt-3">
          <BaseCheckBox name="cashback">Povolit odměny <small class="ps-1 text-secondary"><i class="fa fa-info-circle" /> U produktů budete moci nastavit výši odměny v této měně</small></BaseCheckBox>
        </div>
        <div class="form-wrapper-blue mt-3">
          <h5 class="card-title">Formát</h5>
          <div class="row align-items-end">
            <BaseTextBox name="formatDecimals" wrap="col-lg-3" label="Počet desetinných míst" type="number" />
            <BaseTextBox name="formatDecimalSeparator" wrap="col-lg-3" label="Oddělovač desetinných míst" />
            <BaseTextBox name="formatThousandsSeparator" wrap="col-lg-3" label="Oddělovač tisícovek" />
            <BaseSelect name="formatSymbolPosition" wrap="col-lg-3" label="Pozice symbolu" :options="{before: 'Před', after: 'Za'}" />
          </div>
          <br>
          <i class="fa fa-info-circle" /> Ukázka formátování:
          <span>{{ ('2' + (data?.formatThousandsSeparator ?? '') + '981' + (data?.formatThousandsSeparator ?? '') + '543' + (data?.formatDecimalSeparator ?? '')) + '01  Kč' }}</span>
        </div>
        <h5 class="card-title mt-3">Konverze a přepočet</h5>
        <div class="row align-items-end mt-2">
          <BaseTextBox name="convertRatio" wrap="col-lg-4" label="Kurz" type="float" :nullable="true" />
          <BaseSelect name="convertCurrency" wrap="col-lg-4" label="Vztažen k měně" :options="currencies" />
          <BaseTextBox name="calculationPrecision" wrap="col-lg-4" label="Počet desetiných míst při konverzi" type="number" :nullable="true" />
        </div>
        <div class="row mt-3">
          <BaseCheckBox name="allowAutoConvert" label="Pravidelně aktualizovat kurz z ČNB" wrap="flex-shrink-0" />
        </div>
        <div class="row mt-3">
          <BaseCheckBox name="enableConversion">Povolit dynamickou konverzi </BaseCheckBox>
        </div>
        <div class="row ps-3">
          <small class="text-secondary"><i class="fa fa-info-circle" /> Produkt nemusí být v ceníku dané měny, stačí když se bude vyskytovat v konverzní měně</small>
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
  url: string,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });


const rules = {
  code: { required },
  // priority: { required },
  name: { required },
};


const form = ref(null);
const goBack: Ref<boolean> = ref(false);
const { currencies } = usePrefetchedData();

function submit()
{
  form.value?.submit();
}


const $emit = defineEmits(['success']);
defineExpose({ submit } );

</script>