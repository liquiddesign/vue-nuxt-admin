<template>
  <div class="search-wrapper">
    <div class="input-holder">
      <input ref="searchBox" type="text" class="search-input" placeholder="Vyhledejte klienta, nemovitost">
      <button class="search-icon">
        <BaseIcon icon-name="Search" color="white" :size="20" />
      </button>
    </div>
    <button class="bg-transparent border-0 btn-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-white bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
</script>