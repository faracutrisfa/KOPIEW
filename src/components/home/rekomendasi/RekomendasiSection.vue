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
                <!-- Empty State -->
                <div v-if="!cafes || cafes.length === 0"
                    class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="mb-4 text-6xl opacity-30">☕</div>
                    <h3 class="mb-2 text-lg font-semibold text-text-strong">Belum ada rekomendasi cafe</h3>
                    <p class="text-sm text-text-body">Kami sedang mencari cafe terbaik untuk kamu!</p>
                </div>

                <!-- Cafes Grid -->
                <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <CafeCard v-for="cafe in cafes" :key="cafe.id" :image="cafe.image" :name="cafe.name"
                        :duration="cafe.duration" :location="cafe.location" :rating="cafe.rating"
                        :description="cafe.description" :favorite="cafe.favorite" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import CafeCard from "../../CafeCard.vue";
import { rekomendasiCafes } from "../../../data/rekomendasi/dataRekomendasi.js";
import { useScrollAnimation } from "../../../composables/useScrollAnimation";

const cafes = ref(rekomendasiCafes);

const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 });
const { elementRef: contentRef, isVisible: isContentVisible } = useScrollAnimation({ threshold: 0.1 });
</script>
