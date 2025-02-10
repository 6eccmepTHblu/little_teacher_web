<script setup>
import { ref } from 'vue';
import Button from "primevue/button";
import { useVocabularyStore } from "@/stores/VocabularyStore.js";

const vocabularyStore = useVocabularyStore();
const isAdded = ref(false);

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
});

const addWord = () => {
  vocabularyStore.addWord(props.word);
  isAdded.value = true;
  setTimeout(() => {
    isAdded.value = false;
  }, 1000);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-semibold text-blue-600">{{ word.english }}</h3>
    <span v-if="word.transcription" class="text-sm text-gray-500">{{ word.transcription }}</span>
  </div>
  <div v-if="word.translations && word.translations.length" class="mt-1 text-sm text-gray-600">
    {{ word.translations.map(t => t.russian).join('; ') }}
  </div>
  <div class="mt-2 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <span v-if="word.has_audio()" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Audio</span>
      <span v-if="word.remember" class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Remember</span>
    </div>
    <Button
        v-if="!vocabularyStore.checkWord(word.id)"
        @click="addWord"
        icon="pi pi-plus-circle"
        :class="['p-button-rounded p-button-text', { 'animate-bounce': isAdded }]"
    />
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce {
  animation: bounce 0.5s;
}
</style>