<template>
    <section class="bg-bg-main py-12 md:py-16">
        <div class="container mx-auto px-6">

            <div ref="headerRef" :class="['mb-8 text-center scroll-animate', { 'is-visible': isHeaderVisible }]">
                <p class="mb-2 text-sm font-medium text-text-body">Rekomendasi</p>
                <h2 class="mb-2 text-3xl font-bold text-text-strong md:text-4xl">
                    Explorasi Cafemu.
                </h2>
                <p class="text-sm text-text-body md:text-base">
                    Langkahkan kakimu kesana!
                </p>
            </div>

            <div ref="contentRef" :class="['scroll-animate-fade', { 'is-visible': isContentVisible }]">
                <div v-if="loading" class="flex justify-center py-8">
                    <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>

                <div v-else-if="!cafes || cafes.length === 0"
                    class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="mb-4 text-6xl opacity-30">☕</div>
                    <h3 class="mb-2 text-lg font-semibold text-text-strong">Belum ada rekomendasi cafe</h3>
                    <p class="text-sm text-text-body">Kami sedang mencari cafe terbaik untuk kamu!</p>
                </div>

                <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <CafeCard v-for="cafe in cafes" :key="cafe.id" :id="cafe.id" :image="getPlaceImage(cafe)"
                        :name="cafe.name" :duration="cafe.operating_hours" :location="cafe.address"
                        :rating="calculateAverageRating(cafe.reviews)" :description="cafe.description"
                        :favorite="false" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CafeCard from "../../CafeCard.vue";
import { getPlaces } from "../../../services/place.js";
import { useScrollAnimation } from "../../../composables/useScrollAnimation";

const cafes = ref([]);
const loading = ref(true);
const error = ref(null);

const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 });
const { elementRef: contentRef, isVisible: isContentVisible } = useScrollAnimation({ threshold: 0.1 });

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
        const response = await getPlaces();
        cafes.value = response.data.data.slice(0, 4);
    } catch (err) {
        console.error("Failed to load places:", err);
        error.value = "Gagal memuat rekomendasi cafe.";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchPlaces();
});
</script>
