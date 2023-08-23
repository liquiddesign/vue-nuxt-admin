<template>
  <BaseCardHeader title="Přijaté objednávky" icon="pe-7s-box1" description="Objednávky předfiltrované dle stavů">

    <button type="button" class="me-2 btn btn-sm btn-outline-alternate">
      <i class="fa fa-ban"></i> Blokováno (0)
    </button>
    <button type="button" class="me-2 btn btn-sm btn-outline-secondary">
      <i class="fa fa-cogs"></i>
    </button>
  </BaseCardHeader>
  <div class="row">
    <div class="col-lg-6">
      <ul class="tabs-animated-shadow tabs-animated nav nav-justified">
        <li class="nav-item">
          <a role="tab" class="nav-link active show" href="javascript:void(0);" aria-selected="true">
            <span>Přijaté</span>
          </a>
        </li>
        <li class="nav-item">
          <a role="tab" class="nav-link bg-light" href="javascript:void(0);" aria-selected="false">
            <span>Odeslané</span>
          </a>
        </li>
        <li class="nav-item">
          <a role="tab" class="nav-link bg-light" href="javascript:void(0);" aria-selected="false">
            <span>Stornované</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <BaseCard>

    Tabulka
  </BaseCard>
</template>
<script setup lang="ts">
</script>