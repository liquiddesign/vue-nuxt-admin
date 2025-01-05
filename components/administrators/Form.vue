<template>
  <BaseForm ref="form" url="administrators" :data="data" :slug="slug" :loading="loading" :rules="rules" :omit="['meta', 'account.password2']" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <div class="row">
      <div class="col-lg-6">
        <slot name="top" />
        <div class="row">
          <BaseTextBox name="name" wrap="col-lg-4" label="Příjmení" type="text" />
          <BaseTextBox name="surname" wrap="col-lg-4" label="Jméno" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="email" wrap="col-lg-4" label="E-mail" type="text" />
          <BaseTextBox name="phone" wrap="col-lg-4" label="Telefon" type="text" />
        </div>
        <div class="row mt-2">
          <BaseMultiSelect name="role" wrap="col-lg-4" label="Role" options-url="roles" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
          <BaseMultiSelect name="groups" :multiple="true" wrap="col-lg-4" label="Skupiny" options-url="groups" :options-url-params="{method: 'POST', body: {'_op': 'optionsList'}}" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="nickname" wrap="col-lg-2" label="Zkratka" type="text" />
          <BaseTextBox name="description" wrap="col-lg-6" label="Popisek" type="text" />
        </div>
        <div class="row mt-2">
          <BaseTextBox name="priority" wrap="col-lg-2" label="Pořadí" type="number" />
        </div>

        <div class="form-wrapper-blue mt-3">
          <h5 class="card-title">Účet</h5>
          <div class="row">
            <BaseTextBox name="account.login" wrap="col-lg-4" label="Login" />
            <BaseTextBox name="account.activeFrom" wrap="col-lg-2" label="Aktivní od" type="date" :nullable="true" />
            <BaseTextBox name="account.activeTo" wrap="col-lg-2" label="Aktivní do" type="date" :nullable="true" />
          </div>
          <div v-if="!slug" class="row mt-2">
            <BaseTextBox name="account.password" wrap="col-lg-4" label="Heslo" />
            <BaseTextBox name="account.password2" wrap="col-lg-4" label="Heslo (pro kontrolu)" />
          </div>
          <div class="row mt-2">
            <BaseCheckBox name="account.active" wrap="col-lg-8" label="Účet je aktivní" />
          </div>
          <div class="row mt-2">
            <BaseCheckBox name="google2faEnabled" wrap="col-lg-8" label="Zapnout dvoufaktorové přihlášení" />
          </div>
          <br>
          <i class="fa fa-info-circle" /> Heslo si změníte pomocí akce změna hesla nebo můžete uživateli resetovat heslo.
        </div>
        <div class="row mt-3">
          <div class="col-lg-6">
            <BaseFormButton class="btn-success btn-sm me-1" @click="goBack = true;">Uložit</BaseFormButton>
            <BaseFormButton class="btn-outline-primary me-1 btn-sm" @click="goBack = false;">Uložit a pokračovat</BaseFormButton>
          </div>
        </div>
      </div>
      <div v-if="data && data.google2faEnabled" class="col-lg-6 ps-5">
        <h5 class="card-title">QR kód pro dvoufaktorové přihlášení</h5>
        <ol class="mb-0 ps-3">
          <li> Stáhněte si z <a target="_blank" href="https://itunes.apple.com/app/google-authenticator/id388497605?mt=8">App Store</a> nebo <a target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">Google play</a> aplikaci Google Authenticator. </li>
          <li>V aplikaci ťukněte na ikonu "plus".</li>
          <li>Zvolte "Skenovat čárový kód".</li>
        </ol>
        <qrcode-vue :value="data.meta.google2FaLink" level="H" render-as="svg" size="300" class="mt-3" />
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">

import {required, email, sameAs, maxLength, requiredIf} from '@vuelidate/validators';
import {RouteParamValue} from 'vue-router';
import QrcodeVue from 'qrcode.vue';
import {type BaseForm} from '#components';



const props = withDefaults(defineProps<{
  data: any,
  loading?: boolean,
  slug?: string|RouteParamValue[],
}>(), { loading: false, slug: undefined });

const rules = {
  name: { required },
  surname: { required },
  nickname: { required, maxLength: maxLength(2) },
  email: { email },
  account: {
    login: { required },
    password: { requiredIf: requiredIf(() => !props.slug) },
    password2: { requiredIf: requiredIf(() => !props.slug), sameAsPassword: sameAs(props.data?.password) },
  },
};



const form: Ref<InstanceType<typeof BaseForm> | null> = ref(null);
const goBack: Ref<boolean> = ref(false);


const $emit = defineEmits(['success']);
defineExpose({ submit: () => form.value?.submit()  } );

</script>