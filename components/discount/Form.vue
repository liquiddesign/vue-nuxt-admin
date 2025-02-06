<template>
  <BaseForm ref="form" :url="url" :data="data" :lang="lang" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <div class="col-lg-6">
      <div class="row">
        <BaseTextBoxLocale wrap="col-lg-12" name="name" label="Název" type="text" required />
        <BaseTextBox wrap="col-lg-12 mt-2" name="validFrom" label="Platnost od" type="text" />
        <BaseTextBox wrap="col-lg-12 mt-2" name="validTo" label="Platnost do" type="text" />
      </div>

      <div class="form-wrapper-light mt-3">
        <div class="row">
          <BaseMultiSelect wrap="col-lg-6" name="pricelists" label="Ceníky" :multiple="true" options-url="eshop/pricelist?property=code" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseMultiSelect wrap="col-lg-6" name="ribbons" label="Štítky" :multiple="true" options-url="eshop/ribbon?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>

        <div class="row mt-3">
          <BaseCheckBox name="recommended" wrap="col-lg-6"> Doporučeno </BaseCheckBox>
        </div>
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