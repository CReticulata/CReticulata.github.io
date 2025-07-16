<script setup>
import { ref, computed } from 'vue'
import { getDistanceBetweenPoints } from '@/features/utilities'
import { useNoteStore } from '@/stores/noteStore'
import { useUserStore } from '@/stores/userStore'
import PhotoCarouselBtns from './PhotoCarouselBtns.vue'
// import imgurAPI from '@/features/imgurAPI'
import imgbbAPI from '@/features/imgbbAPI'

const noteStore = useNoteStore()
const userStore = useUserStore()

const props = defineProps({
  isCreate: {
    type: Boolean,
    default: false,
  },
  noteInput: {
    type: Object,
    required: true,
  },
})

// const note = defineModel()
const note = ref({ ...props.noteInput })

const isOthers = computed(() => note.value.user !== noteStore.user.ID)
const targetUserName = computed(() => {
  const targetUser = userStore.targetUserList.find((user) => user.user === note.value.user)
  if (targetUser) {
    return targetUser.name
  }
  return '載入中'
})

const files = ref([])
const uploader = ref(false)
const canUpload = computed(() => files.value.length > 0)
const isUploading = ref(false)

const isEdit = ref(props.isCreate)
const deleteConfirm = ref(false)
const cancelConfirm = ref(false)

const distanceText = computed(() => {
  let distance = getDistanceBetweenPoints(
    noteStore.userLocation.lat,
    noteStore.userLocation.lng,
    props.noteInput.location.lat,
    props.noteInput.location.lng,
  )

  if (distance > 1000) {
    distance = getDistanceBetweenPoints(
      noteStore.userLocation.lat,
      noteStore.userLocation.lng,
      props.noteInput.location.lat,
      props.noteInput.location.lng,
      'kilometers',
    )

    return `${distance} 公里`
  }

  return `${distance} 公尺`
})

const emits = defineEmits(['delete:note', 'update:isNoteOpen', 'create:note', 'update:note'])

function onSave() {
  isEdit.value = false

  return emits('update:note', note.value)
}

// imgur 版本
// async function upload() {
//   isUploading.value = true
//   const uploadedPhotos = []
//   for (const file of files.value) {
//     const formData = new FormData()
//     formData.append('image', file)
//     formData.append('type', 'image')

//     const res = await imgurAPI.POST(formData)
//     uploadedPhotos.push(res.data.link)
//   }

//   note.value.photos = [...note.value.photos, ...uploadedPhotos].slice(0, 3)
//   isUploading.value = false
//   uploader.value = false
//   return emits('update:note', note.value)
// }

// imgbb 版本
async function upload() {
  isUploading.value = true
  const uploadedPhotos = []
  for (const file of files.value) {
    const res = await imgbbAPI.POST(file)
    uploadedPhotos.push(res.data.url)
  }

  note.value.photos = [...note.value.photos, ...uploadedPhotos].slice(0, 3)
  isUploading.value = false
  uploader.value = false
  return emits('update:note', note.value)
}

function deletePhoto(e) {
  note.value.photos = e

  return emits('update:note', note.value)
}
</script>

