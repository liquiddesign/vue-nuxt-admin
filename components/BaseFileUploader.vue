<template>
  <label :for="id + 'file'" class="btn btn-outline-secondary btn-sm upload-file-label bg-white" :class="{'btn-outline-light pointer-none': maxFilesExceeded, disabled: !canUpload}">
    <i class="fa fa-paperclip" />
    {{ labelUpload }}
  </label>
  <input :id="id + 'file'" class="d-none" type="file" :accept="props.acceptedFileTypes" :disabled="!canUpload" :multiple="multiple" @change="onFileChanged">

  <div class="bg-success-subtle">
    TOTAL FILES<br>
    MB LEFT<br>
  </div>
  {{ files }}
</template>
<script setup lang="ts">


const props = defineProps({
  url: {
    type: String,
    required: true,
  },
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
  storeDirectory: {
    type: String,
    required: true,
  },
});

const id: string = 'TODOUUID';

const files: Ref<any[]> = ref([]);
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
  maxUploadReached = false;

  const target = $event.target as HTMLInputElement;
  if (target.files) {

    const newFiles = [];
    for (let i = 0; i < target.files.length; i++) {
      if (files.value.length >= props.maxFiles && props.maxFiles !== null) {
        console.error('max file reached');
        break;
      }

      if (files.value.length >= maxUploadLimit) {
        this.maxUploadReached = true;
        console.error('max uploader reached');
        break;
      }

      let fileUpload = target.files[i];

      const file = {hash: this.$helpers.uuidv4(), fileUpload, uploadProcess: null, isImage: !!fileUpload.type?.startsWith('image/'), uploaded: null, dbObject: {}};

      if (!this.isValidExtension(fileUpload.name)) {
        continue;
      }

      if (this.maxUploadSize !== null && file.size > this.maxUploadSize) {
        this.$toast.error('Soubor ' + file.name + ' má větší než max. povolnou velikost (' + (Math.round(this.maxUploadSize / 1024 / 1024)) + ' MB)');

        continue;
      }

      file.objectSrc = URL.createObjectURL(fileUpload);

      this.blobToDataURL(fileUpload, function(dataUrl) {
        file.dataSrc = dataUrl;
      });

      this.files.push(file);
      newFiles.push(file);
    }

    this.$emit('filesSelected', newFiles);

    event.target.value = '';

    if (this.autoUpload && newFiles.length) {
      this.upload();
    }
  }
}



</script>