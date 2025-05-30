<template>
  <div class="row">
    <Mentionable :keys="['@']" :items="admins" :offset="6" insert-space dropdown-class="mention-dropdown" @apply="onMentionApply">
      <BaseTextArea v-model="newComment.content" class="form-control form-control-sm" placeholder="Pro zmínění administrátora použijte znak @ spolu s přezdívkou" />
      <template #no-result>
        <div class="dim">
          Nenalezeno
        </div>
      </template>
      <template #item="{ item }">
        <div class="mention-user">
          {{ item.firstName }} {{ item.surname }}
          <span class="fs-sm">&nbsp;({{ item.nickname }})</span>
        </div>
      </template>
    </Mentionable>
  </div>
  <div class="row mt-3 justify-content-between">
    <div class="w-auto">
      <BaseButton class="btn-success btn-sm me-1" @click.prevent="saveComment()">Uložit</BaseButton>
      <BaseButton class="btn-outline-secondary me-1 btn-sm"><BaseIcon icon-name="Ban" /> Nedovoláno</BaseButton>
    </div>
    <div class="w-auto row">
      <BaseTextBox v-model="newComment.callBack" type="date" label="Ozvat se:" wrap="col-lg-8 ms-auto" />
      <BaseCheckBox v-model="newComment.isContact" label="Editovat jako kontakt" wrap="col-lg-8 ms-auto mt-2" />
    </div>
  </div>
  <hr>
  <div class="row mt-4">
    <div class="col-lg-12">
      <template v-for="(comment, index) in comments" :key="index">
        <div v-if="comment.isSystem" class="d-flex align-items-center justify-content-between bg-light my-2" style="font-size: 0.9em;">
          <div class="px-2 py-1 rounded-pill">
            <span class="me-1" v-html="comment.content" />
          </div>
          <div class="pe-2 text-secondary text-nowrap">
            {{ comment.created }} |
            <BaseAvatar :user-id="comment.administrator.uuid ?? ''" :size="18" :image-name="comment.administrator.imageName" /> {{ comment.administrator.nickname }}
          </div>
        </div>
        <template v-else>
          <div class="mt-2 d-flex align-items-center justify-content-between bg-success-subtle" :class="comment.isExternal ? 'bg-danger-subtle' : ''" style="font-size: 0.9em;">
            <div class="px-2 py-1 rounded-pill d-flex gap-1 align-items-center">
              <a v-if="comment.isContact" title="Evidováno jako kontakt"><small><BaseIcon icon-name="Phone" /></small></a>
              <a v-if="comment.isUnanswered" title="Nedovoláno"><small><BaseIcon icon-name="Ban" /></small></a>
              <a v-if="comment.sendEmail" title="Poslán automatický email"><small><BaseIcon icon-name="MailCheck" /></small></a>
              <a v-if="comment.callBack" title="Ozvat se"><small><BaseIcon icon-name="MessageSquareReply" /> {{ comment.callBack }}</small></a>
            </div>
            <div class="pe-2 text-secondary text-nowrap d-flex gap-1 py-1 align-items-center">
              {{ comment.created }} |
              <BaseAvatar v-if="!comment.isExternal" :user-id="comment.administrator.uuid ?? ''" :size="18" :image-name="comment.administrator.imageName" /> {{ comment.administrator.nickname }}
            </div>
          </div>
          <div class="p-2" style="font-size: 0.9em; position: relative;">
            <span v-html="comment.content" />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { doubleFormat } from '~/utils/helpers';
import { Mentionable } from 'vue-mention';

const props = defineProps({
  comments: {type: Object, default: null},
});

const newCommentDefault: Ref<any> = ref({
  isSystem: false,
  isExternal: false,
  isContact: false,
  callBack: null,
  isUnanswered: false,
  sendEmail: false,
  created: '',
  content: '',
  administrator: {
    uuid: '624aee9b4217111591666294',
    imageName: null,
    nickname: 'OP',
    name: 'Johnasd',
    surname: 'Doeaaassaaa',
  },
});

const newComment: Ref<any> = ref(Object.assign({}, newCommentDefault.value));
const newMentions: Ref<any[]> = ref([]);

const { administrators } = usePrefetchedData();
const admins: ComputedRef = computed(() => {
  const items: Ref<any[]> = ref([]);
  const newAdmins = Object.values(administrators ?? {});
  newAdmins.forEach((administrator: any) => items.value.push({
    uuid: administrator.uuid,
    value: administrator.nickname,
    firstName: administrator.name,
    surname: administrator.surname,
    nickname: administrator.nickname,
    image: administrator.imageName,
  }));

  items.value.push({
    uuid: '624aee9b4217111591666294',
    value: 'OP-ak',
    firstName: 'account',
    surname: 'admin',
    nickname: 'OP-ak',
    image: null,
  });

  return items.value;
});

const onMentionApply = (item: any) => {
  const mentionLink = `<a href="/administrators/${item.uuid}">${item.firstName} ${item.surname}</a>`;
  newMentions.value.push({
    item: item,
    link: mentionLink,
  });
};

function saveComment() {
  if (newComment.value.content.trim()) {
    const newDate = new Date();
    newComment.value.created = newDate.getFullYear() + '-' + doubleFormat(newDate.getMonth() + 1) + '-' + doubleFormat(newDate.getDate()) +
        ' ' + doubleFormat(newDate.getHours()) + ':' + doubleFormat(newDate.getMinutes()) + ':' + doubleFormat(newDate.getSeconds());

    if (newMentions.value?.length > 0) {
      for (const mentionIndex in newMentions.value) {
        const mention = newMentions.value[mentionIndex];
        newComment.value.content = newComment.value.content.replace(`@${mention.item.nickname}`, mention.link);
      }
      newMentions.value = [];
    }

    props.comments.push(newComment.value);
    resetNewComment();
  }
}

function resetNewComment() {
  newComment.value = Object.assign({}, newCommentDefault.value);
}

</script>