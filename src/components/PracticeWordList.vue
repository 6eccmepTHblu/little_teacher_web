<script setup>
import { useVocabularyStore } from "@/stores/VocabularyStore.js";
import WordCard from './WordCard.vue';
import { onMounted } from 'vue';

const vocabularyStore = useVocabularyStore();


onMounted(async () => {
  await vocabularyStore.getSelectedWords();
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Слова для практики</h3>
    <ul class="list-none p-0">
      <li v-for="word in vocabularyStore.words" :key="word.id" class="mb-4">
        <WordCard :word="word"/>
      </li>
    </ul>
  </div>
</template>