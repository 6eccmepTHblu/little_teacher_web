import {defineStore} from 'pinia'
import {ref, computed} from "vue";
import {useWordStore} from "@/stores/WordStore.js";
import {API_BASE_URL} from '@/config';

export const useVocabularyStore = defineStore('vocabulary', () => {
    const words = ref([])
    const currentWord = ref(null)
    const wordStore = useWordStore()

    // Add states
    const maxRepetitions = ref(10)
    const checkMethod = ref('Standard') // 'Standard' or 'Not mistake'
    const translationDirection = ref('En → Ru')
    const hadError = ref(false)
    const showTranslation = ref(false)

    const getSelectedWords = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/words/selected`)
            words.value = await response.json()
            if (words.value.length > 0) {
                getNextWord()
            }
        } catch (error) {
            console.error('Error fetching selected words:', error)
        }
    }

    function getRandomWord() {
        if (words.value.length === 0) {
            return null; // Возвращаем null, если слов нет
        }
        const randomIndex = Math.floor(Math.random() * words.value.length);
        return words.value[randomIndex];
    }

    async function addWord(word) {
        try {
            const response = await wordStore.wordSelected(word.id, true)
            if (response.selected) {
                words.value.push(response)
                if (words.value.length === 1) { // Если это первое слово
                    getNextWord()
                }
            }
        } catch (error) {
            console.error('Error adding word:', error)
        }
    }

    async function deleteWord(id) {
        try {
            const response = await wordStore.wordSelected(id, false)
            if (!response.selected) {
                words.value = words.value.filter((word) => word.id !== id)
            }
            if (words.value.length > 0) { // Если это первое слово
                getNextWord()
            }
        } catch (error) {
            console.error('Error deleting word:', error)
        }
    }

    function checkWord(id) {
        return words.value.find((words) => words.id === id)
    }

    // Обновление счетчика повторений
    const updateWordRepetition = async (wordId, newCount) => {
        try {
            const response = await fetch(`${API_BASE_URL}/words/${wordId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({repetition_count: newCount})
            })
            if (response.ok) {
                // Обновляем локальное состояние
                const word = words.value.find(w => w.id === wordId)
                if (word) word.repetition_count = newCount
            }
        } catch (error) {
            console.error('Error updating repetition count:', error)
        }
    }

    // Проверка перевода
    const checkTranslation = (input, translations) => {
        const inputLower = input.toLowerCase().trim()
        const translationsLower = translations.map(t => t.russian.toLowerCase().trim())
        return translationsLower.includes(inputLower)
    }

    // Частичная проверка перевода
    const checkTranslationPartial = (input, translations) => {
        const inputLower = input.toLowerCase().trim()
        return translations.some(t =>
            t.russian.toLowerCase().trim().startsWith(inputLower)
        )
    }

    // Получение следующего слова
    const getNextWord = () => {
        if (words.value.length === 0) return null

        // Получаем слова с минимальным количеством повторений
        const minRepetitions = Math.min(...words.value.map(w => w.repetition_count))
        const candidates = words.value.filter(w => w.repetition_count === minRepetitions)

        // Выбираем случайное слово из кандидатов
        const randomIndex = Math.floor(Math.random() * candidates.length)
        currentWord.value = candidates[randomIndex]
        return currentWord.value
    }

    const currentWordDisplay = computed(() => {
        if (!currentWord.value) return null
        return {
            word: currentWord.value.english,
            translation: showTranslation.value ? currentWord.value.translations.map(t => t.russian).join('; ') : '',
            transcription: currentWord.value.transcription
        }
    })

    function resetShowTranslation() {
        showTranslation.value = false
    }

    return {
        words,
        currentWord,
        addWord,
        deleteWord,
        checkWord,
        getSelectedWords,
        getRandomWord,
        checkTranslation,
        checkTranslationPartial,
        getNextWord,
        currentWordDisplay,
        showTranslation,
        resetShowTranslation,
        updateWordRepetition
    }

})