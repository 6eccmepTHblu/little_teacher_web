import {ref} from "vue";
import {defineStore} from 'pinia'

export const usePracticeSettingsStore = defineStore('practiceSettings', () => {

    const maxRepetitions = ref(10);
    const checkMethod = ref('Standard')
    const translationDirection = ref('En → Ru')

    return { maxRepetitions, checkMethod, translationDirection }
})