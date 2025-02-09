import {defineStore} from 'pinia'
import {ref} from "vue";
import {useWordStore} from "@/stores/WordStore.js";
import { API_BASE_URL } from '@/config';

export const useVocabularyStore = defineStore('vocabulary', () => {
    const words = ref([])
    const currentWord = ref(null)
    const wordStore = useWordStore()

    const getSelectedWords = async () => {
        const url = `${API_BASE_URL}/words/selected`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            words.value =  await response.json();
        } catch (error) {
            console.error('Error fetching selected words:', error);
            throw error;
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
        } catch (error) {
            console.error('Error deleting word:', error)
        }
    }

    function checkWord(id) {
        return words.value.find((words) => words.id === id)
    }

    return {
        words,
        currentWord,
        addWord,
        deleteWord,
        checkWord,
        getSelectedWords,
        getRandomWord
    }

})