<template>
  <div class="upload-files">
    <label :for="id + 'file'" class="btn btn-outline-secondary btn-sm upload-file-label bg-white" :class="{'btn-outline-light pointer-none': maxFilesExceeded, disabled: !canUpload}">
      <i class="fa fa-paperclip" />
      {{ labelUpload }}
    </label>
    <input :id="id + 'file'" class="d-none" type="file" :accept="props.acceptedFileTypes" :disabled="!canUpload" :multiple="multiple" @change="onFileChanged">

    <template v-for="(file) in files" :key="file.hash">
      <div class="upload-file" :style="file.isImage ? ('background-image: ' + (!file.uploaded ? 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)),' : '') + 'url(\'' + getImageSrc(file) + '\');') : ''">

        <div v-if="!file.isImage">
          <div class="upload-file-doc" >
            {{ file.isImage }}
            <i class="far fa-file-pdf fa-2x text-danger mb-2"></i>
            10 MB
          </div>
        </div>

        <div class="upload-file-controls">
          <button v-if="0" class="btn btn-xs upload-button-control me-1" type="button">{{ file.dbObject?.priority }}</button>
          <button v-if="downloadUrl && file.uploaded" type="button" class="btn btn-xs upload-button-control" :disabled="busy[file.hash]" @click.prevent.stop="downloadFile(file)"><i class="fa fa-download" /></button>
          <button v-if="canRotate && file.isImage && file.uploaded" type="button" class="btn btn-xs upload-button-control" :disabled="busy[file.hash]" @click.prevent.stop="rotateImage(file, 90)"><i class="fa fa-rotate-left" /></button>
          <button v-if="canRotate && file.isImage && file.uploaded" type="button" class="btn btn-xs upload-button-control" :disabled="busy[file.hash]" @click.prevent.stop="rotateImage(file, -90)"><i class="fa fa-rotate-right" /></button>
        </div>

        <div class="upload-file-progress">
          <button v-if="file.uploaded === false" class="btn btn-xs upload-button-control me-1" type="button" @click.prevent.stop="file.uploaded = null; upload()"><i class="fa fa-upload" /></button>
          <button v-if="file.uploadProcess" class="btn btn-xs upload-button-control" type="button" @click.prevent.stop="stopUpload(file.uploadProcess.id)"><i class="fa fa-stop" /></button>
          <button v-if="1" :disabled="busy[file.hash]" class="btn btn-xs upload-button-cancel" type="button" @click.prevent.stop="removeFile(file)"><i class="fa fa-times" /></button>
          <button v-if="canDelete && file.uploaded && !file.uploadProcess && file.dbObject?.uuid && !disabled" :disabled="busy[file.hash]" class="btn btn-xs upload-button-cancel" type="button" @click.prevent.stop="deleteFile(file)"><i class="fa fa-times" /></button>
        </div>

      </div>
    </template>
  </div>
</template>
<script setup lang="ts">

import {generateUUID} from '~/utils/helpers';
import {type ToastPluginApi, useToast} from 'vue-toast-notification';
import axios from 'axios';

const $emit = defineEmits(['filesSelected']);

interface FileData {
  hash: string;
  name: string;
  size: number;
  fileUpload: File;
  uploadProcess: UploadProcess | null;
  isImage: boolean;
  uploaded: any | null;
  dbObject: object;
  objectSrc?: string;
  dataSrc?: string;
}

interface UploadProcess {
  progress: number;
  controller: AbortController;
}

