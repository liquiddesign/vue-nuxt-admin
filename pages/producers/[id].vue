<template>
  <button @click="navigateTo({ name: 'producers'})">Zpět</button>

  <a @click.prevent="input.name = '10'">aaaa</a>
  {{ request.data }}
</template>

<script setup lang="ts">

import {onActivated, onMounted} from 'vue';

const route = useRoute();

const { data, execute } = useLazyFetch('http://localhost/levior-b2b/api/producer/' + route.params.id,
  { immediate: false}
);

const request = reactive(useFetch('http://localhost/levior-b2b/api/producer/' + route.params.id, { immediate: false}));

const input = reactive(data);

onActivated(() => {
  console.log('activated');

});

onMounted(() => {
  console.log('mounted');
  execute();
  request.execute();
});


</script>