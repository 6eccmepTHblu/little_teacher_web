<script setup>
import { ref, computed } from 'vue';
import { useAllWordsStore } from "@/stores/AllWordsStore.js";
import { onMounted } from 'vue';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Calendar from 'primevue/calendar';
import ItemAllWord from "@/components/AllWords/ItemAllWord.vue";
import { useVocabularyStore } from "@/stores/VocabularyStore.js";

const allWordsStore = useAllWordsStore();
const vocabularyStore = useVocabularyStore();

const dateRange = ref([]);
const isAddingWords = ref(false);

// Фильтрованные слова
const filteredWords = computed(() => {
  if (!dateRange.value || dateRange.value.length !== 2 || !dateRange.value[0] || !dateRange.value[1]) {
    return allWordsStore.words;
  }

  const startDate = new Date(dateRange.value[0]);
  const endDate = new Date(dateRange.value[1]);
  endDate.setHours(23, 59, 59, 999);

  return allWordsStore.words.filter(word => {
    const wordDate = new Date(word.created_at);
    return wordDate >= startDate && wordDate <= endDate;
  });
});

// Получаем только неотобранные слова
const nonSelectedFilteredWords = computed(() => {
  return filteredWords.value.filter(word => !vocabularyStore.checkWord(word.id));
});

const addFilteredWords = async () => {
  if (nonSelectedFilteredWords.value.length === 0) return;

  try {
    isAddingWords.value = true;
    const wordIds = nonSelectedFilteredWords.value.map(word => word.id);
    await vocabularyStore.selectWords(wordIds);
  } catch (error) {
    console.error('Error adding filtered words:', error);
  } finally {
    isAddingWords.value = false;
  }
};

const clearDateFilter = () => {
  dateRange.value = [];
};

onMounted(() => {
  allWordsStore.fetchWords();
});
</script>

<template>
  <Sidebar position="right" class="custom-sidebar w-80">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full bg-white shadow-lg">
        <div class="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">All Words</h2>
          <Button icon="pi pi-times" @click="closeCallback" class="p-button-rounded p-button-text"/>
        </div>

        <!-- Фильтр по датам и кнопка добавления -->
        <div class="p-4 border-b border-gray-200">
          <div class="flex flex-col space-y-4">
            <div class="flex flex-col space-y-2">
              <label class="text-sm font-medium text-gray-700">Date Range</label>
              <div class="flex items-center space-x-2">
                <Calendar
                    v-model="dateRange"
                    selectionMode="range"
                    dateFormat="dd/mm/yy"
                    placeholder="Select date range"
                    showIcon
                    :showButtonBar="true"
                    class="w-full calendar-custom"
                />
                <Button
                    icon="pi pi-filter-slash"
                    @click="clearDateFilter"
                    class="p-button-rounded p-button-text p-button-sm"
                    v-tooltip.top="'Clear filter'"
                />
              </div>
            </div>

            <!-- Кнопка добавления отфильтрованных слов -->
            <div v-if="nonSelectedFilteredWords.length > 0"
                 class="flex justify-between items-center px-2 py-1 bg-blue-50 rounded-lg">
              <span class="text-sm text-blue-600">
                {{ nonSelectedFilteredWords.length }} words available
              </span>
              <Button
                  label="Add filtered"
                  icon="pi pi-plus"
                  @click="addFilteredWords"
                  :loading="isAddingWords"
                  :disabled="isAddingWords"
                  class="p-button-sm p-button-outlined"
              />
            </div>
          </div>
        </div>

        <div class="flex-grow p-4 overflow-y-auto">
          <div v-if="allWordsStore.isLoading" class="flex justify-center items-center h-full">
            <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <TransitionGroup v-else name="list" tag="ul" class="list-none p-0">
            <li v-for="word in filteredWords" :key="word.id"
                class="mb-4 p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
              <ItemAllWord :word="word"/>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </template>
  </Sidebar>
</template>

<style scoped>
:deep(.p-sidebar-content) {
  padding: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>