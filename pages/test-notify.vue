<template>
  <BaseButton @click="sendNotify('Ahoj jak se mas?')" class="btn-light">Poslat notifikaci</BaseButton>
</template>

<script setup lang="ts">
const { sendNotify } = useLiveFeed();




</script>