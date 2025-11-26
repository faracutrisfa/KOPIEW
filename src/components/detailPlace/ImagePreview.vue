<script setup>
import { onMounted } from 'vue';
import { ref, nextTick } from 'vue';

const props = defineProps({
  thumbs: {
    type: Array,
    required: true,
  },
})

const image = ref(null);

const thumbContainer = ref(null);

onMounted(async () => {;
    image.value = props.thumbs[0];
});

const selectThumb = (index) => {
    image.value = props.thumbs[index];
    nextTick(() => centerThumbnail(index));
};

const nextImage = () => {
    const index = props.thumbs.indexOf(image.value);
    const nextIndex = (index + 1) % props.thumbs.length;
    image.value = props.thumbs[nextIndex];
    nextTick(() => centerThumbnail(nextIndex));
};

const prevImage = () => {
    const index = props.thumbs.indexOf(image.value);
    const prevIndex = (index - 1 + props.thumbs.length) % props.thumbs.length;
    image.value = props.thumbs[prevIndex];
    nextTick(() => centerThumbnail(prevIndex));
};

const centerThumbnail = (index) => {
    const container = thumbContainer.value;
    if (!container) return;

    const thumbEl = container.children[index];
    if (!thumbEl) return;

    const containerWidth = container.clientWidth;
    const thumbWidth = thumbEl.clientWidth;
    const offsetLeft = thumbEl.offsetLeft;

    const scrollTo = offsetLeft - containerWidth / 2 + thumbWidth / 2;

    container.scrollTo({
        left: scrollTo,
        behavior: "smooth"
    });
};
</script>

<template>
    <div class="flex flex-col">
        <div
            class="relative w-full w-[40vw]/2 h-[80vh]/2 lg:h-[80vh] rounded-xl overflow-hidden 
                bg-gradient-to-br from-indigo-200 via-pink-200 to-yellow-200 flex items-center justify-center"
        >
            <div
                v-if="!image"
                class="w-full h-full flex items-center justify-center text-gray-600 font-semibold"
            >
                <span>No Image</span>
            </div>

            <img
                v-else
                :src="image"
                alt="preview"
                class="w-full h-full object-cover"
            />

            <button
                class="absolute left-3 top-1/2 -translate-y-1/2 
                    bg-white/70 backdrop-blur-md p-2 rounded-lg shadow hover:bg-white"
                @click="prevImage"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" class="size-6 text-primary-40">
                    <path fill-rule="evenodd"
                        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <button
                class="absolute right-3 top-1/2 -translate-y-1/2 
                    bg-primary-40/70 backdrop-blur-md p-2 rounded-lg shadow hover:bg-primary-40"
                @click="nextImage"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" class="size-6 text-gray-100">
                    <path fill-rule="evenodd"
                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <div
            ref="thumbContainer"
            class="flex gap-2 items-center mt-3 w-full mx-auto 
                overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        >
            <div
                v-for="(thumb, index) in props.thumbs"
                :key="index"
                class="w-[150px] h-[120px] rounded-lg overflow-hidden cursor-pointer border-3 flex-shrink-0"
                :class="image === thumb ? 'border-primary' : 'border-transparent'"
                @click="selectThumb(index)"
            >
                <img :src="thumb" class="w-full h-full object-cover" />
            </div>
        </div>
    </div>
</template>