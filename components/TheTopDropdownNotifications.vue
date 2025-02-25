<template>
  <div class="dropdown">
    <button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class="p-0 me-2 btn btn-link">
      <span class="icon-wrapper icon-wrapper-alt rounded-circle">
        <span class="icon-wrapper-bg bg-danger" style="padding-top: 10px;">
          <BaseIcon icon-name="Bell" :size="24" color="white" />
          <flag v-if="0" style="font-size:17px" iso="cz" class="mt-1" />
        </span>
        <BaseIcon v-if="0" icon-name="Bell" :size="24" class="ion-android-notifications" :class="{'icon-anim-pulse': false}" />
        <BaseIcon v-else icon-name="Bell" :size="24" class="text-danger" :class="{'icon-anim-pulse': false}" />
        <span v-if="1" class="badge badge-dot badge-dot-sm bg-danger">Notifikace</span>
      </span>
    </button>
    <div tabindex="-1" role="menu" aria-hidden="true" class="rm-pointers dropdown-menu dropdown-menu-xl dropdown-menu-right" style="">
      <div class="dropdown-menu-header mb-0">
        <div class="dropdown-menu-header-inner bg-deep-blue">
          <div class="menu-header-image opacity-1" />
          <div class="menu-header-content text-dark">
            <h5 class="menu-header-title">Notifikační centrum</h5>
            <h6 class="menu-header-subtitle">
              Máte
              <b>1</b> notifikací
            </h6>
          </div>
        </div>
      </div>
      <ul class="tabs-animated-shadow tabs-animated nav nav-justified tabs-shadow-bordered p-3">
        <li class="nav-item">
          <a role="tab" class="nav-link active" data-bs-toggle="tab" href="#tab-messages-header" aria-selected="true" style="position: relative">
            <span>Obecné</span>
            <span class="notification-dot" />
          </a>
        </li>
        <li class="nav-item">
          <a role="tab" class="nav-link" data-bs-toggle="tab" href="#tab-events-header" aria-selected="false">
            <span>Komunikace</span>
            <span class="notification-dot" style="background-color: red;" />
          </a>
        </li>
        <li class="nav-item">
          <a role="tab" class="nav-link" data-bs-toggle="tab" href="#tab-errors-header" aria-selected="false">
            <span>Systemové</span>
            <span class="notification-dot" style="background-color: red;" />
          </a>
        </li>
      </ul>
      <div class="tab-content" />
      <ul class="nav flex-column">
        <li class="nav-item-divider nav-item" />
        <li class="nav-item-btn text-center nav-item">
          <button class="btn-shadow btn-wide btn-pill btn btn-focus btn-sm">Označit vše jako přečtené</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>