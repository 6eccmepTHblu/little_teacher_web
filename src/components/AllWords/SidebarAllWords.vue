<script setup>

import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import ItemAllWord from "@/components/AllWords/ItemAllWord.vue";
import { useAllWordsStore } from "@/stores/AllWordsStore.js";

const vocabularyStore = useAllWordsStore();

</script>
<template>
  <Sidebar position="right" class="custom-sidebar w-80">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full bg-white shadow-lg">
        <div class="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">All Words</h2>
          <Button icon="pi pi-times" @click="closeCallback" class="p-button-rounded p-button-text" />
        </div>
        <div class="flex-grow p-4 overflow-y-auto">
          <ul class="list-none p-0">
            <li v-for="word in vocabularyStore.words" :key="word.id" class="mb-4 p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
              <ItemAllWord :word="word"/>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Sidebar>
</template>

<style scoped>
:deep(.p-sidebar-content) {
  padding: 0;
}
</style>