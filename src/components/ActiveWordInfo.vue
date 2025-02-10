<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import { useVocabularyStore } from "@/stores/VocabularyStore"
import { usePracticeSettingsStore } from "@/stores/PracticeSettingsStore"
import InputNumber from 'primevue/inputnumber'

const vocabularyStore = useVocabularyStore()
const settingsStore = usePracticeSettingsStore()

const wordInfo = computed(() => vocabularyStore.currentWordDisplay)
</script>

<template>
  <Card v-if="wordInfo" class="shadow-md">
    <template #title>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">{{ wordInfo.word }}</h2>
          <span v-if="wordInfo.transcription" class="text-sm text-gray-500">
            {{ wordInfo.transcription }}
          </span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Repetitions:</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {{ wordInfo.repetitionCount }}/{{ settingsStore.maxRepetitions }}
          </span>
        </div>
      </div>
    </template>
    <template #content>
      <p v-if="vocabularyStore.showTranslation" class="text-gray-600">{{ wordInfo.translation }}</p>
      <p v-else class="text-gray-600">***</p>
    </template>
  </Card>
</template>