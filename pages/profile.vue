<template>
  <BaseCard>
    <template #header>
      <div class="btn-actions-pane-left">
        <BaseButtonBack class="me-2" @click.prevent="success" />

        <a class="btn btn-sm bg-primary btn-outline-dark ms-1" @click.prevent="toast.info('Editujete českou mutaci')"><img class="mutation-flag" style="top: -2px; position: relative;" height="15" alt="cs" title="cs" src="http://localhost/levior-b2b/public/node_modules/flag-icon-css/flags/4x3/cz.svg"></a>
        <a class="btn btn-sm btn-outline-dark ms-1"><img class="mutation-flag" style="top: -2px; position: relative; -webkit-filter: grayscale(100%);" height="15" alt="cs" title="cs" src="http://localhost/levior-b2b/public/node_modules/flag-icon-css/flags/4x3/gb.svg"></a>
      </div>
      <div class="btn-actions-pane-right">
        <button v-bind="$attrs" class="btn btn-outline-alternate btn-sm me-1"><i class="fa fa-external-link px-1" /></button>
        <button v-bind="$attrs" class="btn btn-outline-success btn-sm me-1"><i class="fa fa-save px-1" /></button>
        <div style="display: inline-block; position: relative">
          <button class="btn dropdown-toggle btn btn-sm me-1 btn-outline-primary" type="button" aria-haspopup="true" data-bs-toggle="dropdown" data-bs-boundary="body" data-boundary="body"><i class="fa fa-bolt" /></button>
          <div class="dropdown-menu dropdown-menu-end" tabindex="-1" role="menu" style="display: block; right: 0; ">
            <button type="button" class="dropdown-item"><i class="fa fa-copy pe-1" /> Vytvořit kopii</button>
            <button type="button" class="dropdown-item"><i class="fa fa-arrow-right pe-1" /> Zkopírovat obsah</button>
            <div tabindex="-1" class="dropdown-divider" />
            <button type="button" class="dropdown-item"><i class="fa fa-remove pe-1" /> Vypnout ve feedech</button>
            <button type="button" class="dropdown-item"><i class="fa fa-minus-circle pe-1" /> Označit jako nedoprodejné</button>
          </div>
        </div>
      </div>

      <button v-bind="$attrs" class="btn btn-outline-danger btn-sm me-1"><i class="fa fa-trash-o px-1" /></button>
    </template>

    <template #body />
  </BaseCard>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';

const toast: ToastPluginApi = inject('toast', useToast());


/*const input = reactive({
});

const rules = {
  systemicLock: {
    required
  },
  content: {
    cs: {
      required,
    }
  }
};*/



//const mouse = reactive(useFetch('http://localhost/levior-b2b/api/producer/astra'));

//Object.assign(input, mouse.data);


function success() {

  //const mouse = useFetch('https://api.nuxtjs.dev/api/eshop-producer');
  //dataTest.value = mouse.data;

  toast.success('uloženo');
}


</script>