<template>
    <div class="w-72 shrink-0 rounded-lg shadow-md">
        <div class="mb-3 flex items-center justify-between gap-2 px-3">
            <img :src="profileImage" :alt="profileName" class="h-8 w-8 rounded-full object-cover" />
            <div class="flex-1">
                <p class="text-sm font-semibold text-text-strong">
                    {{ profileName }}
                </p>
            </div>
            <p class="text-xs text-text-body">{{ timestamp }}</p>
            :
        </div>

        <div class="group relative overflow-hidden rounded-lg">
            <img :src="image" :alt="name" class="aspect-4/3 w-full p-2 object-cover" />
            <div class="absolute bottom-3 left-3 flex gap-2">
                <button
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:scale-110"
                    :class="isFavorite ? 'text-red-500' : 'text-gray-400'" @click="toggleFavorite" aria-label="Like">
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
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
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    bookmarked: {
        type: Boolean,
        default: false,
    },
});

const isFavorite = ref(props.favorite);
const isBookmarked = ref(props.bookmarked);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};

const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
};
</script>
