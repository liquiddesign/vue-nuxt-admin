<template>
  <BaseWrapper :wrap="wrap">
    <div class="">
      <input v-if="totalUploadAmount + test.length < maxFiles" v-bind="$attrs" type="file" class="form-control-file" :accept="accept" :disabled="totalUploadAmount + test.length >= maxFiles || $attrs['disabled']" :multiple="maxFiles > 1" @change="onFileChanged">
      <small class="form-text text-muted">
        <template v-if="minHeight || minWidth">min. š/v: <span :class="{'text-danger': errorMinSize}">{{ minWidth ?? '-' }}/{{ minHeight ?? '-' }}px</span> | </template>
        <template v-if="maxHeight || maxWidth">max. š/v: <span :class="{'text-danger': errorMaxSize}">{{ maxWidth ?? '-' }}/{{ maxHeight ?? '-' }}px</span> | </template>
        <template v-if="totalUploadAmount + test.length < maxFiles">
          upload: <span :class="{'text-danger': errorUploadSize}">{{ totalUploadSize }}/{{ maxUploadSize }}MB</span> |
          souborů: {{ totalUploadAmount }}/{{ maxFiles }}
        </template>
      </small>
    </div>
    <slot />
    <div v-if="tmpFiles" class="d-flex align-items-center flex-wrap gap-1 grid-filter">
      <div v-for="(file, i) in tmpFiles" :key="file.name" class="flex-shrink-0">
        <img :src="file.src" alt="" class="img-thumbnail" style=" max-height: 100px; max-width: 100px; opacity: 0.3;filter: alpha(opacity=40);" title="obrázek se nahraje po uložení formuláře">
        <br>
        <div class="text-center">
          <small>{{ file.name }}</small>
          <span v-if="uploading" class="btn btn-xs btn-light disabled"><i class="fa fa-circle-o-notch fa-spin" /></span>
          <span v-if="!uploading" :title="file.width + 'px /' + file.height + 'px (' + Math.round(file.size / 1024 / 1024) + 'MB)'" class="px-1" style="position: relative; top: 2px;"><i class="fa fa-info-circle" /></span>
          <BaseButtonDelete class="btn-xs btn-light" @click.prevent="removeUpload(i)" />
        </div>
      </div>
    </div>

    <div v-if="test" class="d-flex align-items-center flex-wrap gap-1 grid-filter">
      <div v-for="(file, i, index) in test" :key="index" class="flex-shrink-0">
        <template v-if="file">
          <img :src="`http://localhost/roiwell/userfiles/delivery-type/61f276288773062696506931/thumbs/${file}`" alt="" class="border border-3 border-dark-subtle">
          <br>
          <div class="text-center">
            <small>{{ file }}</small>
            <BaseButtonDelete class="btn-xs btn-light" @click.prevent="deleteImage(i)" />
          </div>
        </template>
      </div>
    </div>
  </BaseWrapper>
</template>
<script setup lang="ts">

import {ComputedRef, inject, Ref} from 'vue';
import {ToastPluginApi, useToast} from 'vue-toast-notification';

const tmpFiles: Ref<any[]> = ref([]);

const props = withDefaults(defineProps< {
  label? : string,
  url?: string|null,
  slug?: string|null,
  testx?: string|null,
  action?: string|null,
  wrap? : string,
  files?: string[],
  validExtensions?: string[],
  maxFiles?: number,
  maxUploadSize?: number,
  minHeight?: number,
  maxHeight?: number,
  minWidth?: number,
  maxWidth?: number,
  silent?: boolean,
}>(), { label: undefined, url: null, slug: null, testx: null, action: null, wrap : undefined, files: () => [], maxFiles: 1, maxUploadSize: 10, minHeight: 0, minWidth: 0, maxHeight: undefined, maxWidth: undefined, silent: true, validExtensions: () => ['jpg', 'jpeg', 'png'] });

defineOptions({
  inheritAttrs: false,
});

const test: Ref<string[]> = ref([]);
const uploading: Ref<boolean> = ref(false);
//const test2 = reactive({'a': props.testx});
//const test2 = toRef(props, 'testx');

watch(() => props.files, (value: string[]) => {
  test.value = [...value];
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
  tmpFiles.value.forEach((file) => {
    sum += file.size;
  });

  return Math.round(sum / 1024 / 1024);
});

const totalUploadAmount:ComputedRef<number> = computed(() => {
  return tmpFiles.value.length;
});

const errorMinSize = computed(() => {
  tmpFiles.value.forEach((file) => {
    if (file.height < props.minHeight || file.width < props.minWidth) {
      return true;
    }
  });

  return false;
});

const errorMaxSize = computed(() => {
  tmpFiles.value.forEach((file) => {
    if ((props.maxHeight !== undefined && file.height > props.maxHeight) || (props.maxWidth !== undefined && file.width > props.maxWidth)) {
      return true;
    }
  });

  return false;
});

const errorUploadSize: ComputedRef<boolean> = computed(() => {
  return props.maxUploadSize !== undefined && totalUploadSize.value > props.maxUploadSize;
});

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      if (isValidExtension(file.name)) {
        const url = URL.createObjectURL(file);

        const fileObject: any = ref({name: file.name, src: url, size: file.size, width: null, height: null, sourceFile: file});
        const img = new Image;
        img.src = url;
        img.onload = function() {
          fileObject.value.width = img.width;
          fileObject.value.height = img.height;
          URL.revokeObjectURL(img.src);
        };

        tmpFiles.value.push(fileObject.value);
      }
    }
  }
}

function removeUpload(index: number)
{
  tmpFiles.value.splice(index, 1);
}

function isValidExtension(fileName: string)
{
  return props.validExtensions.includes(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase());
}

const emit = defineEmits(['success', 'error']);
const toast: ToastPluginApi = inject('toast', useToast());
const config = useRuntimeConfig();

function upload(slug = null)
{

  if (!tmpFiles.value.length) {
    return;
  }

  uploading.value = true;

  const data = new FormData();
  for (let i = 0; i < tmpFiles.value.length; i++) {
    data.append(i.toString(), tmpFiles.value[i].sourceFile);
  }

  tmpFiles.value.splice(0, tmpFiles.value.length);

  $fetch(config.public.baseURL + props.url + '/' + (slug ?? props.slug) + '/' + props.action, {body: data, method: 'POST'})
      .then((result) => {
        console.log('ok');
        props.silent || toast.success('Uloženo');
        test.value.splice(0, test.value.length);
        tmpFiles.value.splice(0, tmpFiles.value.length);

        for (let i = 0; i < tmpFiles.value.length; i++) {
          tmpFiles.value.splice(i, 1);
         // test.value.push(aux);
        }

        emit('success', result);

      }).catch((error) => {
    emit('error', error);
    props.silent || toast.error(error.message);
  }).finally(() => {
    uploading.value = false;
  });
}

function deleteImage(key: number)
{
 // test2.value = 'pes';
  console.log(key);
  $fetch(config.public.baseURL + props.url + '/' + props.slug + '/' + props.action, {method: 'DELETE'});

  test.value.splice(0, 1);
  //test.value[0] = 'pes';

}

defineExpose({ canUpload, tmpFiles, upload });

</script>