const props = defineProps({
  downloadUrl: {
    type: String,
    default: null,
  },
  labelUpload: {
    type: String,
    default: 'Nahrát soubor',
  },
  labelCamera: {
    type: String,
    default: 'Pořídit snímek',
  },
  maxFiles: {
    type: Number,
    default: null,
  },
  canRotate: {
    type: Boolean,
    default: true,
  },
  canRename: {
    type: Boolean,
    default: true,
  },
  canMove: {
    type: Boolean,
    default: false,
  },
  canDelete: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  validExtensions: {
    type: Array,
    default: null,
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
  hideUploadIfExceeded: {
    type: Boolean,
    default: true,
  },
  camera: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onlyGallery: {
    type: Boolean,
    default: false,
  },
  clearOnSuccess: {
    type: Boolean,
    default: false,
  },
  acceptedFileTypes: {
    type: Array,
    default: null,
  },
  dbFiles: {
    type: Array,
    default: () => [],
  },
});

const id: string = 'TODOUUID';

const busy: Ref<object> = ref({});
const files: Ref<any[]> = ref([]);
const uploadProcesses: Ref<Record<string, UploadProcess>> = ref({});
const maxUploadReached: Ref<boolean> = ref(false);
const toast: ToastPluginApi = inject('toast', useToast());

const { settings } = useUser();

const totalUploadAmount:ComputedRef<number> = computed(() => {
  return files.value.length;
});

const totalUploadSize = computed(() => {
  let sum: number = 0;
  files.value.forEach((file) => {
    sum += file.size;
  });

  return Math.round(sum / 1024 / 1024);
});

const errorUploadSize: ComputedRef<boolean> = computed(() => {
  return totalUploadSize.value > settings.value.maxFilesize;
});

const canUpload: ComputedRef<boolean> = computed(() => {
  return !props.disabled;
});

const maxFilesExceeded: ComputedRef<boolean> = computed(() => {
  return false;
});

function isValidExtension(fileName: string)
{
  return props.validExtensions === null || props.validExtensions.includes(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase());
}

function onFileChanged($event: Event) {
  maxUploadReached.value = false;

  const target = $event.target as HTMLInputElement;
  if (target.files) {

    const newFiles = [];
    for (let i = 0; i < target.files.length; i++) {
      if (files.value.length >= props.maxFiles && props.maxFiles !== null) {
        console.error('max file reached');
        break;
      }

      if (files.value.length >= settings.value.maxFilesize) {
        maxUploadReached.value = true;
        console.error('max uploader reached');
        break;
      }

      const fileUpload = target.files[i];

      const file: FileData = {
        hash: generateUUID(),
        name: '',
        size: fileUpload.size,
        fileUpload,
        uploadProcess: null,
        isImage: !!fileUpload.type?.startsWith('image/'),
        uploaded: null,
        dbObject: {},
      };

      if (!isValidExtension(fileUpload.name)) {
        continue;
      }

      if (settings.value.maxFilesize !== null && file.size > settings.value.maxFilesize) {
        toast.error('Soubor ' + file.name + ' má větší než max. povolnou velikost (' + (Math.round(settings.value.maxFilesize / 1024 / 1024)) + ' MB)');

        continue;
      }

      files.value.push(file);
      file.objectSrc = URL.createObjectURL(fileUpload);

      blobToDataURL(fileUpload, function(dataUrl) {
        file.dataSrc = dataUrl;
        files.value = [...files.value];
      });


      newFiles.push(file);
    }

    $emit('filesSelected', newFiles);

    target.value = '';

    if (props.autoUpload && newFiles.length) {
      upload();
    }
  }
}

function upload() {
  console.log('upload');

  const url = 'http://localhost/vue-nuxt-api/api/file';

  // prepare upload process
  const id: string = generateUUID();
  uploadProcesses.value[id] = {progress: 0, controller: new AbortController()};

  files.value.forEach((value) => {
    if (!value.uploaded) {
      value.uploadProcess = uploadProcesses.value[id];
    }
  });

  return axios.post(url, getUploadData(), {
    headers: {'content-type': 'multipart/form-data'},
    signal: uploadProcesses.value[id].controller.signal,
    onUploadProgress: (progressEvent : any) => {
      uploadProcesses.value[id].progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    },
  }).then((response: any) => {
    const uploaded = [];
    files.value.filter(v => v.uploadProcess?.id === id).forEach((value) => {

      if (value.uploaded !== null) {
        return;
      }

      value.uploadProcess = null;

      if (response.data.result[value.hash]) {
        value.uploaded = true;
        Object.assign(value.dbObject, response.data.result[value.hash]);
        uploaded.push(value);
      } else {
        console.error('not in result', value.hash, response.data.result);
        value.uploaded = false;
        toast.error('Soubor byl odmítnut serverem.');
      }
    });
    delete uploadProcesses.value[id];

    if (props.clearOnSuccess) {
      files.value.splice(0);
    }
  }).catch((x) => {
    if (x instanceof CanceledError) {
      $emit('canceled', x);
    } else {
      //if (this.maxUploadSize !== null && getUploadSize() > this.maxUploadSize) {
      if (0) {
        toast.error('Soubory mají větší než max. povolenou velikost (' + (Math.round(this.maxUploadSize / 1024 / 1024)) + ' MB). Zkuste je nahrát po menších dávkách.');
      } else {
        toast.error('Soubor se nepodařilo nahrát.');
      }
    }

    files.value.forEach((value) => {
      value.uploadProcess = null;
      value.uploaded = false;
    });
    console.error('upload error', x);

    delete uploadProcesses.value[id];
  });
}

function blobToDataURL(blob: Blob, callback: (dataUrl: string) => void): void {
  const reader = new FileReader();
  reader.onload = function(event) {
    if (event.target?.result) {
      callback(event.target.result as string);
    }
  };
  reader.readAsDataURL(blob);
}

const getUploadData = () => {
  const data = new FormData();
  const hashes = [];
  data.append('name', 'attachments');

  for (let i = 0; i < files.value.length; i++) {
    if (files.value[i].uploadProcess !== null && !files.value[i].uploaded) {
      data.append(i.toString(), files.value[i].fileUpload);
      hashes.push(files.value[i].hash);
    }
  }

  data.append('hashes', JSON.stringify(hashes));

  return data;
};

const getImageSrc = (file: FileData, imgSize = 'medium') => {
  return file.dbObject?.fileName ? 'test/' + file.dbObject.fileName + '?lm=' + Date.parse(file.dbObject.lastModified) : file.dataSrc;
};

const removeFile = (file: FileData) => {
  delete files.value[file.hash];
};



</script>
<script setup lang="ts">
</script>