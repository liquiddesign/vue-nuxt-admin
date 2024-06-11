<template>
  <BaseForm ref="form" url="groups" :data="data" :slug="slug" :loading="loading" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <slot name="top" />
        <div class="row">
          <BaseTextBox name="name" wrap="col-lg-8" label="Název" type="text" />
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

import {withDefaults} from 'vue';
import {required} from '@vuelidate/validators';
import {RouteParamValue} from 'vue-router';
import {Ref} from 'vue/dist/vue';


withDefaults(defineProps<{
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const rules = {
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