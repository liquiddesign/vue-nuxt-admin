<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
    <div class="col-lg-6">
      <div class="row">
        <BaseTextBox wrap="col-lg-12" name="name" label="Název" type="text" />
      </div>

      <div class="row mt-2">
        <BaseTextBox wrap="col-lg-8" name="code" label="Kód" type="text" />
        <BaseTextBox wrap="col-lg-4" name="priority" label="Priorita" type="number" />
        <div class="col-lg-8 mt-2">
          <i class="fa fa-info-circle" /> Kód může obsahovat pouze znaky a-z, A-Z, 0-9. Speciální znaky nejsou povoleny!
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <BaseCheckBox wrap="col-lg-12" name="hidden" label="Skryto" />
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
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const form = ref(null);
const goBack: Ref<boolean> = ref(false);

const rules = {
  code: {required},
  name: {required},
  priority: {required},
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>