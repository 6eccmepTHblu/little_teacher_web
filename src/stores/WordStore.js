import {defineStore} from "pinia";
import {API_BASE_URL} from '@/config';

export const useWordStore = defineStore('word', () => {
    const updateWord = async (wordID, updateData) => {
        const url = `${API_BASE_URL}/words/${wordID}`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating word:', error);
            throw error;
        }
    }

    const wordSelected = async (wordID, isSelected) => {
        return await updateWord(wordID, {selected: isSelected});
    }

    return {
        wordSelected
    }
})
