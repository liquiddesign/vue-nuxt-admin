<template>
  <NuxtLayout name="login">
    <BaseForm ref="form" url="auth/sign-in" :input="input" :rules="rules" :silent="true" :omit="['remember']" class="no-red" @success="login" @error="error">
      <div class="modal-body">
        <div class="h5 modal-title text-center">
          <h4 class="mt-2">Roiwell 2.0 - B2B Eshop<br><span>Přihlášení do administrace:</span></h4>
        </div>
        <div class="row g-3">
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
import {required} from "@vuelidate/validators";
import {OkResponse} from "~/utils/OkResponse";
import {ToastPluginApi, useToast} from "vue-toast-notification";

definePageMeta({
  layout: false,
});

const input:any = reactive({ remember: false });
const { $user } = useNuxtApp();

const toast: ToastPluginApi = inject('toast', useToast());

const rules = {
  login: { required },
  password: { required }
};

function error() {
  toast.error('Špatné heslo nebo login.');
}

function login(response: OkResponse) {
  $user.login(response.result, input.remember);
  navigateTo({ name: $user.homepage });
}

</script>