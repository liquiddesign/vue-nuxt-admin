<template>
  <BaseForm ref="form" :url="url" :data="data" :slug="slug" :rules="rules" :loading="loading" @success="$emit('success', goBack ? null : $event.result); goBack = false">
    <h5 class="card-title">OBCHODNÍK</h5>
    <div class="col-lg-6">
      <div class="row">
        <BaseTextBox wrap="col-lg-12" name="fullname" label="Jméno a příjmení" type="text" />
      </div>

      <div class="row mt-2">
        <BaseTextBox wrap="col-lg-8" name="email" label="E-mail" />
        <BaseTextBox wrap="col-lg-4" name="code" label="Kód" />
      </div>

      <div class="form-wrapper-light mt-3">
        <h5 class="card-title">DALŠÍ MOŽNOSTI</h5>
        <div class="row">
          <BaseMultiSelect wrap="col-lg-6" name="customerGroup" label="Skupina zákazníků" options-url="eshop/customer-group?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseMultiSelect wrap="col-lg-6" name="customers" label="Zákazníci" options-url="eshop/customer?property=fullname" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
        <div class="row mt-3">
          <BaseMultiSelect wrap="col-lg-6" name="pricelists" label="Ceníky" :multiple="true" options-url="eshop/pricelist?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
          <BaseMultiSelect wrap="col-lg-6" name="visibilityLists" label="Seznamy viditelnosti" options-url="eshop/visibilityList?property=name" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
        </div>
      </div>

      <div class="mt-3">
        <div class="row">
          <BaseMultiSelect wrap="col-lg-12" name="catalogPermission" label="Zdroj oprávnení" :options="catalogPermissionOptions" />
        </div>
        <div class="col-lg-12 mt-2">
          <BaseFormRowInfo>Pokud se obchodník přihlásí na źakazníka, tak určuje, jestli použít oprávnění zákazníka nebo obchodníka.</BaseFormRowInfo>
        </div>

        <div class="row mt-3">
          <BaseCheckBox name="customersPermission" label="Oprávnění: Správa zákazníků" wrap="flex-shrink-0 mt-2" />
          <BaseCheckBox name="ordersPermission" label="Oprávnění: Správa objednávek" wrap="flex-shrink-0 mt-2" />
          <BaseCheckBox name="customerEmailNotification" label="Posílat e-mailem informace o objednávkách přiřazených zákazníků" wrap="flex-shrink-0 mt-2" />
        </div>
      </div>

      <div class="form-wrapper-blue mt-3">
        <h5 class="card-title">CACHE</h5>
        <div class="row mt-2">
          <BaseTextBox wrap="col-lg-12" name="" label="Index" type="text" />
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
  fullname: {required},
  email: {required},
};

const catalogPermissionOptions = {
  customer: 'Zákazník',
  merchant: 'Obchodník',
};

function submit()
{
  form.value?.submit();
}

const $emit = defineEmits(['success']);
defineExpose({ submit } );
</script>