<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="router.back();" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>

    <template #body>
      <BaseForm ref="form" :url="'profile'" :data="identity" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
        <h5 class="card-title">Změna hesla</h5>
        <div class="col-lg-6">
          <div class="row">
            <BaseTextBox name="account.password" wrap="col-lg-8" label="Heslo" />
            <BaseTextBox name="account.password2" wrap="col-lg-8 mt-2" label="Heslo (pro kontrolu)" />
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
  </BaseCard>
</template>

<script lang="ts" setup>
import { required, sameAs } from '@vuelidate/validators';

const router = useRouter();
const form = ref(null);
const goBack: Ref<boolean> = ref(false);
const { identity } = useUser();

const rules = {
  account: {
    login: { required },
    password: { required },
    password2: { required, sameAsPassword: sameAs(identity?.value?.account.password) },
  },
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>