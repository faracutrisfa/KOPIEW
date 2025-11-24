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
                    <div v-for="item in trendingItems" :key="item.id" class="w-64 shrink-0">
                        <div class="mb-3 flex items-center gap-2">
                            <img :src="item.profileImage" :alt="item.profileName"
                                class="h-8 w-8 rounded-full object-cover" />
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-text-strong">
                                    {{ item.profileName }}
                                </p>
                                <p class="text-xs text-text-body">{{ item.timestamp }}</p>
                            </div>
                        </div>

                        <div class="group relative overflow-hidden rounded-xl">
                            <img :src="item.image" :alt="item.name"
                                class="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div class="absolute bottom-3 left-3 flex gap-2">
                                <button
                                    class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:scale-110"
                                    :class="item.isLiked ? 'text-red-500' : 'text-gray-400'" aria-label="Like">
                                    <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                                <button
                                    class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:scale-110"
                                    aria-label="Bookmark">
                                    <svg class="h-4 w-4 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";

const trendingItems = ref([
    {
        id: 1,
        profileImage: "/logo.webp",
        profileName: "PENTER USER",
        timestamp: "2 hours ago",
        image: "/logo.webp",
        name: "Trending Cafe 1",
        isLiked: true,
    },
    {
        id: 2,
        profileImage: "/logo.webp",
        profileName: "PENTER USER",
        timestamp: "3 hours ago",
        image: "/logo.webp",
        name: "Trending Cafe 2",
        isLiked: false,
    },
    {
        id: 3,
        profileImage: "/logo.webp",
        profileName: "PENTER USER",
        timestamp: "5 hours ago",
        image: "/logo.webp",
        name: "Trending Cafe 3",
        isLiked: true,
    },
    {
        id: 4,
        profileImage: "/logo.webp",
        profileName: "PENTER USER",
        timestamp: "1 day ago",
        image: "/logo.webp",
        name: "Trending Cafe 4",
        isLiked: false,
    },
    {
        id: 5,
        profileImage: "/logo.webp",
        profileName: "PENTER USER",
        timestamp: "2 days ago",
        image: "/logo.webp",
        name: "Trending Cafe 5",
        isLiked: true,
    },
]);
</script>
