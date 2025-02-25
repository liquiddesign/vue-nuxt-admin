<template>
  <div>
    <div v-if="isUpdate" class="alert alert-dismissible fade show alert-primary py-2" style="display: flex" role="alert">
      Záznam byl změněn. Chcete jej znovu načíst?
      <button class="btn btn-outline-secondary btn-xs ms-2 btn" @click="isUpdate = false;$emit('refresh')"><!--v-if--><BaseIcon icon-name="RefreshCw" /> </button>
    </div>
    <div v-if="isDelete" class="alert alert-dismissible fade show alert-danger py-2" style="display: flex" role="alert">Záznam byl smazán</div>
    <div v-if="isTyping" class="alert alert-dismissible fade show alert-alternate py-2" style="display: flex" role="alert">
      <div style=" display: flex;"> Záznam je právě editován</div>
      <div class="typing-indicator ms-3 pt-1">
        <span class="dot" />
        <span class="dot" />
        <span class="dot" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {type Ref} from 'vue';
const $emit = defineEmits(['refresh']);

const isDelete: Ref<boolean> = ref(false);
const isUpdate: Ref<boolean> = ref(false);
const isTyping: Ref<boolean> = ref(false);

const { onTyping, onUpdate, onDelete, removeOnTyping, removeOnUpdate, removeOnDelete} = useLiveFeed();

const props = defineProps<{
  recordId?: string,
}>();

const clear = function () {
  isTyping.value = false;
  isUpdate.value = false;
  isDelete.value = false;
};

const onTypingCallback = (id: string) => {
  if (props.recordId === id) {
    isTyping.value = true;
  }
};

const onUpdateCallback = (id: string) => {
  if (props.recordId === id) {
    isUpdate.value = true;
    isTyping.value = false;
  }
};

const onDeleteCallback = (id: string) => {
  if (props.recordId === id) {
    isDelete.value = true;
  }
};

onMounted(() => {
  onTyping(onTypingCallback);
  onUpdate(onUpdateCallback);
  onDelete(onDeleteCallback);
});

onUnmounted(() => {
  removeOnTyping(onTypingCallback);
  removeOnUpdate(onUpdateCallback);
  removeOnDelete(onDeleteCallback);
});

defineExpose({ clear } );

</script>