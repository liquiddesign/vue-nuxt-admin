<template>
  <div class="accordion-item">
    <h2 :id="`panelsStayOpen-heading${id}`" class="accordion-header">
      <button
        class="accordion-button collapsed"
        :style="disabled && !styleAsNonDisabled ? 'opacity:0.5;' : ''"
        :disabled="disabled"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#panelsStayOpen-collapse${id}`"
        aria-expanded="false"
        :aria-controls="`panelsStayOpen-collapse${id}`"
      >
        <div class="d-flex align-items-baseline">
          <h5 class="m-0 card-title">
            {{ header }}
          </h5>
          <slot v-if="!disabled" name="header" />
        </div>
      </button>
    </h2>
    <div
      :id="`panelsStayOpen-collapse${id}`"
      class="accordion-collapse collapse"
      :class="{ show: showByDefault }"
      :aria-labelledby="`panelsStayOpen-heading${id}`"
    >
      <div v-if="$slots.body || $slots.default" class="accordion-body overflow-auto">
        <slot name="body" /><slot name="default" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  header: {
    type: String,
    required: true,
  },
  showByDefault: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  styleAsNonDisabled: {
    type: Boolean,
    default: false,
  },
});

const id = ref<string>('');

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

onMounted(() => {
  id.value = generateUUID();
});
</script>