<template>
  <BaseCard>
    <div>
      <vue-finder id="my_vuefinder" :request="request" theme="light" :select-button="handleSelectButton"></vue-finder>
    </div>
  </BaseCard>

</template>

<script setup lang="ts">
const request = 'http://localhost/vue-nuxt-api/filemanager.php';

const handleSelectButton = {
  // show select button
  active: true,
  // allow multiple selection
  multiple: true,
  // handle click event
  click: (items, event) => {
    if (!items.length) {
      alert('No item selected');
      return;
    }
    alert('Selected: ' + items[0].path);
    console.log(items, event);
  },
};

</script>

<style scoped>



</style>