<template>
  <BaseWrapper :wrap="wrap">
    <div class="">
      <BaseButtonSave class="btn-xs" style="border: 1px solid rgb(128,128,128);" :disabled="!canUpload" />
      <input v-bind="$attrs" type="file" class="form-control-file" :accept="accept" @change="onFileChanged" :disabled="totalUploadAmount >= maxFiles || $attrs['disabled']" :multiple="maxFiles > 1" />
      <small class="form-text text-muted">
        <template v-if="minHeight || minWidth">min. š/v: <span :class="{'text-danger': errorMinSize}">{{ minWidth ?? '-' }}/{{ minHeight ?? '-' }}px</span> | </template>
        <template v-if="maxHeight || maxWidth">max. š/v: <span :class="{'text-danger': errorMaxSize}">{{ maxWidth ?? '-' }}/{{ maxHeight ?? '-' }}px</span> | </template>
        upload: <span :class="{'text-danger': errorUploadSize}">{{ totalUploadSize }}/{{ maxUploadSize }}MB</span> |
        souborů: {{ totalUploadAmount }}/{{ maxFiles }}
      </small>
    </div>
    <slot />
    <template v-if="files" v-for="(file, i) in files" :key="file.name">
      <div class="text-center bg-light p-2">
      <img :src="file.src" alt="" class="img-thumbnail" style=" max-height: 100px; max-width: 100px; opacity: 0.3;filter: alpha(opacity=40);">
        <br>
        <small>{{ file.name }}</small>
        <button v-if="uploading" class="btn btn-xs btn-light disabled"><i class="fa fa-circle-o-notch fa-spin" /></button>
        <button v-if="!uploading" :title="file.width + 'px /' + file.height + 'px (' + Math.round(file.size / 1024 / 1024)  + 'MB)'" class="btn btn-xs btn-light"><i class="fa fa-info-circle" /></button>
        <BaseButtonDeleteLight class="btn-xs" @click.prevent="removeUpload(i)"/>
      </div>
    </template>
  </BaseWrapper>
</template>
<script setup lang="ts">

import {ComputedRef} from "vue";

const files: Ref<any[]> = ref([]);

const props = withDefaults(defineProps< {
  label? : string,
  wrap? : string,
  uploading? : boolean,
  validExtensions?: string[],
  maxFiles?: number,
  maxUploadSize?: number,
  minHeight?: number,
  maxHeight?: number,
  minWidth?: number,
  maxWidth?: number,
}>(), { label: undefined, wrap : undefined, uploading: false, maxFiles: 1, maxUploadSize: 10, minHeight: 0, minWidth: 0, validExtensions: () => ['jpg','jpeg','png'] });

defineOptions({
  inheritAttrs: false
});

const canUpload: ComputedRef<boolean> = computed(() => {
  return totalUploadAmount.value > 0 && !errorMinSize.value && !errorMaxSize.value && !errorUploadSize.value;
});

const accept: ComputedRef<string> = computed(() => {
  let accept = '';
  let i = 0;

  props.validExtensions.forEach((extension) => {
    if (i++ !== 0) {
      accept += ',';
    }
    accept += 'image/' + extension;
  });
  accept.substring(0, -1);

  return accept;
});

const totalUploadSize = computed(() => {
  let sum: number = 0;
  files.value.forEach((file) => {
    sum += file.size
  });

  return Math.round(sum / 1024 / 1024);
});

const totalUploadAmount:ComputedRef<number> = computed(() => {
  return files.value.length;
});

const errorMinSize = computed(() => {
  files.value.forEach((file) => {
    if (file.height < props.minHeight || file.width < props.minWidth) {
      return true;
    }
  });

  return false;
});

const errorMaxSize = computed(() => {
  files.value.forEach((file) => {
    if ((props.maxHeight !== undefined && file.height > props.maxHeight) || (props.maxWidth !== undefined && file.width > props.maxWidth)) {
      return true;
    }
  });

  return false;
});

const errorUploadSize: ComputedRef<boolean> = computed(() => {
  return props.maxUploadSize !== undefined && totalUploadSize.value > props.maxUploadSize;
});

function onFileChanged($event: Event){
  const target = $event.target as HTMLInputElement;
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      if (isValidExtension(file.name)) {
        const url = URL.createObjectURL(file);

        const fileObject: any = ref({name: file.name, src: url, size: file.size, width: null, height: null});
        const img = new Image;
        img.src = url;
        img.onload = function() {
          fileObject.value.width = img.width;
          fileObject.value.height = img.height;
          URL.revokeObjectURL(img.src);
        };

        files.value.push(fileObject.value);
      }
    }
  }
}

function removeUpload(index: number)
{
  files.value.splice(index, 1);
}

function isValidExtension(fileName: string)
{
  return props.validExtensions.includes(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase());
}

defineExpose({ canUpload, files });

</script>