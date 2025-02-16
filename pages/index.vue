<template>
  <NuxtLayout name="login">
    <BaseForm
      ref="form"
      url="auth/sign-in"
      :data="formData"
      :rules="rules"
      :live-feed="false"
      :silent="true"
      :omit="['lifeFeed']"
      class="no-red"
      @success="success"
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
          <BaseCheckBox name="lifeFeed" label="Připojit k live-feed serveru" />
        </div>
      </div>
      <div class="modal-footer clearfix">
        <BaseFormButton wrap="float-end" class="btn-primary">Přihlásit se</BaseFormButton>
        <a :href="data?.result" class="btn btn-outline-secondary bg-white" :class="{disabled: !data?.result}">
          <img src="/g-logo.png" height="18px" alt="Google logo">
        </a>
      </div>
    </BaseForm>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {required, requiredIf} from '@vuelidate/validators';
import {OkResponse} from '~/utils/OkResponse';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {AuthorizationLevel} from '~/composables/useUser';

definePageMeta({
  layout: false,
  authorization: AuthorizationLevel.Public,
  description: 'Login obrazovka',
});

const { login, settings } = useUser();
const toast: ToastPluginApi = inject('toast', useToast());
const route = useRoute();

const { data } = useApiFetch('auth/google-link', {}, false);

const twoFactorRequired: Ref<boolean> = ref(false);
const formData:any = reactive({ lifeFeed: true });

const rules = {
  login: { required },
  password: { required },
  otp: { requiredIf: requiredIf(() => twoFactorRequired.value) },
};

function error(error: any) {
  console.error(error);

  toast.error(error?.statusCode !== undefined ? (twoFactorRequired.value ? 'Neplatné jednorázové heslo' : 'Špatné heslo nebo login') : 'Nepodařil se připojit k serveru');
}

function success(response: OkResponse) {
  if (response.result.success && response.result.strategy === 'otp') {
    twoFactorRequired.value = true;
  } else {
    login(response.result.identity as Identity, response.result.csrfToken);

    if (route.query?.redirectTo) {
      navigateTo({ path: route.query.redirectTo.toString() });
    } else {
      navigateTo({ name: settings.value.homepage });
    }
  }
}


</script>

<style scoped>



</style>