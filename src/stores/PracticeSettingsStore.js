// PracticeSettingsStore.js
import { ref, watch } from "vue";
import { defineStore } from 'pinia'
import { API_BASE_URL } from '@/config';

export const usePracticeSettingsStore = defineStore('practiceSettings', () => {
    const maxRepetitions = ref(10);
    const checkMethod = ref('Standard')
    const translationDirection = ref('En → Ru')

    // Загрузка настроек при инициализации
    const loadSettings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/settings/max_repetitions`);
            const data = await response.json();
            maxRepetitions.value = parseInt(data.value) || 10;
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    // Сохранение настроек при изменении
    watch(maxRepetitions, async (newValue) => {
        try {
            await fetch(`${API_BASE_URL}/settings/max_repetitions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value: newValue })
            });
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    });

    // Загружаем настройки при создании store
    loadSettings();

    return { maxRepetitions, checkMethod, translationDirection }
})