<template>
  <Teleport to="body">
    <div ref="modal" class="modal fade" @click.self="close()">
      <div class="modal-dialog modal-xl ">
        <div class="modal-content">
          <div v-if="$slots.header" class="modal-header">
            <slot name="header" />
          </div>
          <div v-else class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button ref="closeButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Zavřít" @click="close()" />
          </div>
          <div v-if="$slots.body || $slots.default" class="modal-body">
            <slot name="body" />
            <slot />
          </div>
          <div v-if="displayFooter || $slots.footer" class="modal-footer">
            <slot name="footer" :close="() => close()" />
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zavřít</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">

  withDefaults(defineProps<{
    title?: string,
    displayFooter?: boolean,
  }>(), {title: undefined, displayFooter: false});

  const emits = defineEmits([
      'opened', 'closed',
  ]);


  const { $bootstrap } = useNuxtApp();
  const modal = ref(null);
  const closeButton = ref(null);


  function open() {
    const myModal = new $bootstrap.Modal(modal.value ?? '', {});
    myModal.show();
    emits('opened');
  }

  function close() {
    document.activeElement?.blur();
    const myModal = $bootstrap.Modal.getInstance(modal.value ?? '');
    myModal?.hide();
    emits('closed');
  }

  defineExpose({ open, close } );
</script>