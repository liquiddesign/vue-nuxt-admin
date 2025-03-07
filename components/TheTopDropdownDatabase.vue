<template>
  <div class="dropdown">
    <button type="button" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false" class="p-0 btn btn-link dd-chart-btn me-2">
      <span class="icon-wrapper icon-wrapper-alt rounded-circle">
        <span class="icon-wrapper-bg bg-danger" style="padding-top: 10px;">
          <BaseIcon icon-name="Database" color="white" :size="24" />
        </span>
      </span>
    </button>
    <div tabindex="-1" role="menu" aria-hidden="true" class="rm-pointers dropdown-menu dropdown-menu-right" style="">
      <div class="dropdown-menu-header">
        <div class="dropdown-menu-header-inner pt-3 pb-3 bg-focus">
          <div class="menu-header-content text-center text-white">
            <h6 class="menu-header-subtitle mt-0"> Vyberte databázi</h6>
          </div>
        </div>
      </div>

      <a v-for="db in settings.availableDatabases" :key="db" type="button" tabindex="0" class="dropdown-item text-center py-1" :class="{'bg-success-subtle': settings.database === db}" @click.prevent="settings.database = db;">
        <div style="margin: auto;">{{ db }}</div>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">

const { settings } = useUser();



</script>