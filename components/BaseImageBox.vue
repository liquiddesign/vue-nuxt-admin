<template>
  <BaseWrapper :wrap="wrap">
    <div class="">
      <BaseButtonSave class="btn-xs" style="border: 1px solid rgb(128,128,128);" />
      <input v-bind="$attrs" type="file" class="form-control-file" accept="image/*" @change="onFileChanged" />
      <small class="form-text text-muted">
        min. š/v: 400/400px. | max. š/v: 400/400px. | upload: <span class="text-danger">0/2MB</span> | souborů: 0/1
      </small>
      <small></small>
    </div>
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
}>(), { label: undefined, wrap : undefined, uploading: false, validExtensions: () => ['jpg','jpeg','png'] });

defineOptions({
  inheritAttrs: false
})

const canUpload = computed(() => {
  return props.disabled;
});

const totalUploadSize = computed(() => {
  return props.disabled;
});

const totalUploadAmount = computed(() => {
  return props.disabled;
});

const errorMinSize = computed(() => {
  return props.disabled;
});

const errorMaxSize = computed(() => {
  return props.disabled;
});

const errorUploadSize = computed(() => {
  return props.disabled;
});

const errorUploadAmount = computed(() => {
  return props.disabled;
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
  delete files.value[index];
}

function isValidExtension(fileName: string)
{
  return props.validExtensions.includes(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase());
}

</script>