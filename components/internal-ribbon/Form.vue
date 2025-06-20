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
        <div class="row mt-2">
<!--          <BaseTreePicker wrap="col-lg-12" name="category" label="Kategorie" url-tree="eshop/category/?expand=ancestor&onpage=200" />-->
          <BaseTreePicker v-model="category" wrap="col-lg-12" label="Kategorie" url-tree="eshop/category?expand=ancestor&onpage=500" />
        </div>
      </div>

      <div class="col-lg-6 ps-5">
        <h5 class="card-title">KOMUNIKACE</h5>
        <BaseCommentForm :comments="comments" />
      </div>
    </div>
    <div class="row mt-5">
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
import BaseTreePicker from '~/components/BaseTreePicker.vue';

const props = withDefaults(defineProps<{
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

const category: Ref<any> = ref({
  '2a44e99df136bdc91dd16f1ad8573aa2': {
    uuid: '2a44e99df136bdc91dd16f1ad8573aa2',
    name: {cs: 'Kyocera', en: null},
    code: 'NAPLNKYO',
    ancestor: null,
  },
  '5a4c1f1395e27996ede767cd7cf9ee29': {
    uuid: '5a4c1f1395e27996ede767cd7cf9ee29',
    name: {cs: 'Lexmark', en: null},
    code: 'NAPLNLEX',
    ancestor: null,
  },
  '6076908a2212745033796846': {
    uuid: '6076908a2212745033796846',
    name: {cs: 'Etikety', en: null},
    code: 'PFEETI',
    ancestor: {
      uuid: '60768ddbc5a9940375081775',
      name_cs: 'Papíry, fólie, etikety',
    },
  },
});

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

watch(props.data, (newData: any) => {
  if (newData?.items) {
    newData.category = category;
    props.data.value = newData;
  }
});
</script>