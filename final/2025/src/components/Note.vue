<script setup>
import { ref, computed } from 'vue'
import { getDistanceBetweenPoints } from '@/features/utilities'
import { useNoteStore } from '@/stores/noteStore'

const noteStore = useNoteStore()

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

const emits = defineEmits(['delete:note', 'update:isCreate', 'create:note', 'update:note'])

function onSave() {
  isEdit.value = false

  return emits('update:note', note.value)
}
</script>

<template>
  <q-card class="note">
    <q-card-section class="bg-brown-5 text-white note__title-section">
      <div class="text-h6 ellipsis store-name">{{ note.storeName }}</div>
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

        <q-expansion-item icon="thumb_up" label="優點" class="textarea-title">
          <q-card>
            <q-card-section>
              <q-input color="green" outlined autogrow v-model="note.pros" :readonly="!isEdit" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item icon="thumb_down" label="缺點" class="textarea-title">
          <q-card>
            <q-card-section>
              <q-input color="red" outlined autogrow v-model="note.cons" :readonly="!isEdit" />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-form>
    </q-card-section>

    <q-separator />

    <q-card-actions v-if="!isCreate" align="around">
      <q-btn flat class="text-negative action-btn" @click="deleteConfirm = true">刪除</q-btn>
      <q-btn v-if="!isEdit" flat class="action-btn" @click="isEdit = true">編輯</q-btn>
      <q-btn v-else flat class="action-btn" @click="onSave">儲存</q-btn>
    </q-card-actions>
    <q-card-actions v-else align="around">
      <q-btn flat class="text-grey-8 action-btn" @click="cancelConfirm = true">取消</q-btn>
      <q-btn flat class="action-btn" @click="emits('create:note', note)">儲存</q-btn>
    </q-card-actions>

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
            @click="emits('update:isCreate', false)"
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

:deep(.q-textarea .q-field__native) {
  padding: 17px 0;
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
</style>
