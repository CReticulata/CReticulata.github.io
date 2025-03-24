<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOnlyOneSelected: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: [],
  },
  settings: {
    type: Array,
    default: [],
  },
})

const optionSettings = computed(() => {
  if (props.settings.length !== 0) {
    return props.settings
  }

  return getOptionSettings(props.options)
})

const emits = defineEmits(['update:optionSettings'])

function getOptionSettings(options) {
  return options.map((option) => {
    return {
      name: option,
      label: option,
      value: false,
    }
  })
}

function setFalseToAllValues(optionSettings) {
  return optionSettings.map((option) => {
    return {
      ...option,
      value: false,
    }
  })
}

function onlyOneSelected(index) {
  const allFalseOptions = setFalseToAllValues(optionSettings.value)

  return [
    ...allFalseOptions.slice(0, index),
    {
      ...optionSettings.value[index],
      value: !optionSettings.value[index].value,
    },
    ...allFalseOptions.slice(index + 1),
  ]
}

function onClick(index) {
  if (props.isOnlyOneSelected) {
    return emits('update:optionSettings', onlyOneSelected(index))
  }

  const newOptionSettings = [
    ...optionSettings.value.slice(0, index),
    {
      ...optionSettings.value[index],
      value: !optionSettings.value[index].value,
    },
    ...optionSettings.value.slice(index + 1),
  ]
  emits('update:optionSettings', newOptionSettings)
}
</script>

<template>
  <q-spinner-dots v-if="optionSettings.length === 0" color="green" size="2em" />
  <q-chip
    v-for="(option, index) in optionSettings"
    :key="index"
    :selected="option.value"
    :color="option.value ? 'light-green' : 'green'"
    :icon="option.icon"
    :icon-selected="option.icon"
    text-color="white"
    @click="onClick(index)"
  >
    {{ option.label }}
  </q-chip>
</template>

<style lang="scss" scoped></style>
