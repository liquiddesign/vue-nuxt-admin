<template>
<div class="dropdown">
<button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class="p-0 me-2 btn btn-link">
    <span class="icon-wrapper icon-wrapper-alt rounded-circle">
      <span class="icon-wrapper-bg bg-danger" style="padding-top: 10px;">
         <BaseFlag style="font-size:17px" class="mt-1" :lang="locale" />
      </span>
    </span>
</button>
<div tabindex="-1" role="menu" aria-hidden="true" class="rm-pointers dropdown-menu dropdown-menu-right" style="">
  <div class="dropdown-menu-header">
    <div class="dropdown-menu-header-inner pt-3 pb-3 bg-focus">
      <div class="menu-header-content text-center text-white">
        <h6 class="menu-header-subtitle mt-0"> Výberte jazyk</h6>
      </div>
    </div>
  </div>
  <a v-for="l in $user.settings.langs" :key="l" type="button" tabindex="0" class="dropdown-item text-center py-1" @click.prevent="locale = l;">
    <div style="margin: auto;"><BaseFlag style="font-size:20px" :lang="l" class="me-2" /> {{ l }}</div>
  </a>
</div>



</div>
</template>
<script setup lang="ts">

import {useI18n} from 'vue-i18n';

const { $user } = useNuxtApp();
const { locale } = useI18n();



</script>