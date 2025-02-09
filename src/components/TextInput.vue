<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';

const inputText = ref('');
</script>

<template>
  <div class="flex space-x-2">
    <InputText
        v-model="inputText"
        class="flex-grow"
        placeholder="Введите текст для анализа"
    />
  </div>
</template>