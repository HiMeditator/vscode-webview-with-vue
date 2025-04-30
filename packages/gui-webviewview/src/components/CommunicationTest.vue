<template>
    <div class="container">
        <textarea v-model="send" placeholder="输入发送内容"></textarea>
        <button @click="sendMessage">发送信息</button>
        <textarea disabled v-model="receive" placeholder="接收到的信息"></textarea>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListenerStore } from '@/stores/listener'
import { useSenderStore } from '@/stores/sender'

const send = ref<string>('')
const { receive } = storeToRefs(useListenerStore())

function sendMessage() {
    useSenderStore().sendMessage(send.value)
    send.value = ''
}
</script>

<style scoped>
.container {
    margin-left: 10%;
    width: 80%;
}
textarea {
    width: 100%;
    resize: vertical;
    margin: 20px auto;
}
button {
    margin-left: 20%;
    padding: 5px;
    width: 60%;
}
</style>