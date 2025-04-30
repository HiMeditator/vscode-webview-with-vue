<template>
  <CommunicationTest />
</template>

<script setup lang="ts">
import CommunicationTest from './components/CommunicationTest.vue'
import { useSenderStore } from './stores/sender'
import { onMounted } from 'vue'

onMounted(() => {
  // 组件挂载完成后向插件发送消息
  useSenderStore().initReady()
})
</script>

<style scoped>

</style>
