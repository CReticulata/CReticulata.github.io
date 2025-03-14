<script setup>
const props = defineProps({
  isOnlyOneSelected: {
    type: Boolean,
    default: false,
  },
  optionSettings: {
    type: Array,
    required: true,
  },
})

const values = defineModel()

function setFalseToAllValues(optionSettings) {
  return optionSettings.reduce((values, currOptionSetting) => {
    values[currOptionSetting.name] = false

    return values
  }, {})
}

function onlyOneSelected(selectedName) {
  return {
    ...setFalseToAllValues(props.optionSettings),
    [selectedName]: values.value[selectedName],
  }
}

function onClick(optionName) {
  if (props.isOnlyOneSelected) {
    values.value = onlyOneSelected(optionName)
  }
}
</script>

<template>
  <q-chip
    v-for="(option, index) in optionSettings"
    :key="index"
    v-model:selected="values[option.name]"
    :color="values[option.name] ? 'light-green' : 'green'"
    :icon="option.icon"
    :icon-selected="option.icon"
    text-color="white"
    @click="onClick(option.name)"
  >
    {{ option.label }}
  </q-chip>
</template>

<style lang="scss" scoped></style>
