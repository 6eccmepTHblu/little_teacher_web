<script setup>
import { ref, computed } from 'vue';
import Card from 'primevue/card';
import {useVocabularyStore} from "@/stores/VocabularyStore.js";

const vocabularyStore = useVocabularyStore();

// В реальном приложении здесь будет логика выбора активного слова
const wordInfo = computed(() => {
  if (!vocabularyStore.currentWord) return null;
  return vocabularyStore.value;
});
</script>

<template>
  <Card v-if="wordInfo" class="shadow-md">
    <template #title>
      <h2 class="text-2xl font-bold text-gray-800">{{ wordInfo.word }}</h2>
    </template>
    <template #content>
      <p class="text-gray-600">{{ wordInfo.translation }}</p>
      <p class="text-sm text-gray-500 mt-2">{{ wordInfo.definition }}</p>
    </template>
  </Card>
  <p v-else class="text-gray-500 text-center">Выберите слово для отображения информации</p>
</template>