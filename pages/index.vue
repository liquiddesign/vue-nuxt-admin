<template>
  <NuxtLayout name="login">
    <BaseForm
      ref="form"
      url="auth/sign-in"
      :data="formData"
      :rules="rules"
      :live-feed="false"
      :silent="true"
      :omit="['remember']"
      class="no-red"
      @success="login"
      @error="error"
    >
      <div class="modal-body">
        <div class="h5 modal-title text-center">
          <h4 class="mt-2">Liquid IS 2.0<br><span>Přihlášení do informačního systému:</span></h4>
        </div>
        <div v-if="twoFactorRequired" class="row g-3">
          <BaseTextBox name="otp" wrap="foo" autocomplete="one-time-code" placeholder="Jednorázové heslo" type="number" />
        </div>
        <div v-else class="row g-3">
          <BaseTextBox name="login" wrap="foo" placeholder="Login" autocomplete="username" />
          <BaseTextBox name="password" wrap="foo" placeholder="Heslo" type="password" autocomplete="current-password" />
          <BaseCheckBox name="remember" label="Zapamatovat si přihlášení" />
        </div>
      </div>
      <div class="modal-footer clearfix">
        <BaseFormButton wrap="float-end" class="btn-primary">Přihlásit se</BaseFormButton>
      </div>
    </BaseForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {required, requiredIf} from '@vuelidate/validators';
import {OkResponse} from '~/utils/OkResponse';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {AuthorizationLevel} from '~/plugins/authorization';

definePageMeta({
  layout: false,
  authorization: AuthorizationLevel.Public,
  description: 'Login obrazovka',
});

const formData:any = reactive({ remember: false });
const { $user } = useNuxtApp();

const toast: ToastPluginApi = inject('toast', useToast());
const route = useRoute();
const twoFactorRequired: Ref<boolean> = ref(false);

const rules = {
  login: { required },
  password: { required },
  otp: { requiredIf: requiredIf(twoFactorRequired.value) },
};

function error(error: any) {
  console.error(error);

  toast.error(error?.statusCode !== undefined ? (twoFactorRequired.value ? 'Neplatné jednorázové heslo' : 'Špatné heslo nebo login') : 'Nepodařil se připojit k serveru');
}

function login(response: OkResponse) {

  if (response.result.success && response.result.strategy === 'otp') {
    twoFactorRequired.value = true;
  } else {
    $user.login(response.result.identity, formData.remember);

    if (route.query?.redirectTo) {
      navigateTo({path: route.query.redirectTo.toString()});
    } else {
      navigateTo({name: $user.homepage});
    }
  }
}

</script>