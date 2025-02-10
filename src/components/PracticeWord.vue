# PracticeWord.vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVocabularyStore } from '@/stores/VocabularyStore'
import { usePracticeSettingsStore } from '@/stores/PracticeSettingsStore'
import Textarea from 'primevue/textarea'  // Заменили импорт

const vocabularyStore = useVocabularyStore()
const settingsStore = usePracticeSettingsStore()

const inputText = ref('')
const formattedAnswer = ref('')
const showFormatted = ref(false)

const checkInput = () => {
  const input = inputText.value.trim()
  if (!input) return

  const isCorrect = settingsStore.checkMethod === 'Standard'
      ? vocabularyStore.checkTranslation(input, vocabularyStore.currentWord.translations)
      : vocabularyStore.checkTranslationPartial(input, vocabularyStore.currentWord.translations)

  if (isCorrect && !vocabularyStore.hadError) {
    handleCorrectTranslation(input)
  } else if (!isCorrect && settingsStore.checkMethod === 'Not mistake') {
    vocabularyStore.hadError = true
  }
}

const handleCorrectTranslation = async (input) => {
  vocabularyStore.showTranslation = true

  const newCount = vocabularyStore.currentWord.repetition_count + 1
  await vocabularyStore.updateWordRepetition(vocabularyStore.currentWord.id, newCount)

  if (newCount >= settingsStore.maxRepetitions) {
    await vocabularyStore.deleteWord(vocabularyStore.currentWord.id)
  }

  // Сначала устанавливаем таймер
  setTimeout(async () => {
    await resetInput()
    vocabularyStore.resetShowTranslation()
    await vocabularyStore.getNextWord() // Дожидаемся получения следующего слова
  }, 1000)
}

const resetInput = async () => {
  inputText.value = ''
  formattedAnswer.value = ''
  showFormatted.value = false
  vocabularyStore.hadError = false
}

// Добавляем инициализацию при монтировании
onMounted(() => {
  vocabularyStore.getNextWord()
})
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="mb-4">
      <Textarea
          v-model="inputText"
          @input="checkInput"
          :class="{'bg-red-50': vocabularyStore.hadError}"
          placeholder="Введите перевод..."
          autoResize
          rows="3"
      />
    </div>
  </div>
</template>