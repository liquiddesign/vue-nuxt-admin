<template>
  <div class="dropdown">
    <button type="button" aria-haspopup="true" data-bs-toggle="dropdown" aria-expanded="false" class="p-0 btn btn-link dd-chart-btn me-2">
      <span class="icon-wrapper icon-wrapper-alt rounded-circle" :class="{'bg-danger-subtle': !isConnected, 'bg-success-subtle': isConnected}">
        <span class="icon-wrapper-bg" />
        <BaseIcon icon-name="Wifi" color="black" :size="24" :stroke-width="2" />
      </span>
    </button>
    <div tabindex="-1" role="menu" aria-hidden="true" class="rm-pointers dropdown-menu dropdown-menu-left">
      <div class="dropdown-menu-header">
        <div v-if="!isConnected" class="dropdown-menu-header-inner bg-premium-dark">
          <div class="menu-header-content text-white">
            <h5 class="menu-header-title">Offline</h5>
            <h6 class="menu-header-subtitle">Nejste připojen k serveru</h6>
          </div>
        </div>
        <div v-else class="dropdown-menu-header-inner bg-success">
          <div class="menu-header-content text-white">
            <h5 class="menu-header-title">Online</h5>
            <h6 class="menu-header-subtitle">Jste připojen k serveru</h6>
          </div>
        </div>
      </div>
      <div v-if="isConnected" class="widget-chart">
        <div class="widget-chart-content">
          <div class="widget-numbers">
            <span>{{ Object.values(liveTable).length }}</span>
          </div>
          <div class="widget-subheading pt-2">
            pracovníků
          </div>
        </div>
        <div class="widget-chart-wrapper">
          <div id="dashboard-sparkline-carousel-3-pop" />
        </div>
      </div>
      <ul class="nav flex-column">
        <li v-if="0" class="nav-item-divider mt-0 nav-item" />
        <li class="nav-item-btn text-center nav-item">
          <BaseButton v-if="!isConnected" class="btn-success" @click="open">
            <i class="fa fa-cog fa-rss-square mr-2" /> Připojit se
          </BaseButton>
          <BaseButton v-else class="btn-outline-dark" @click="close(1000)">
            <i class="fa fa-cog fa-times-circle" /> Odpojit
          </BaseButton>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

const { isConnected, liveTable, open, close } = useLiveFeed();
</script>