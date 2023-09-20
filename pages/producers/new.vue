<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="open=true">
    Launch demo modal {{ open }}
  </button>
  <a @click.prevent="test">asdasd</a>

  <input ref="testa" type="text">



  <!-- Modal -->
  <Teleport to="body">
    <div id="exampleModal" ref="testujeme" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">

const { $bootstrap } = useNuxtApp();

const open = ref(false);


const testujeme = ref(null);
const testa = ref(null);




function test() {
  const myModal = new $bootstrap.Modal(testujeme.value ?? '', {});
  myModal.show();
  console.log(testa);
  testa.value?.focus();
}

</script>