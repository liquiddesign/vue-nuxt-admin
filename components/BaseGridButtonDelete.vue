<template>
  <Popper arrow placement="left">
    <button v-bind="$attrs" class="btn btn-sm btn-xs btn-danger"><i class="fa fa-trash-o" /></button>
    <template #content="{close}">
      Opravdu smazat?<br>
      <div class="text-center">
        <button class="btn btn-success btn-xs" @click="close();$parent.deleteRow()">Ano</button>
        <button class="btn btn-light btn-xs ms-2" @click="close">Ne</button>
      </div>
    </template>
  </Popper>
</template>
<script setup lang="ts">
import Popper from "vue3-popper";

</script>