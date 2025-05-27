<script setup>
import { ref, computed, watch } from 'vue'
import { dom, useQuasar } from 'quasar'
// import imgurAPI from '@/features/imgurAPI'
import imgbbAPI from '@/features/imgbbAPI'

const $q = useQuasar()
const showLoading = () => {
  $q.loading.show({
    message: '載入圖片中...',
    spinnerColor: 'green',
    spinnerSize: '4em',
  })
}

const hideLoading = () => {
  $q.loading.hide()
}

const props = defineProps({
  photos: {
    type: Array,
    required: true,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
})

const carousel = ref(false)
const slide = ref(1)
const deleteDialog = ref(false)
const isDoingDeleting = ref(false)

const originalWidthAndHeightOfPhotos = ref([])

// imgur 版本
// watchEffect(async () => {
//   const imageHashes = props.photos.map(
//     (photo) => photo.split('https://i.imgur.com/')[1].split('.')[0],
//   )

//   const results = []
//   for (const imageHash of imageHashes) {
//     const res = await imgurAPI.GET(imageHash)
//     results.push({
//       width: res.data.width,
//       height: res.data.height,
//     })
//   }

//   originalWidthAndHeightOfPhotos.value = results
// })

const widthAndHeightOfPhotos = computed(() => {
  return originalWidthAndHeightOfPhotos.value.map((photo) => {
    const { height, width } = dom
    const maxHeight = height(document.body) - 48
    const maxWidth = width(document.body) > 600 ? 560 : width(document.body) - 48

    if (photo.height <= maxHeight && photo.width <= maxWidth) {
      return photo
    }

    // 按照maxW和maxH縮小
    // width : height = maxWidth : H
    // H = height * maxWidth / width
    const shrinkByMaxWidth = {
      width: maxWidth,
      height: (photo.height * maxWidth) / photo.width,
    }
    const shrinkByMaxHeight = {
      width: (photo.width * maxHeight) / photo.height,
      height: maxHeight,
    }

    if (photo.height > maxHeight && photo.width <= maxWidth) {
      return shrinkByMaxHeight
    }

    if (photo.height <= maxHeight && photo.width > maxWidth) {
      return shrinkByMaxWidth
    }

    if (photo.height > maxHeight && photo.width > maxWidth) {
      // return photo.height > photo.width ? shrinkByMaxWidth : shrinkByMaxHeight
      if (photo.height > photo.width) {
        return maxHeight > maxWidth ? shrinkByMaxWidth : shrinkByMaxHeight
      } else {
        return shrinkByMaxWidth
      }
    }
  })
})

const emits = defineEmits(['delete:photo'])

async function openCarousel(index) {
  // 如果還沒拿到尺寸就不能打開
  if (!originalWidthAndHeightOfPhotos.value[index]) {
    showLoading()
    await getOriginalWidthAndHeightOfPhotos(props.photos)
    hideLoading()

    slide.value = index
    carousel.value = true
    return
  }

  slide.value = index
  carousel.value = true
}

function openDeleteDialog() {
  deleteDialog.value = true
}

function deletePhoto() {
  isDoingDeleting.value = true
  const index = slide.value
  const photos = [...props.photos.slice(0, index), ...props.photos.slice(index + 1)]
  carousel.value = false
  return emits('delete:photo', photos)
}

// imgbb 版本
async function getOriginalWidthAndHeightOfPhotos(photos) {
  const promises = photos.map(async (photo) => {
    const res = await imgbbAPI.POST(photo)
    return {
      width: res.data.width,
      height: res.data.height,
    }
  })

  const results = await Promise.all(promises)
  originalWidthAndHeightOfPhotos.value = results
}

watch(
  () => props.photos,
  async () => {
    if (isDoingDeleting.value) {
      isDoingDeleting.value = false
      return
    }

    await getOriginalWidthAndHeightOfPhotos(props.photos)
  },
)
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
        :style="`width: ${widthAndHeightOfPhotos[slide].width}px; height: ${widthAndHeightOfPhotos[slide].height}px`"
        class="carousel-dialog"
      >
        <q-carousel-slide v-for="(photo, index) in photos" :name="index" :img-src="photo" />

        <template v-if="deletable" v-slot:control>
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

.q-carousel__slide {
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
