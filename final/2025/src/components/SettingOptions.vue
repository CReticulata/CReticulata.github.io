<script setup>
const props = defineProps({
  isOnlyOneSelected: {
    type: Boolean,
    default: false,
  },
})

const optionSettings = defineModel()

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
  if (optionSettings.value[index].value) {
    return [
      ...allFalseOptions.slice(0, index),
      {
        ...optionSettings.value[index],
        value: true,
      },
      ...allFalseOptions.slice(index + 1),
    ]
  }

  return [
    ...allFalseOptions.slice(0, index),
    {
      ...optionSettings.value[index],
      value: false,
    },
    ...allFalseOptions.slice(index + 1),
  ]
}

function onClick(index) {
  if (props.isOnlyOneSelected) {
    optionSettings.value = onlyOneSelected(index)
    return
  }
}
</script>

<template>
  <q-chip
    v-for="(option, index) in optionSettings"
    :key="index"
    v-model:selected="option.value"
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
