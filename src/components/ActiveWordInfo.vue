<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import { useVocabularyStore } from "@/stores/VocabularyStore"

const vocabularyStore = useVocabularyStore()

const wordInfo = computed(() => vocabularyStore.currentWordDisplay)
</script>

<template>
  <Card v-if="wordInfo" class="shadow-md">
    <template #title>
      <h2 class="text-2xl font-bold text-gray-800">{{ wordInfo.word }}</h2>
      <span v-if="wordInfo.transcription" class="text-sm text-gray-500">
        {{ wordInfo.transcription }}
      </span>
    </template>
    <template #content>
      <p v-if="vocabularyStore.showTranslation" class="text-gray-600">{{ wordInfo.translation }}</p>
      <p v-else class="text-gray-600">***</p>
    </template>
  </Card>
</template>