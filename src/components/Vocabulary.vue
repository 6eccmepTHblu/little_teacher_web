<script setup>
import Header from "@/components/Header.vue";
import ActiveWordInfo from "@/components/ActiveWordInfo.vue";
import TextInput from "@/components/TextInput.vue";
import PracticeWordList from "@/components/PracticeWordList.vue";
</script>

<template>
  <Header/>
  <main class="flex-grow p-4 bg-gray-100">
    <div class="max-w-4xl mx-auto space-y-4">
      <ActiveWordInfo />
      <TextInput />
      <PracticeWordList />
    </div>
  </main>
</template>

<style scoped>
</style>