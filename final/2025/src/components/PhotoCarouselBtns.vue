<script setup>
import { ref } from 'vue'
const props = defineProps({
  photos: {
    type: Array,
    required: true,
  },
})

const carousel = ref(false)
const slide = ref(1)
const deleteDialog = ref(false)

const emits = defineEmits(['delete:photo'])

function openCarousel(index) {
  slide.value = index
  carousel.value = true
}

function openDeleteDialog() {
  deleteDialog.value = true
}

function deletePhoto() {
  const index = slide.value
  const photos = [...props.photos.slice(0, index), ...props.photos.slice(index + 1)]
  carousel.value = false
  return emits('delete:photo', photos)
}
</script>

<template>
  <div class="row photo-carousel-btns">
    <q-btn
      v-for="(photo, index) in photos"
      :key="index"
      round
      size="12px"
      @click="openCarousel(index)"
    >
      <q-avatar size="36px">
        <img :src="photo" />
      </q-avatar>
    </q-btn>

    <q-dialog v-model="carousel">
      <q-carousel
        swipeable
        animated
        arrows
        v-model="slide"
        infinite
        style="width: 700px"
        height="80%"
        class="carousel-dialog"
      >
        <q-carousel-slide v-for="(photo, index) in photos" :name="index" :img-src="photo" />

        <template v-slot:control>
          <q-carousel-control position="bottom-right" :offset="[18, 18]">
            <q-btn
              round
              dense
              color="white"
              text-color="grey-8"
              icon="delete"
              @click="openDeleteDialog"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </q-dialog>

    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="24px" />
          <span class="q-ml-sm">確定要刪除這張照片嗎？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="刪除" color="negative" v-close-popup @click="deletePhoto" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.photo-carousel-btns {
  gap: 8px;
}

:deep(.q-carousel__slide) {
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
