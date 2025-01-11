<template>
  {{ administrators }} |

  {{ settings.database }}
  <hr>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="cs">cs</option>
  </select>
</template>


<script setup lang="ts">

import {useI18n} from 'vue-i18n';

const { locale } = useI18n();
const { administrators } = usePrefetchedData();
const { settings } = useUser();


</script>