<template>
  <q-card class="note">
    <q-card-section class="bg-brown-5 text-white note__title-section">
      <div class="row items-center justify-between note__name">
        <div class="text-h6 ellipsis store-name">{{ note.storeName }}</div>
        <q-chip
          v-if="isOthers"
          class="ellipsis author-name"
          dense
          color="yellow"
          text-color="grey-8"
          :ripple="false"
        >
          {{ targetUserName }}
        </q-chip>
      </div>

      <div class="note__address-info">
        <div class="address-info">
          <div class="text-subtitle2 ellipsis address-info__address">{{ note.address }}</div>
          <div class="address-info__distance">{{ distanceText }}</div>
        </div>
        <q-btn
          v-if="note.googlemapURL"
          flat
          round
          icon="fa-solid fa-location-dot"
          :href="note.googlemapURL"
        ></q-btn>
      </div>
    </q-card-section>

    <q-card-section class="bg-white text-black note__details">
      <q-form class="details__form">
        <div class="rating">
          <div class="rating__title">餐點</div>

          <q-separator vertical></q-separator>

          <q-rating
            class="rating__input"
            v-model="note.foodScore"
            :max="5"
            size="32px"
            color="grey"
            color-selected="red"
            :readonly="!isEdit"
          />
        </div>

        <div class="rating">
          <div class="rating__title">服務</div>

          <q-separator vertical></q-separator>

          <q-rating
            class="rating__input"
            v-model="note.serviceScore"
            :max="5"
            size="32px"
            color="grey"
            color-selected="red"
            :readonly="!isEdit"
          />
        </div>

        <q-expansion-item icon="fa-solid fa-note-sticky" label="筆記" class="textarea-title">
          <q-card>
            <q-card-section>
              <q-input
                label="優點"
                stack-label
                color="green"
                outlined
                autogrow
                v-model="note.pros"
                :readonly="!isEdit"
              />
            </q-card-section>
            <q-card-section>
              <q-input
                label="缺點"
                stack-label
                color="red"
                outlined
                autogrow
                v-model="note.cons"
                :readonly="!isEdit"
              />
            </q-card-section>
            <q-card-section class="row q-gutter-x-xs">
              <q-btn
                icon="add_photo_alternate"
                label="上傳照片"
                flat
                color="grey-6"
                @click="uploader = true"
                :disable="!isEdit"
              >
              </q-btn>

              <PhotoCarouselBtns
                :photos="note.photos"
                @delete:photo="deletePhoto"
                :deletable="!isOthers"
              ></PhotoCarouselBtns>
            </q-card-section>
          </q-card>

          <div v-if="note.user === noteStore.user.ID">
            <q-separator spaced />
            <q-card-actions v-if="!isCreate" align="around">
              <q-btn flat class="text-negative action-btn" @click="deleteConfirm = true"
                >刪除</q-btn
              >
              <q-btn v-if="!isEdit" flat class="action-btn" @click="isEdit = true">編輯</q-btn>
              <q-btn v-else flat class="action-btn" @click="onSave">儲存</q-btn>
            </q-card-actions>
            <q-card-actions v-else align="around">
              <q-btn flat class="text-grey-8 action-btn" @click="cancelConfirm = true">取消</q-btn>
              <q-btn flat class="action-btn" @click="emits('create:note', note)">儲存</q-btn>
            </q-card-actions>
          </div>
        </q-expansion-item>
      </q-form>
    </q-card-section>

    <q-separator />

    <q-dialog v-model="uploader" class="uploader">
      <q-card>
        <q-card-section>
          <div class="q-pb-sm uploader__title">上傳照片</div>
          <div class="q-pb-sm uploader__subtitle">限上傳圖片檔；照片數量限 3 張</div>
          <q-file
            v-model="files"
            outlined
            use-chips
            multiple
            append
            accept=".jpg, .png, image/*"
            max-files="3"
            style="max-width: 300px"
            color="brown"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
            <template v-slot:after v-if="canUpload">
              <q-btn
                color="red"
                dense
                icon="cloud_upload"
                round
                @click="upload"
                :disable="!canUpload"
                :loading="isUploading"
              />
            </template>
          </q-file>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="24px" />
          <span class="q-ml-sm">確定要刪除這個筆記嗎？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn
            flat
            label="刪除"
            color="negative"
            v-close-popup
            @click="emits('delete:note', note)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="cancelConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="24px" />
          <span class="q-ml-sm">確定要取消新增筆記嗎？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="放棄編輯"
            color="negative"
            v-close-popup
            @click="emits('update:isNoteOpen', false)"
          />
          <q-btn flat label="繼續編輯" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<style lang="scss" scoped>
.note {
  width: 100%;
  max-width: 320px;

  &__title-section {
    height: 108px;
  }

  &__name {
    flex-wrap: nowrap;
  }

  &__address-info {
    display: flex;
    gap: 5px;
    justify-content: space-between;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}

.store-name {
  height: 32px;
  max-width: 220px;
}

:deep(.author-name .q-chip__content) {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.address-info {
  width: 240px;

  &__address {
    height: 21px;
    overflow: hidden;
  }

  &__distance {
    color: $grey-5;
  }
}
.details {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.rating {
  display: flex;
  gap: 10px;
  align-items: center;

  padding-left: 12px;

  height: 44px;

  &__title {
    font-size: 18px;
  }
}

:deep(.rating .q-rating__icon) {
  text-shadow: none;
}

// :deep(.q-textarea .q-field__native) {
// padding: 17px 0;
// }

:deep(.textarea-title .q-card__section--vert) {
  padding: 8px 16px;
}

:deep(.textarea-title .q-item__section--avatar) {
  color: $grey-6;
}

:deep(.textarea-title .q-item__label) {
  font-size: 16px;
  color: $grey-8;
}

.action-btn {
  flex: 1;
}

.uploader {
  &__title {
    font-size: 16px;
    color: $brown;
  }

  &__subtitle {
    font-size: 12px;
    color: $grey-8;
  }
}
</style>
