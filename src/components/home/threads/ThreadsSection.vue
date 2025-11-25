<template>
    <section class="bg-bg-main py-8 md:py-12">
        <div class="container mx-auto px-6">

            <div ref="headerRef" :class="['mb-8 flex justify-start scroll-animate', { 'is-visible': isHeaderVisible }]">
                <div class="text-left">
                    <p class="mb-2 text-sm font-medium text-text-body">Threads</p>
                    <h2 class="mb-2 text-3xl font-bold text-text-strong md:text-4xl">
                        Perkumpulan orang Kalcer.
                    </h2>
                    <p class="text-sm text-text-body md:text-base">
                        Langkahkan kakimu kesana!
                    </p>
                </div>
            </div>

            <div ref="contentRef" :class="['scroll-animate-fade', { 'is-visible': isContentVisible }]">
                <!-- Empty State -->
                <div v-if="!trendingItems || trendingItems.length === 0"
                    class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="mb-4 text-6xl opacity-30">📝</div>
                    <h3 class="mb-2 text-lg font-semibold text-text-strong">Belum ada threads</h3>
                    <p class="text-sm text-text-body">Jadilah yang pertama untuk berbagi cerita!</p>
                </div>

                <!-- Threads List -->
                <div v-else class="overflow-x-auto pb-4">
                    <div class="flex gap-4" style="min-width: min-content">
                        <ThreadCard v-for="thread in trendingItems" :key="thread.id" :profileImage="thread.profileImage"
                            :profileName="thread.profileName" :timestamp="thread.timestamp" :image="thread.image"
                            :name="thread.name" :favorite="thread.favorite" :bookmarked="thread.bookmarked" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import ThreadCard from "../../ThreadCard.vue";
import { trendingThreads } from "../../../data/trending/dataTrending.js";
import { useScrollAnimation } from "../../../composables/useScrollAnimation";

const trendingItems = ref(trendingThreads);

const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 });
const { elementRef: contentRef, isVisible: isContentVisible } = useScrollAnimation({ threshold: 0.1 });
</script>
