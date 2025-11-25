<template>
  <div class="min-h-screen bg-bg-main">
    <div class="bg-gradient-to-r from-primary to-primary-40 py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-cream mb-2">Semua Tempat</h1>
            <p class="text-cream/80 text-sm">
              Pencarian({{ totalPlaces }})
            </p>
          </div>
          <button 
          @click="router.push({name: 'add-place'})"
          class="bg-primary-20 text-primary px-6 py-2 rounded-lg font-semibold hover:bg-cream transition-colors">
          + tambah tempat mu sendiri.
        </button>
        </div>
        <div class="relative">
          <input type="text" 
          v-model="searchQuery"
          placeholder="Cari sesuatu"
          class="w-full px-4 py-3 pr-12 rounded-lg bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-yellow"
          >
          <button class="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-1">
          <FilterSidebar @filter-change="handleFilterChange"/>
        </div>

        <div class="lg:col-span-3">
          <div class="flex justify-end mb-6">
            <select 
            v-model="sortBy"
            class="px-4 py-2 rounded-lg border border-border bg-white text-text-body focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">Popular</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="newest">Terbaru</option>
          </select>
          </div>

          <div v-if="loading" class="text-center py-12">
            <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p class="mt-4 text-text-body">Memuat data...</p>
          </div>

          <div 
          v-else-if="error"
          class="text-center py-12 bg-red-50 rounded-lg border border-red-200">
            <p class="text-red-600 font-semibold">{{ error }}</p>
          </div>

          <div
          v-else-if="filteredPlaces.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <CafeCard
              v-for="place in filteredPlaces"
              :key="place.id"
              :id="place.id"
              :name="place.name"
              :location="place.address"
              :description="place.description"
              :image="getPlaceImage(place)"
              :rating="calculateAverageRating(place.reviews)"
              :duration="place.operating_hours"
            />
          </div>
          
          <div
            v-else
            class="text-center py-12 bg-white rounded-lg border border-dashed border-border"
          >
            <p class="text-text-disabled">Tidak ada tempat yang ditemukan</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CafeCard from "../components/CafeCard.vue";
import FilterSidebar from "../components/FilterSidebar.vue";
import { getPlaces } from "../services/place.js";
import { useRouter } from "vue-router";

const router = useRouter();
const places = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const sortBy = ref("popular");
const filters = ref({
  locations: [],
  ratings: [],
});

const totalPlaces = computed(() => places.value.length);

const filteredPlaces = computed (() => {
  let result = [...places.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLocaleLowerCase();
    result = result.filter(
      (place) => 
        place.name.toLocaleLowerCase().includes(query) ||
        place.address.toLocaleLowerCase().includes(query) ||
        place.description.toLocaleLowerCase().includes(query)
    );
  }

  if (filters.value.locations.length > 0) {
    result = result.filter(
      (place) => 
        filters.value.locations.some((loc) =>
        place.address.toLocaleLowerCase().includes(loc.toLocaleLowerCase())
      )
    );
  }

  if (filters.value.ratings.length > 0) {
    result = result.filter(
      (place) => {
      const avgRating = calculateAverageRating(place.reviews);
      return filters.value.ratings.includes(Math.floor(avgRating))
    });
  }

  if (sortBy.value === "rating") {
    result.sort(
      (a, b) =>
        calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews)
    );
  } else if (sortBy.value === "newest") {
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return result;
})

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
};

const getPlaceImage = (place) => {
  if (place.photos && place.photos.length > 0) {
    return place.photos[0].url;
  }
  return "https://via.placeholder.com/640x480.png/cccccc?text=No+Image";
};

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

const fetchPlaces = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await getPlaces();
    places.value = response.data.data;
  } catch (err) {
    error.value = "Gagal memuat data tempat. Silakan coba lagi.";
    console.error("Error fetching places:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPlaces();
});

</script>