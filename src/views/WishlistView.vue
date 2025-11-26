<template>
  <div class="min-h-screen bg-bg-light p-4 md:p-8">
    <div class="mx-auto max-w-7xl">
      <h1 class="text-3xl font-bold text-text-strong mb-2">Wishlist-mu</h1>
      <p class="text-lg text-text-body mb-8">
        Apa yang ingin kamu kunjungi tersimpan aman di sini. Ayo saatnya membuat
        rencana.
      </p>

      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="tag in tags"
          :key="tag"
          :class="[
            'px-4 py-2 text-sm rounded-full font-semibold transition',
            selectedTag === tag
              ? 'bg-primary-500 text-white'
              : 'bg-bg-soft text-text-body hover:bg-bg-soft-hover',
          ]"
          @click="selectedTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <h2 class="text-2xl font-bold text-text-strong mb-6">
        Wishlist ({{ filteredWishlists.length }})
      </h2>

      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <p class="col-span-4 text-center py-10">Memuat data wishlist...</p>
      </div>

      <div
        v-else-if="!wishlists.length"
        class="text-center py-10 border border-border rounded-lg"
      >
        <p class="text-lg text-text-body">
          Kamu belum menyimpan tempat ke Wishlist. Ayo cari tempat favoritmu!
        </p>
        <RouterLink
          :to="{ name: 'tempat' }"
          class="text-primary-500 hover:underline mt-2 inline-block"
        >
          Cari Tempat
        </RouterLink>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CafeCard
          v-for="item in filteredWishlists"
          :key="item.id"
          :id="item.place.id"
          :image="item.place.image || item.place.photo_url"
          :name="item.place.name"
          :location="item.place.location"
          :rating="item.place.rating"
          :description="item.place.description"
          :duration="item.place.duration"
          :favorite="true"
          :initial-wishlist-id="item.id"
          @removed="handleWishlistRemoved"
        />
      </div>

      <TrendingSection />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getWishlists } from "../services/wishlist";
import CafeCard from "../components/CafeCard.vue";
import TrendingSection from "../components/home/trending/TrendingSection.vue";

const wishlists = ref([]);
const loading = ref(true);
const selectedTag = ref("Semua");
const tags = [
  "Semua",
  "Kuliner",
  "Malang",
  "Surabaya",
  "Bandung",
  "Bali",
  "Yogyakarta",
];

const fetchWishlists = async () => {
  loading.value = true;
  try {
    const response = await getWishlists();
    wishlists.value = response.data.data;
  } catch (error) {
    console.error("Gagal mengambil data wishlist:", error);
  } finally {
    loading.value = false;
  }
};
const handleWishlistRemoved = () => {
  fetchWishlists();
};

const filteredWishlists = computed(() => {
  if (selectedTag.value === "Semua") {
    return wishlists.value;
  }
  return wishlists.value.filter(
    (item) =>
      item.place &&
      item.place.category &&
      item.place.category.includes(selectedTag.value)
  );
});

onMounted(() => {
  fetchWishlists();
});
</script>
