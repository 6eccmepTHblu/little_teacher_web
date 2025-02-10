<script setup>
import { useVocabularyStore } from "@/stores/VocabularyStore"
import Header from "@/components/Header.vue"
import ActiveWordInfo from "@/components/ActiveWordInfo.vue"
import PracticeWordList from "@/components/PracticeWordList.vue"
import PracticeWord from "@/components/PracticeWord.vue"
import RepetitionSettings from "@/components/RepetitionSettings.vue"

const vocabularyStore = useVocabularyStore()
</script>

<template>
  <Header/>
  <main class="flex-grow p-4 bg-gray-100">
    <div class="max-w-4xl mx-auto space-y-4">
      <RepetitionSettings />
      <ActiveWordInfo />
      <PracticeWord />
      <PracticeWordList />
    </div>
  </main>
</template>