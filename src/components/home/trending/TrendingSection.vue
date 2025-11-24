<template>
    <section class="bg-bg-main py-8 md:py-12">
        <div class="container mx-auto px-6">

            <div class="mb-8">
                <p class="mb-2 text-sm font-medium text-text-body">Trending</p>
                <h2 class="mb-2 text-3xl font-bold text-text-strong md:text-4xl">
                    Perkumpulan orang Kalcer.
                </h2>
                <p class="text-sm text-text-body md:text-base">
                    Langkahkan kakimu kesana!
                </p>
            </div>

            <div class="overflow-x-auto pb-4">
                <div class="flex gap-4" style="min-width: min-content">
                    <ThreadCard v-for="thread in trendingItems" :key="thread.id" :profileImage="thread.profileImage"
                        :profileName="thread.profileName" :timestamp="thread.timestamp" :image="thread.image"
                        :name="thread.name" :favorite="thread.favorite" :bookmarked="thread.bookmarked" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import ThreadCard from "../../ThreadCard.vue";
import { trendingThreads } from "../../../data/trending/dataTrending.js";

const trendingItems = ref(trendingThreads);
</script>
