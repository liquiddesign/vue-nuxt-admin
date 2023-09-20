<template>
  <Teleport to="body">
    <div id="exampleModal" ref="testujeme" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div class="modal-body text-center">
            <span style="font-size: larger">Opravdu smazat položku ?</span> <br><br>
            <button class="btn btn-success me-2">Ano</button>
            <button class="btn btn-light ms-2">Ne</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
</script>