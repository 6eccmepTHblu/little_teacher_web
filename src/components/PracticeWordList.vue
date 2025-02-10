<script setup>
import { useVocabularyStore } from "@/stores/VocabularyStore.js";
import WordCard from './WordCard.vue';
import { onMounted, TransitionGroup } from 'vue';

const vocabularyStore = useVocabularyStore();

onMounted(async () => {
  await vocabularyStore.getSelectedWords();
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Слова для практики</h3>
    <TransitionGroup name="list" tag="ul" class="list-none p-0">
      <li v-for="word in vocabularyStore.words" :key="word.id" class="mb-4">
        <WordCard :word="word"/>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>