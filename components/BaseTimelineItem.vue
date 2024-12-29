<template>
  <div class="vertical-timeline-item" :class="`dot-${type} vertical-timeline-element`">
    <div>
      <span class="vertical-timeline-element-icon bounce-in"></span>
      <div class="vertical-timeline-element-content bounce-in">
        <h4 class="timeline-title">
          <slot />
        </h4>
        <p v-if="message">{{ message }}</p>
        <div v-if="avatars && avatars.length" class="avatar-wrapper mt-2 avatar-wrapper-overlap">
          <div v-for="(avatar, avatarIndex) in avatars" :key="avatarIndex" class="avatar-icon-wrapper avatar-icon-sm">
            <BaseAvatar :user-id="avatar" />
          </div>
        </div>
        <span class="vertical-timeline-element-date">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props for NotificationItem with validation
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['danger', 'warning', 'success', 'info', 'primary'].includes(value),
  },
  message: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
  avatars: {
    type: Array,
    default: () => [],
    validator: (value) => value.every((avatar) => avatar.image || avatar.initials),
  },
});
</script>