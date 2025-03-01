<template>
  <BaseCard>
    <div>
      <vue-finder id="my_vuefinder1" :request="request" theme="light" :select-button="handleSelectButton" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
const request = 'http://localhost/vue-nuxt-api/filemanager.php';

</script>

<style scoped>

</style>