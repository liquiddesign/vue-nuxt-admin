<template>
  <BaseCard>
    <BaseForm ref="form" :data="data" :rules="rules" @success="submit">
      <div class="row">
        <h5 class="card-title">Ovládací prvky</h5>
        <div class="col-lg-6">
          <div class="row">
            <BaseTextBox name="defaultOnPage" wrap="col-lg-2" label="Položek na stránku" type="number" />
            <BaseCheckBox name="interactivePermissions" label="Zapnout interaktivní nastavení oprávnění u modulů" wrap="flex-shrink-0 mt-3" />
          </div>
          <div class="form-wrapper-blue mt-3">
            <h5 class="card-title">Přednastavené jednotky</h5>
            <div class="row mt-3">
              <div class="d-flex gap-3">
                <BaseTextBox name="defaultWeightUnit" wrap="col-lg-2" label="Váha" type="text" />
              </div>
            </div>
          </div>
          <h5 class="card-title mt-3">Jazyky a měna</h5>
          <div class="row mt-2">
            <BaseSelect v-model="locale" :options="Object.fromEntries(data.langs.map(item => [item, item.toUpperCase()]))" wrap="col-lg-2" label="Jazyk UI" />
            <BaseSelect name="defaultLang" :options="Object.fromEntries(data.langs.map(item => [item, item.toUpperCase()]))" wrap="col-lg-2" label="Hlavní jazyk"/>
            <BaseMultiSelect name="defaultCurrency" wrap="col-lg-2" label="Hlavní měna" options-url="eshop/currency?property=code" :options-url-params="{method: 'POST', body: {'_op': 'list'}}" />
            <h5 class="card-title mt-3">Pořadí jazyků</h5>
            <div ref="el">
              <div v-for="l in data.langs" :key="l" class="bg-light text-black p-2 mt-3 rounded-3" style="width: 200px; cursor: move">
                <i class="fa fa-bars text-black-50 pe-2" /> {{ l.toUpperCase() }}
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-lg-6">
              <BaseFormButton class="btn-success btn-sm me-1">Uložit</BaseFormButton>
            </div>
          </div>
        </div>
        <div class="col-lg-6 ps-5">
          <BaseAccordion header="Komunikace" :show-by-default="true">
            <table class="table table-overview">
              <tbody>
              <tr><th>Aktivní databáze</th><td class="">{{ settings.database }}</td></tr>
              <tr><th>Dostupné databáze</th><td class="">{{ settings.availableDatabases.join(', ') }}</td></tr>
              </tbody>
            </table>
          </BaseAccordion>
          <BaseAccordion header="Nastavení serveru" :show-by-default="true">
            <table class="table table-overview">
              <tbody>
                <tr><th>Maximálně uploadů</th><td class="">{{ settings.maxUploads }}</td></tr>
                <tr><th>Limit uploadu</th><td class="">{{ formatNumber(settings.maxFilesize / 1024 / 1024, 'MB') }}</td></tr>
                <tr><th>API</th><td class="">{{ config.public.baseURL }}</td></tr>
                <tr><th>Uložiště souborů</th><td class="">{{ config.public.userFilesURL }}</td></tr>
                <tr><th>WS</th><td class=""><i class="fa fa-circle" :class="{'text-danger': !isConnected, 'text-success': isConnected}" /> {{ config.public.wsURL }}</td></tr>
              </tbody>
            </table>
          </BaseAccordion>
        </div>
      </div>
    </BaseForm>
  </BaseCard>
</template>


<script setup lang="ts">

import {required} from '@vuelidate/validators';
import {formatNumber} from '~/utils/helpers';
import {ToastPluginApi, useToast} from 'vue-toast-notification';
import {inject} from 'vue';
import { useSortable } from '@vueuse/integrations/useSortable'
import {useI18n} from 'vue-i18n';

const { locale } = useI18n();
const config = useRuntimeConfig();
const { isConnected } = useLiveFeed();

const toast: ToastPluginApi = inject('toast', useToast());
const { settings, storeSettings } = useUser();

const defaultFormData = Object.assign(settings.value, {});

const data:any = ref(Object.assign({}, defaultFormData));

const test = ref({aaa: 1});


const rules = {
  defaultOnPage: { required },
};

function submit(data: any) {
  storeSettings(<Settings>data);


  toast.success('Uloženo');
};

const el = useTemplateRef<HTMLElement>('el')
useSortable(el, data.value.langs)




</script>