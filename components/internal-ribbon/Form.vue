<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <BaseTextBox wrap="col-3 row flex-nowrap" name="name" label="Popisek" type="text" required />
    <BaseColorPicker wrap="col-3 row flex-nowrap mt-2" name="color" label="Barva textu" />
    <BaseColorPicker wrap="col-3 row flex-nowrap mt-2" name="backgroundColor" label="Barva pozadí" />
    <BaseSelect wrap="col-3 row flex-nowrap mt-2" name="type" label="Typ" :options="typeOptions" required />

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
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);

const rules = {
  name: {required},
  type: {required},
};

const typeOptions = {
  product: 'product',
  order: 'order',
  price_list: 'price_list',
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>