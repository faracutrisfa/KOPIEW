<template>
  <div class="bg-primary rounded-2xl p-6 text-cream sticky top-4">
    <h2 class="text-xl font-bold mb-6">Filter</h2>
    
    <div class="mb-6">
      <h3 class="font-semibold mb-3">Lokasi</h3>
      <div class="space-y-2">
        <label
          v-for="location in locations"
          :key="location"
          class="flex items-center cursor-pointer hover:text-yellow"
        >
          <input
            type="checkbox"
            :value="location"
            v-model="selectedLocations"
            class="mr-2 w-4 h-4"
          />
          <span class="text-sm">{{ location }}</span>
        </label>
        <button class="text-sm text-yellow hover:underline">More...</button>
      </div>
    </div>

    <div class="mb-6">
      <h3 class="font-semibold mb-3">Rating</h3>
      <div class="space-y-2">
        <label
          v-for="rating in [5, 4, 3, 2, 1]"
          :key="rating"
          class="flex items-center cursor-pointer hover:text-yellow"
        >
          <input
            type="checkbox"
            :value="rating"
            v-model="selectedRatings"
            class="mr-2 w-4 h-4"
          />
          <div class="flex items-center gap-1">
            <span v-for="star in rating" :key="star" class="text-yellow text-sm">★</span>
            <span class="text-sm ml-1">{{ rating }}</span>
          </div>
        </label>
      </div>
    </div>

    <div class="space-y-2">
      <button
        class="w-full text-left py-2 px-3 rounded-lg hover:bg-primary-40 transition-colors text-sm font-medium"
      >
        Buka 24 Jam
      </button>
      <button
        class="w-full text-left py-2 px-3 rounded-lg hover:bg-primary-40 transition-colors text-sm font-medium"
      >
        Most Reviewed
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["filter-change"]);

const locations = ["Malang", "Jakarta", "Surabaya", "Yogyakarta"];
const selectedLocations = ref([]);
const selectedRatings = ref([]);

watch(
  [selectedLocations, selectedRatings],
  () => {
    emit("filter-change", {
      locations: selectedLocations.value,
      ratings: selectedRatings.value,
    });
  },
  { deep: true }
);
</script>