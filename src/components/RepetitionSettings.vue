<script setup>
import { usePracticeSettingsStore } from "@/stores/PracticeSettingsStore.js"
import InputNumber from 'primevue/inputnumber'

const settingsStore = usePracticeSettingsStore()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <div class="flex items-center justify-between">
      <label class="text-sm font-medium text-gray-700">
        Number of repetitions required
      </label>
      <InputNumber
          v-model="settingsStore.maxRepetitions"
          :min="1"
          :max="100"
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          incrementButtonClass="p-button-outlined"
          decrementButtonClass="p-button-outlined"
      />
    </div>
  </div>
</template>