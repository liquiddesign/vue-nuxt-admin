<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <h5 class="card-title">HLAVNÍ ÚDAJE</h5>
        {{ data }}
        <div class="row">
          <BasePhoneInput wrap="col-lg-6" name="name" label="Popisek" type="text" />
          <BaseSelect wrap="col-lg-6" name="type" label="Typ" :options="typeOptions" />
        </div>
        <div class="row mt-2">
          <BaseColorPicker wrap="col-lg-12" name="color" label="Barva textu" />
        </div>
        <div class="row mt-2">
          <BaseColorPicker wrap="col-lg-12" name="backgroundColor" label="Barva pozadí" />
        </div>
      </div>

      <div class="col-lg-6 ps-5">
        <h5 class="card-title">KOMUNIKACE</h5>
        <BaseCommentForm :comments="comments" />
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

const comments: Ref<any> = ref([
  {
    uuid: '1gft6sjfkguid',
    isSystem: false,
    isExternal: false,
    isContact: false,
    callBack: null,
    isUnanswered: false,
    sendEmail: false,
    created: '2025-03-04 11:11:55',
    content: 'test test 1',
    administrator: {
      uuid: '624aee9b4217111591666294',
      imageName: null,
      nickname: 'OP',
      name: 'Johnasd',
      surname: 'Doeaaassaaa',
    },
  },
  {
    uuid: '2hfksflfo4tg',
    isSystem: false,
    isExternal: false,
    isContact: true,
    callBack: '2025-03-10',
    isUnanswered: true,
    sendEmail: true,
    created: '2025-03-04 18:18:48',
    content: 'test test test 222',
    administrator: {
      uuid: '624aee9b4217111591666294',
      imageName: null,
      nickname: 'OP',
      name: 'Johnasd',
      surname: 'Doeaaassaaa',
    },
  },
  {
    uuid: '3lsdlfd845knj',
    isSystem: true,
    isExternal: false,
    isContact: false,
    callBack: null,
    isUnanswered: false,
    sendEmail: false,
    created: '2025-03-14 21:15:00',
    content: 'comment #3',
    mentionIds: [],
    administrator: {
      uuid: '624aee9b4217111591666294',
      imageName: null,
      nickname: 'OP',
      name: 'Johnasd',
      surname: 'Doeaaassaaa',
    },
  },
]);

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>