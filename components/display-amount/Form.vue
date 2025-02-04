<template>
  <BaseForm ref="form" :url="url" :lang="lang" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <div class="col-lg-6">
      <div class="row">
        <BaseTextBoxLocale wrap="col-lg-8" name="label" label="Popisek" type="text" />
        <BaseTextBox wrap="col-lg-4" name="priority" label="Priorita" type="number" required />
      </div>

      <div class="row mt-2">
        <BaseMultiSelect wrap="col-lg-8" name="displayDelivery" label="Přednastavené doručení" type="text" options-url="eshop/display-delivery?property=label" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        <BaseCheckBox name="isSold" wrap="col-lg-4 mt-auto"> Označit jako vyprodáno </BaseCheckBox>
      </div>
      <div class="col-lg-8 mt-2">
        <i class="fa fa-info-circle" /> Pokud nastavíte "Přednastavené doručení", tak u productů s nastaveným doručením na "Automaticky" bude zvoleno toto doručení.
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-lg-6">
        <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
        <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
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
  lang: string,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);

const rules = {
  priority: {required},
  label: {
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