<script setup>
import { useAllWordsStore } from "@/stores/AllWordsStore.js";
import { onMounted } from 'vue';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import ItemAllWord from "@/components/AllWords/ItemAllWord.vue";

const allWordsStore = useAllWordsStore();

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
        <div class="flex-grow p-4 overflow-y-auto">
          <div v-if="allWordsStore.isLoading" class="flex justify-center items-center h-full">
            <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <TransitionGroup v-else name="list" tag="ul" class="list-none p-0">
            <li v-for="word in allWordsStore.words" :key="word.id"
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