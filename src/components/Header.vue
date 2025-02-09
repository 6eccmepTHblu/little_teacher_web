<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import SidebarAllWords from "@/components/AllWords/SidebarAllWords.vue";
import { useAllWordsStore } from "@/stores/AllWordsStore.js";

const allWordsStore = useAllWordsStore();
const sidebarVisible = ref(false);
const toggleSidebar = async () => {
  sidebarVisible.value = !sidebarVisible.value;
  if (sidebarVisible.value) {
    await allWordsStore.fetchWords();
  }
};
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-white shadow-md">
    <div class="text-xl font-bold text-gray-800">Slava</div>
    <Button
        label="All Words"
        @click="toggleSidebar"
        class="p-button-rounded p-button-outlined"
    />
  </header>
  <SidebarAllWords v-model:visible="sidebarVisible" />
</template>

<style scoped>
</style>