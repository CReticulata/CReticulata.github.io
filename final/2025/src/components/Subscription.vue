<script setup>
const props = defineProps({
  user: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['remove:user'])
</script>

<template>
  <q-item class="subscription">
    <q-item-section>
      <q-item-label>{{ user }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        round
        unelevated
        color="red"
        icon="remove"
        size="sm"
        padding="3px"
        @click="emits('remove:user', user)"
      />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped>
.q-item {
  padding: 0 16px;
}
</style>
