<template>
  <div class="search-wrapper" :class="{'active': activeSearch}">
    <div class="input-holder">
      <input ref="searchBox" type="text" class="search-input" placeholder="Vyhledejte klienta, nemovitost">
      <button class="search-icon" @click="onClickSearch">
        <BaseIcon icon-name="Search" color="white" :size="20" />
      </button>
    </div>
    <button class="bg-transparent btn-close">
      <BaseIcon icon-name="X" class="text-white bi bi-x-lg" :size="20" @click="activeSearch = false" />
    </button>
  </div>
</template>
<script setup lang="ts">
const activeSearch: Ref<boolean> = ref(false);

function onClickSearch() {
  if (activeSearch.value) {
    console.log('search emit');
  } else {
    activeSearch.value = true;
  }
}
</script>