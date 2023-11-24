<template>
  <div class="row">
    <button class="btn btn-secondary" @click="$emit('clear')">RESET</button>
    <BaseForm ref="form" wrap="col-lg-6" url="currency" :lang="lang" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$emit('success', goBack); goBack = false">
      <slot name="top" />
      <div class="row">
        <BaseTextBox name="name" wrap="col-lg-8" label="Název" type="text" />
        <BaseTextBox name="code" label="Kód" wrap="col-lg-4" type="text" />
      </div>
      <div class="form-wrapper-blue mt-3">
        <h5 class="card-title">FORMÁT</h5>
        <div class="row">
          <BaseTextBox name="symbol" label="Symbol" wrap="col-lg-4" type="text" />
        </div>
        <div class="row mt-2" />
      </div>
      <h5 class="card-title mt-3">Přepočet</h5>
      <div class="row mt-3">
        <div class="col-lg-6">
          <BaseFormButton class="btn-success btn-sm me-1" @click="goBack=true;">Uložit</BaseFormButton>
          <BaseFormButton class="btn-outline-primary btn-sm" @click="goBack=false;">Uložit a pokračovat</BaseFormButton>
        </div>
      </div>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">

import {inject, withDefaults} from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {required} from '@vuelidate/validators';
import {RouteParamValue} from 'vue-router';

const props = withDefaults(defineProps<{
  data: any,
  lang: string,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const toast: ToastPluginApi = inject('toast', useToast());

const rules = {
  code: { required },
  name: { required },
  symbol: { required },
};

const form = ref(null);
const goBack = ref(false);

const $emit = defineEmits(['success', 'clear']);

</script>