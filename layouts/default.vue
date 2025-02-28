<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
    <div class="app-header header-shadow bg-night-sky header-text-light">
      <div class="app-header__logo">
        <img src="https://www.lqd.cz/public/images/logo-white.svg" alt="" loading="lazy" height="33">
        <div class="header__pane ms-auto">
          <div>
            <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
              <span class="hamburger-box">
                <span class="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="app-header__mobile-menu">
        <div>
          <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
            <span class="hamburger-box">
              <span class="hamburger-inner" />
            </span>
          </button>
        </div>
      </div>
      <div class="app-header__menu">
        <span>
          <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
            <span class="btn-icon-wrapper">
              <i class="fa fa-ellipsis-v fa-w-6" />
            </span>
          </button>
        </span>
      </div>
      <div class="app-header__content">
        <div class="app-header-left">
          <TheTopSearch />
          <TheTopMenu />
        </div>
        <div class="app-header-right">
          <div class="header-dots">
            <TheTopDropdownDatabase />
            <TheTopDropdownDatabase />
            <TheTopDropdownWS />
            <TheTopDropdownLanguage />
            <TheTopDropdownNotifications />
          </div>
          <div class="header-btn-lg pe-0">
            <div class="widget-content p-0">
              <TheTopProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-main">
      <div class="app-sidebar sidebar-shadow">
        <div class="app-header__logo">
          <img src="https://www.lqd.cz/public/images/logo-white.svg" alt="" loading="lazy" height="33">
          <div class="header__pane ms-auto">
            <div>
              <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                <span class="hamburger-box">
                  <span class="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="app-header__mobile-menu">
          <div>
            <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
              <span class="hamburger-box">
                <span class="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
        <div class="app-header__menu">
          <span>
            <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
              <span class="btn-icon-wrapper">
                <i class="fa fa-ellipsis-v fa-w-6" />
              </span>
            </button>
          </span>
        </div>
        <div class="scrollbar-sidebar ps ps--active-y">
          <div class="app-sidebar__inner">
            <TheMenu />
          </div>
          <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;" /></div><div class="ps__rail-y" style="top: 0px; height: 750px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 397px;" /></div>
        </div>
      </div>
      <div class="app-main__outer">
        <div class="app-main__inner">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>