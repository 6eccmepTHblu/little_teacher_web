<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVocabularyStore } from '@/stores/VocabularyStore'
import { usePracticeSettingsStore } from '@/stores/PracticeSettingsStore'
import InputText from 'primevue/inputtext'
import Button from "primevue/button";

const vocabularyStore = useVocabularyStore()
const settingsStore = usePracticeSettingsStore()

const inputText = ref('')
const isCorrect = ref(false)

const checkInput = () => {
  const input = inputText.value.trim()
  if (!input) return

  isCorrect.value = settingsStore.checkMethod === 'Standard'
      ? vocabularyStore.checkTranslation(input, vocabularyStore.currentWord.translations)
      : vocabularyStore.checkTranslationPartial(input, vocabularyStore.currentWord.translations)

  if (isCorrect.value && !vocabularyStore.hadError) {
    handleCorrectTranslation(input)
  } else if (!isCorrect.value && settingsStore.checkMethod === 'Not mistake') {
    vocabularyStore.hadError = true
  }
}

const handleCorrectTranslation = async (input) => {
  vocabularyStore.showTranslation = true

  const newCount = vocabularyStore.currentWord.repetition_count + 1
  await vocabularyStore.updateWordRepetition(vocabularyStore.currentWord.id, newCount)

  const shouldRemove = newCount >= settingsStore.maxRepetitions

  setTimeout(async () => {
    await resetInput()
    vocabularyStore.resetShowTranslation()
    // Получаем следующее слово только если слово не будет удалено
    if (!shouldRemove) {
      await vocabularyStore.getNextWord()
    } else {
      await vocabularyStore.deleteWord(vocabularyStore.currentWord.id)
    }
  }, 1000)
}

const resetInput = async () => {
  inputText.value = ''
  isCorrect.value = false
  vocabularyStore.hadError = false
}

onMounted(() => {
  vocabularyStore.getNextWord()
})

const handleClearAllWords = async () => {
  if (confirm('Вы уверены, что хотите очистить весь список слов?')) {
    await vocabularyStore.clearAllWords()
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center space-x-2">
      <div class="flex-grow">
        <InputText
            v-model="inputText"
            @input="checkInput"
            placeholder="Введите перевод..."
        />
      </div>
      <Button
          icon="pi pi-trash"
          class="p-button-danger p-button-outlined"
          @click="handleClearAllWords"
      />
    </div>
  </div>
</template>