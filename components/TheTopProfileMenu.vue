<template>
  <div class="widget-content-wrapper">
    <div class="widget-content-left">
      <div class="btn-group">
        <a data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn" style="border: 0; cursor: pointer;">
          <BaseAvatar :user-id="identity?.uuid ?? null" style="width: 45px; font-size: 18px;" />
          <i class="fa fa-angle-down ms-2 opacity-8" />
        </a>
        <div tabindex="-1" role="menu" class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
          <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner bg-amy-crisp">
              <div class="menu-header-image" />
              <div class="menu-header-content text-start">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left me-3">
                      <BaseAvatar :user-id="identity?.uuid ?? null" style="width: 45px; font-size: 18px;" />
                    </div>
                    <div class="widget-content-left">
                      <div class="widget-heading">{{ identity?.surname }} {{ identity?.name }}</div>
                      <div class="widget-subheading opacity-8">{{ identity?.account?.login }}</div>
                    </div>
                    <div class="widget-content-right me-2">
                      <button class="btn-pill btn-shadow btn-shine btn btn-focus" @click.prevent.stop="logoutAction">Odhlásit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="ps-2 mb-0">
            <span>Přezdívka:</span> {{ identity?.nickname }}<br>
            <span>Role:</span> {{ identity?.role }}
          </p>
          <ul class="nav flex-column">
            <li class="nav-item-divider nav-item" />
            <li class="nav-item-btn text-center nav-item">
              <button class="btn-wide btn btn-success btn-sm" @click="navigateTo({name: 'profile'})"><i class="fa fa-edit" /> Editovat profil </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="widget-content-left  ms-3 header-user-info">
      <div class="widget-heading">
        {{ identity?.surname }} {{ identity?.name }}
      </div>
      <div class="widget-subheading">
        {{ identity?.account?.login }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const { identity, logout } = useUser();

async function logoutAction() {

  await logout();
  navigateTo('/');
  console.log('logouted');
}

</script>