<template>
  <BaseCard>
    <template #headerLeft>
      <BaseButtonBack class="me-2" @click="router.back();" />
      <BaseButtonSave class="btn-sm me-2" @click="$refs?.form.submit()" />
    </template>

<!--    <template #headerRight>-->
<!--      <BaseLiveUsers class="me-2" />-->
<!--      <BaseButtonExternalLink v-if="0" />-->
<!--      <BaseButtonRefresh class="btn-sm me-1" @click="refresh();" />-->
<!--      <BaseDropdown class="btn-outline-primary me-1" icon="fa-bolt">-->
<!--        <BaseDropdownItem @click="makeCopy()">Vytvořit kopii</BaseDropdownItem>-->
<!--      </BaseDropdown>-->
<!--      <BaseButtonDelete :confirmation="true" :outline="true" class="btn-sm btn-danger" @confirm="deleteItem()" />-->
<!--    </template>-->

    <template #body>
      <BaseForm ref="form" :url="'profile'" :data="identity" :rules="rules" @success="$emit('success', goBack ? null : $event.result); goBack = false">
        <h5 class="card-title">PROFILE</h5>
        <div class="col-lg-6">
          <div class="row">
            <BaseTextBox wrap="col-lg-6" name="surname" label="Příjmení" type="text" />
            <BaseTextBox wrap="col-lg-6" name="name" label="Jméno" type="text" />
          </div>
          <div class="row mt-2">
            <BaseTextBox wrap="col-lg-8" name="email" label="E-mail" type="mail" />
            <BaseTextBox wrap="col-lg-4" name="nickname" label="Zkratka" type="mail" />
          </div>
          <div class="row mt-2">
            <BasePhoneInput wrap="col-lg-12" name="phone" label="Telefon" />
          </div>

          <div class="form-wrapper-blue mt-3">
            <h5 class="card-title">Účet</h5>
            <div class="row justify-content-between">
              <BaseTextBox name="account.login" wrap="col-lg-8" label="Login" />
              <BaseButton class="btn-outline-primary btn-sm col-lg-8 w-auto h-30 mt-auto" style="margin-right: 12px;" @click="navigateTo({ path: 'profile/password' })">
                <KeyRound class="me-1 text-center" :size="16" /> Změna hesla
              </BaseButton>
            </div>
            <br>
            <i class="fa fa-info-circle" /> Heslo si změníte pomocí akce změna hesla nebo můžete uživateli resetovat heslo.
            <div class="row mt-2">
              <BaseTextBox name="account.activeFrom" wrap="col-lg-6" label="Aktivní od" type="date" :nullable="true" />
              <BaseTextBox name="account.activeTo" wrap="col-lg-6" label="Aktivní do" type="date" :nullable="true" />
            </div>
            <div class="row mt-2">
              <BaseCheckBox name="account.active" wrap="col-lg-8" label="Účet je aktivní" />
            </div>
            <div class="row mt-2">
              <BaseCheckBox name="google2faEnabled" wrap="col-lg-8" label="Zapnout dvoufaktorové přihlášení" />
            </div>
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

<script setup lang="ts">
import {email, maxLength, required} from '@vuelidate/validators';
import { KeyRound } from 'lucide-vue-next';

const router = useRouter();
const form = ref(null);
const goBack: Ref<boolean> = ref(false);
const { identity } = useUser();
console.log('identity', identity);

const rules = {
  name: { required },
  surname: { required },
  nickname: { required, maxLength: maxLength(2) },
  email: { email },
  account: {
    login: { required },
  },
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>