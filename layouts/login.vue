<template>
  <div class="app-container app-theme-white body-tabs-shadow">
    <div class="app-container">
      <div class="h-100 bg-night-sky bg-animation">
        <div class="d-flex vh-100 justify-content-center align-items-center">
          <div class="mx-auto app-login-box col-md-8 col-sm-8 col-lg-3">
            <img class="d-block mx-auto mb-3" src="/logo-white.svg" alt="" loading="lazy" height="50">
            <div class="modal-dialog w-100 mx-auto">
              <div class="modal-content">
                <slot />
              </div>
            </div>
            <div class="text-center text-white opacity-8 mt-3">Copyright © Liquid Design {{ (new Date()).getFullYear() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({title: 'Roiwell - administrace'});

</script>