<template>
  <button @click="navigateTo({ name: 'producers'})">Zpět</button>

  <a @click.prevent="input.name = '10'">aaaa</a>
  {{ request.data }}
</template>

<script setup lang="ts">

import {onActivated, onMounted} from 'vue';

const route = useRoute();

const { data, execute } = useApiLazyFetch('levior-b2b/api/producer/' + route.params.id,
  { immediate: false}
);

const request = reactive(useApiFetch('producer/' + route.params.id, { immediate: false}));

const input = reactive(data);

onActivated(() => {


});

onMounted(() => {

  execute();
  request.execute();
});


</script>