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
          <div class="search-wrapper">
            <div class="input-holder">
              <input ref="searchBox" type="text" class="search-input" placeholder="Vyhledejte klienta, nemovitost">
              <button class="search-icon">
                <span />
              </button>
            </div>
            <button class="bg-transparent border-0 btn-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-white bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
          <ul class="header-megamenu nav">
            <li class="dropdown nav-item show">
              <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="$router.push({name: 'administratorsUsers'})">
                <i class="nav-link-icon pe-7s-users" /> Administratori
              </a>
            </li>
            <li class="dropdown nav-item show">
              <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="$router.push({name: 'settings'})">
                <i class="nav-link-icon pe-7s-settings" /> Nastavení
              </a>
            </li>
            <li class="dropdown nav-item show">
              <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="$router.push({name: 'developer'})">
                <i class="nav-link-icon pe-7s-plugin" /> Stavební bloky
              </a>
            </li>
          </ul>
        </div>
        <div class="app-header-right">
          <div class="header-dots">
            <div class="dropdown">
              <button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class="p-0 me-2 btn btn-link">
                <span class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span class="icon-wrapper-bg bg-danger" />

                  <i class="icon text-danger  ion-android-notifications" :class="{'icon-anim-pulse': false}" />
                  <span v-if="0" class="badge badge-dot badge-dot-sm bg-danger">Notifications</span>
                </span>
              </button>
              <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right">
                <div class="dropdown-menu-header mb-0">
                  <div class="dropdown-menu-header-inner bg-deep-blue">
                    <div class="menu-header-image opacity-1" />
                    <div class="menu-header-content text-dark">
                      <h5 class="menu-header-title">Notifications</h5>
                      <h6 class="menu-header-subtitle">
                        You have
                        <b>21</b> unread messages
                      </h6>
                    </div>
                  </div>
                </div>
                <ul class="tabs-animated-shadow tabs-animated nav nav-justified tabs-shadow-bordered p-3">
                  <li class="nav-item">
                    <a role="tab" class="nav-link active" data-bs-toggle="tab" href="#tab-messages-header" aria-selected="true">
                      <span>Messages</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a role="tab" class="nav-link" data-bs-toggle="tab" href="#tab-events-header" aria-selected="false">
                      <span>Events</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a role="tab" class="nav-link" data-bs-toggle="tab" href="#tab-errors-header" aria-selected="false">
                      <span>System Errors</span>
                    </a>
                  </li>
                </ul>
                <div class="tab-content" />
                <ul class="nav flex-column">
                  <li class="nav-item-divider nav-item" />
                  <li class="nav-item-btn text-center nav-item">
                    <button class="btn-shadow btn-wide btn-pill btn btn-focus btn-sm">View Latest Changes</button>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="0" class="dropdown">
              <button type="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" class="p-0 me-2 btn btn-link">
                <span class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span class="icon-wrapper-bg bg-primary" />
                  <i class="icon text-primary ion-android-apps" />
                </span>
              </button>
              <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu-xl rm-pointers dropdown-menu dropdown-menu-right" style="">
                <div class="dropdown-menu-header">
                  <div class="dropdown-menu-header-inner bg-plum-plate">
                    <div class="menu-header-image" style="background-image: url('images/dropdown-header/abstract4.jpg');" />
                    <div class="menu-header-content text-white">
                      <h5 class="menu-header-title">Grid Dashboard</h5>
                      <h6 class="menu-header-subtitle">Easy grid navigation inside dropdowns</h6>
                    </div>
                  </div>
                </div>
                <div class="grid-menu grid-menu-xl grid-menu-3col">
                  <div class="g-0 row">
                    <div class="col-sm-6 col-xl-4">
                      <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3" />
                        Automation
                      </button>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3" />
                        Reports
                      </button>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3" />
                        Settings
                      </button>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3" />
                        Content
                      </button>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3" />
                        Activity
                      </button>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                      <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3" />
                        Contacts
                      </button>
                    </div>
                  </div>
                </div>
                <ul class="nav flex-column">
                  <li class="nav-item-divider nav-item" />
                  <li class="nav-item-btn text-center nav-item">
                    <button class="btn-shadow btn btn-primary btn-sm">Follow-ups</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="header-btn-lg pe-0">
            <div class="widget-content p-0">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="btn-group">
                    <a data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                      <img width="42" class="rounded-circle" src="https://demo.dashboardpack.com/architectui-html-pro/assets/images/avatars/1.jpg" alt>
                      <i class="fa fa-angle-down ms-2 opacity-8" />
                    </a>
                    <div tabindex="-1" role="menu" aria-hidden="true" class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                      <div class="dropdown-menu-header">
                        <div class="dropdown-menu-header-inner bg-amy-crisp">
                          <div class="menu-header-image" />
                          <div class="menu-header-content text-start">
                            <div class="widget-content p-0">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left me-3">
                                  <img width="42" class="rounded-circle" src="https://demo.dashboardpack.com/architectui-html-pro/assets/images/avatars/1.jpg" alt>
                                </div>
                                <div class="widget-content-left">
                                  <div class="widget-heading">asdasd asd as das</div>
                                  <div class="widget-subheading opacity-8">sadasd</div>
                                </div>
                                <div class="widget-content-right me-2">
                                  <button class="btn-pill btn-shadow btn-shine btn btn-focus" @click="logout">Odhlásit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="ps-2 mb-0">
                        <span>Přezdívka:</span> <br>
                        <span>Role:</span>
                      </p>
                      <ul class="nav flex-column">
                        <li class="nav-item-divider nav-item" />
                        <li class="nav-item-btn text-center nav-item">
                          <button class="btn-wide btn btn-success btn-sm"><i class="fa fa-edit" /> Editovat profil </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="widget-content-left  ms-3 header-user-info">
                  <div class="widget-heading">
                    {{ $user.identity?.fullname || 'Neznámé jméno' }}
                  </div>
                  <div class="widget-subheading">
                    {{ $user.identity?.account?.login }}
                  </div>
                </div>
              </div>
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

const { $user } = useNuxtApp();

function logout() {
  $user.logout() ;
  navigateTo('/');
}
</script>