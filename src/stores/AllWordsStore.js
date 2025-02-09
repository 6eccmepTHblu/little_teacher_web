import { defineStore } from 'pinia'
import { ref, computed } from "vue";
import { API_BASE_URL } from '@/config';

export const useAllWordsStore = defineStore('allWords', () => {
    const words = ref([])
    const isLoading = ref(false)

    const wordsWithComputedProps = computed(() => words.value.map(word => ({
        ...word,
        has_audio: () => Boolean(word.audio_name),
        remember: word.remember || false
    })))

    async function fetchWords() {
        isLoading.value = true
        try {
            const response = await fetch(`${API_BASE_URL}/words`)
            words.value = await response.json()
        } catch (error) {
            console.error('Error fetching words:', error)
        } finally {
            isLoading.value = false
        }
    }

    return {
        words: wordsWithComputedProps,
        isLoading,
        fetchWords
    }

})