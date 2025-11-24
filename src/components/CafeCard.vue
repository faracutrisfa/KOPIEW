<template>
    <div
        class="group relative overflow-hidden rounded-2xl bg-bg-main shadow-md transition-all duration-300 hover:shadow-xl">
        <div class="relative aspect-4/3 overflow-hidden">
            <img :src="image" :alt="name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />


        </div>

        <div class="p-4">
            <div class="mb flex items-center justify-between">
                <h3 class="text-lg font-bold text-text-strong">{{ name }}</h3>
                <span v-if="duration" class="text-xs text-text-body">{{ duration }}</span>
            </div>
            <p class="text-xs -translate-y-1 text-text-body">{{ location }}</p>


            <div class="mb-3 flex items-center gap-1">
                <div class="flex items-center gap-0.5">
                    <span v-for="star in 5" :key="star" class="text-sm"
                        :class="star <= rating ? 'text-text-disabled' : 'text-gray-300'">
                        ★
                    </span>
                </div>
                <span class="ml-1 text-sm font-semibold text-text-strong">{{ rating }}</span>
            </div>

            <p class="mb-12 line-clamp-2 text-sm text-text-body">
                {{ description }}
            </p>

            <div class="flex justify-between items-center gap-4">
                <BaseButton :full="true" variant="primary" size="md">
                    Lihat Detail
                </BaseButton>
                <button
                    class="flex h-10 w-14 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110"
                    :class="isFavorite ? 'text-red-500' : 'text-gray-300'" @click="toggleFavorite"
                    aria-label="Toggle favorite">
                    <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
import BaseButton from "./BaseButton.vue";

const props = defineProps({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: "",
    },
    duration: {
        type: String,
        default: "",
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const isFavorite = ref(props.favorite);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};
</script>
