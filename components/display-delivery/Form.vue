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

<template>
  <BaseForm ref="form" :url="url" :lang="lang" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <BaseTextBoxLocale wrap="col-3 row flex-nowrap" name="label" label="Popisek" type="text" />
    <BaseTextBox wrap="col-3 row flex-nowrap mt-2" name="priority" label="Priorita" type="number" required />
    <BaseTextBox wrap="col-3 row flex-nowrap mt-2" name="timeThreshold" label="Časový práh" type="time" />
    <i class="fa fa-info-circle" /> Pokud nastavíte u productu doručení na automatické a zvolíte časový práh, tak se bude zobrazovat popisek před a po v závislosti na skutečném čase.

    <div class="row mt-3">
      <div class="col-lg-6">
        <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
        <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
      </div>
    </div>
  </BaseForm>
</template>