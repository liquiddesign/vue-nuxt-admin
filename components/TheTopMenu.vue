<template>
  <ul class="header-megamenu nav">
    <li v-if="hasPermission('administrators')" class="dropdown nav-item show">
      <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="router.push({name: 'administrators'})">
        <BaseIcon icon-name="Users" class="nav-link-icon" /> Administratori
      </a>
    </li>
    <li v-if="hasPermission('administrators')" class="dropdown nav-item show">
      <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="router.push({name: 'settings'})">
        <BaseIcon icon-name="Settings" class="nav-link-icon" /> Nastavení
      </a>
    </li>
    <li v-if="identity?.admin" class="dropdown nav-item">
      <a aria-haspopup="true" data-bs-toggle="dropdown" class="nav-link" aria-expanded="false">
        <BaseIcon icon-name="ToyBrick" class="nav-link-icon" /> Vývojář
        <BaseIcon icon-name="ChevronDown" class="ms-2 opacity-5" />
      </a>
      <div tabindex="-1" role="menu" aria-hidden="false" class="dropdown-menu-rounded dropdown-menu-lg rm-pointers dropdown-menu">
        <div class="dropdown-menu-header">
          <div class="dropdown-menu-header-inner bg-success">
            <div class="menu-header-content text-left">
              <h5 class="menu-header-title">Vývojář</h5>
            </div>
          </div>
        </div>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-basic'})">
          <BaseIcon icon-name="Circle" fill="#d92550" class="dropdown-icon text-danger" :size="18" /> Struktura a navigace
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-basic'})">
          <BaseIcon icon-name="Circle" fill="#d92550" class="dropdown-icon text-danger" :size="18" /> Základní UI
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-button'})">
          <BaseIcon icon-name="Circle" fill="black" class="dropdown-icon text-black" :size="18" /> Tlačítka
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-flags'})">
          <BaseIcon icon-name="Circle" fill="#f7b924" class="dropdown-icon text-warning" :size="18" /> Ikony, avataři a vlajky
        </button>
        <div tabindex="0" class="text-center mt-2 mb-1">
          Formuláře
        </div>

        <button type="button" tabindex="0" class="dropdown-item" :disabled="true" @click="router.push({name: 'developer-form'})">
          <BaseIcon icon-name="Circle" fill="black" class="dropdown-icon text-black" :size="18" /> Formulář
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true" @click="router.push({name: 'developer-controls'})">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Formulářové komponenty
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true" @click="router.push({name: 'developer-button'})">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Tabulky
        </button>
        <div tabindex="0" class="text-center mt-2 mb-1">
          Tabulky
        </div>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true" @click="router.push({name: 'developer-button'})">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Komentáře
        </button>
        <div tabindex="-1" class="dropdown-divider" />
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Helpery
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Uživatel
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Oprávnění
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Bezpečnost
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Live-feed (notifikace, akce)
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Jazyky
        </button>
        <button type="button" tabindex="0" class="dropdown-item" :disabled="true">
          <BaseIcon icon-name="Circle" class="dropdown-icon" /> Debug
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const router = useRouter();
const { identity, hasPermission } = useUser();
</script>