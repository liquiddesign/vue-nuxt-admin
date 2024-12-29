<template>

  <select v-model="locale">
    <option value="en">en</option>
    <option value="cs">cs</option>
  </select>

  {{ $t('backHome2', { name: 'vue-i18n' }) }}

  {{ status }}

  {{ data }}

</template>


<script setup lang="ts">

import {useI18n} from 'vue-i18n';


const { locale } = useI18n();


</script>