<script setup>
import Button from 'primevue/button';
import {useVocabularyStore} from "@/stores/VocabularyStore.js";
const vocabularyStore = useVocabularyStore();

defineProps({
  word: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-blue-600">{{ word.english }}</h3>
      <span v-if="word.transcription" class="text-sm text-gray-500">{{ word.transcription }}</span>
    </div>
    <div v-if="word.translations && word.translations.length" class="mt-1 text-sm text-gray-600">
      {{ word.translations.map(t => t.russian).join('; ') }}
    </div>
    <div class="mt-2 flex items-center justify-between">
      <Button @click="vocabularyStore.deleteWord(word.id)" icon="pi pi-minus-circle"
              class="p-button-rounded p-button-text p-button-danger"/>
    </div>
  </div>
</template>