<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import { useVocabularyStore } from "@/stores/VocabularyStore.js";

const vocabularyStore = useVocabularyStore();
const isRemoving = ref(false);

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
});

const removeWord = () => {
  isRemoving.value = true;
  setTimeout(() => {
    vocabularyStore.deleteWord(props.word.id);
  }, 300);
};
</script>

<template>
  <div :class="['p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all duration-300',
                { 'opacity-50 transform scale-95': isRemoving }]">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-blue-600">{{ word.english }}</h3>
      <span v-if="word.transcription" class="text-sm text-gray-500">{{ word.transcription }}</span>
    </div>
    <div v-if="word.translations && word.translations.length" class="mt-1 text-sm text-gray-600">
      {{ word.translations.map(t => t.russian).join('; ') }}
    </div>
    <div class="mt-2 flex items-center justify-between">
      <Button @click="removeWord" icon="pi pi-minus-circle"
              :class="['p-button-rounded p-button-text p-button-danger', { 'animate-shake': isRemoving }]"/>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.3s ease-in-out infinite;
}
</style>