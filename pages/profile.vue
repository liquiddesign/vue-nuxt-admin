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
  // account: {
  //   login: { required },
  //   password: { requiredIf: requiredIf(() => !props.slug) },
  //   password2: { requiredIf: requiredIf(() => !props.slug), sameAsPassword: sameAs(props.data?.password) },
  // },
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>