<template>
  <ul class="header-megamenu nav">
    <li v-if="hasPermission('administrators')" class="dropdown nav-item show">
      <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="router.push({name: 'administrators'})">
        <IconUsers class="nav-link-icon" size="16" /> Administratori
      </a>
    </li>
    <li v-if="hasPermission('administrators')" class="dropdown nav-item show">
      <a aria-haspopup="true" data-toggle="dropdown" class="nav-link" aria-expanded="true" @click="router.push({name: 'settings'})">
        <i class="nav-link-icon pe-7s-settings" /> Nastavení
      </a>
    </li>
    <li v-if="identity?.admin" class="dropdown nav-item">
      <a aria-haspopup="true" data-bs-toggle="dropdown" class="nav-link" aria-expanded="false">
        <i class="nav-link-icon pe-7s-plugin" /> Vývojář
        <i class="fa fa-angle-down ms-2 opacity-5" />
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
          <i class="dropdown-icon text-danger fa fa-circle" />Struktura a navigace
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-basic'})">
          <i class="dropdown-icon text-danger fa fa-circle" />Základní UI
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-button'})">
          <i class="dropdown-icon text-black fa fa-circle" />Tlačítka
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-flags'})">
          <i class="dropdown-icon text-warning fa fa-circle" />Ikony, avataři a vlajky
        </button>
        <div tabindex="0" class="text-center mt-2 mb-1">
          Formuláře
        </div>

        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-form'})">
          <i class="dropdown-icon lnr-file-empty" />Formulář
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-controls'})">
          <i class="dropdown-icon lnr-file-empty" />Formulářové komponenty
        </button>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-button'})">
          <i class="dropdown-icon lnr-file-empty" />Tabulky
        </button>
        <div tabindex="0" class="text-center mt-2 mb-1">
          Tabulky
        </div>
        <button type="button" tabindex="0" class="dropdown-item" @click="router.push({name: 'developer-button'})">
          <i class="dropdown-icon lnr-file-empty" />Komentáře
        </button>
        <div tabindex="-1" class="dropdown-divider" />
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Helpery
        </button>
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Uživatel
        </button>
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Oprávnění
        </button>
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Bezpečnost
        </button>
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Live-feed (notifikace, akce)
        </button>
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Jazyky
        </button>
        <button type="button" tabindex="0" class="dropdown-item">
          <i class="dropdown-icon lnr-file-empty" />Debug
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">

import { Users as IconUsers } from 'lucide-vue-next';

const router = useRouter();
const { identity, hasPermission } = useUser();

</script>