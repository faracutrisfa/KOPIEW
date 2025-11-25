<template>
    <router-link :to="`/threads/${id}`"
        class="block w-full shrink-0 rounded-lg shadow-md transition-all hover:shadow-xl hover:-translate-y-1 bg-white">
        <!-- Header: Profile Info -->
        <div class="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
            <div class="flex items-center gap-2">
                <img :src="profileImage" :alt="profileName" class="h-10 w-10 rounded-full object-cover" />
                <div class="flex-1">
                    <p class="text-sm font-semibold text-text-strong">
                        {{ profileName }}
                    </p>
                    <p class="text-xs text-text-body">{{ timestamp }}</p>
                </div>
            </div>
        </div>

        <!-- Image (if exists) -->
        <div v-if="image" class="relative overflow-hidden">
            <img :src="image" :alt="name" class="aspect-square w-full object-cover" />
        </div>

        <!-- Description -->
        <div v-if="description" class="px-4 py-3">
            <p class="text-sm text-text-body line-clamp-3">{{ description }}</p>
        </div>

        <!-- Actions: Like and Comment Buttons -->
        <div class="flex items-center gap-4 px-4 pb-3">
            <button @click.prevent="toggleFavorite" class="flex items-center gap-2 transition-colors"
                :class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'" aria-label="Like">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span class="text-sm font-medium">{{ likes }}</span>
            </button>

            <button @click.prevent class="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary"
                aria-label="Comment">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
                <span class="text-sm font-medium">{{ commentCount }}</span>
            </button>
        </div>

        <!-- Cafe Info (if exists) -->
        <div v-if="cafeName" class="border-t border-gray-100 px-4 py-2">
            <p class="text-xs text-text-body">
                📍 <span class="font-medium">{{ cafeName }}</span>
            </p>
        </div>
    </router-link>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    profileName: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    cafeName: {
        type: String,
        default: null,
    },
});

const isFavorite = ref(props.favorite);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};
</script>
