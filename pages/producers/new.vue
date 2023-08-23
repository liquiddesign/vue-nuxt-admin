<template>

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="open=true">
    Launch demo modal {{ open }}
  </button>
  <a @click.prevent="test">asdasd</a>

  <input ref="testa" type="text">



  <!-- Modal -->
  <Teleport to="body">
    <div class="modal fade" ref="testujeme" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
  let myModal = new $bootstrap.Modal(testujeme.value ?? '', {});
  myModal.show();
  console.log(testa);
  testa.value?.focus();
}

</script>