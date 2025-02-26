<template>
  <BaseCard>
    <template #header>
      <div class="btn-actions-pane-left">
        <BaseButtonBack class="me-2" @click.prevent="success" />

        <a class="btn btn-sm bg-primary btn-outline-dark ms-1" @click.prevent="toast.info('Editujete českou mutaci')"><flag iso="cz" class="px-2" /></a>
        <a class="btn btn-sm btn-outline-dark ms-1"><flag iso="gb" class="px-2" /></a>
      </div>
      <div class="btn-actions-pane-right">
        <button v-bind="$attrs" class="btn btn-outline-alternate btn-sm me-1"><i class="fa fa-external-link px-1" /></button>
        <button v-bind="$attrs" class="btn btn-outline-success btn-sm me-1"><i class="fa fa-save px-1" /></button>
        <div style="display: inline-block; position: relative">
          <button class="btn dropdown-toggle btn btn-sm me-1 btn-outline-primary" type="button" aria-haspopup="true" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body"><i class="fa fa-bolt" /></button>
          <div class="dropdown-menu dropdown-menu-end" tabindex="-1" role="menu" style="display: block; right: 0; ">
            <button type="button" class="dropdown-item"><BaseIcon icon-name="Copy" class="pe-1" /> Vytvořit kopii</button>
            <button type="button" class="dropdown-item"><i class="fa fa-arrow-right pe-1" /> Zkopírovat obsah</button>
            <div tabindex="-1" class="dropdown-divider" />
            <button type="button" class="dropdown-item"><i class="fa fa-remove pe-1" /> Vypnout ve feedech</button>
            <button type="button" class="dropdown-item"><i class="fa fa-minus-circle pe-1" /> Označit jako nedoprodejné</button>
          </div>
        </div>
      </div>

      <button v-bind="$attrs" class="btn btn-outline-danger btn-sm me-1"><i class="fa fa-trash-o px-1" /></button>
    </template>

    <template #body>
      <BaseForm ref="form" wrap="col-lg-6" url="customer" :slug="'100'" lang="cz" :input="input" :rules="rules" @success="success">
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <BaseTextBox name="ic" wrap="col-lg-6" label="IC" type="text" />
          <BaseTextBox name="company" wrap="col-lg-6" label="Company" type="text" />
        </div>
        <div class="row">
          <div class="col-lg-6">
            <!--<Editor
              v-model="input.test"
              api-key="no-api-key"
              :init="{
                plugins: 'lists link image table code help wordcount'
              }"
            />-->
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </BaseForm>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {required} from '@vuelidate/validators';
import {AuthorizationLevel} from '~/composables/useUser';

definePageMeta({
  authorization: AuthorizationLevel.Authenticated,
  description: 'Editace profilu',
});

const toast: ToastPluginApi = inject('toast', useToast());


const input:any = ref({ });

const rules = {
  login: { required },
  password: { required },
};


function success() {

  //const mouse = useApiFetch('https://api.nuxtjs.dev/api/eshop-producer');
  //dataTest.value = mouse.data;

  toast.success('uloženo');
}


</script>