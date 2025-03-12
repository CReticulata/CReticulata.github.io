<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { theme: 'outline', size: 'large', width: 215 }, // customization attributes
  )
  google.accounts.id.prompt() // also display the One Tap dialog
})
</script>

<template>
  <div>
    <div id="buttonDiv"></div>
  </div>
</template>
