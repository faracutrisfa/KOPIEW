<script setup>
import { ref, onMounted, nextTick } from "vue";
import Review from "./components/Review.vue";
import Rating from "./components/Rating.vue";

// STATE
const image = ref(null);
const thumbs = ref([
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
    "https://picsum.photos/300/200?4",
    "https://picsum.photos/300/200?5",
    "https://picsum.photos/300/200?6",
    "https://picsum.photos/300/200?7"
]);

// REFS
const thumbContainer = ref(null);

// LIFECYCLE
onMounted(() => {
    image.value = thumbs.value[0];
});

// METHODS
const selectThumb = (index) => {
    image.value = thumbs.value[index];
    nextTick(() => centerThumbnail(index));
};

const nextImage = () => {
    const index = thumbs.value.indexOf(image.value);
    const nextIndex = (index + 1) % thumbs.value.length;
    image.value = thumbs.value[nextIndex];
    nextTick(() => centerThumbnail(nextIndex));
};

const prevImage = () => {
    const index = thumbs.value.indexOf(image.value);
    const prevIndex = (index - 1 + thumbs.value.length) % thumbs.value.length;
    image.value = thumbs.value[prevIndex];
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

    const scrollTo =
        offsetLeft - containerWidth / 2 + thumbWidth / 2;

    container.scrollTo({
        left: scrollTo,
        behavior: "smooth"
    });
};
</script>


<template>
    <div class="flex gap-6">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col">
                <div
                    class="relative w-[40vw] h-[80vh] rounded-xl overflow-hidden 
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
                    class="flex gap-2 items-center mt-3 max-w-[40vw] mx-auto 
                        overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                >
                    <div
                        v-for="(thumb, index) in thumbs"
                        :key="index"
                        class="w-30 h-25 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0"
                        :class="image === thumb ? 'border-primary-40' : 'border-transparent'"
                        @click="selectThumb(index)"
                    >
                        <img :src="thumb" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div class="flex w-full gap-10 bg-primary/80 px-4 py-5 rounded-lg text-white items-center">             
                <div class="flex gap-2">
                    <h1 class="font-bold text-6xl">4.2</h1>
                    <p class="text-lg pb-1">dari 5</p>
                </div>

                <div class="flex-1">
                    <Rating 
                        :ratingCounts="{5: 12, 4: 7, 3: 4, 2: 1, 1: 0}" 
                        :totalReviews="24" 
                    />
                </div>
            </div>
        </div>
        
        <div class="flex flex-col flex-1">
            <span class="text-sm text-gray-500">Malang</span>

            <div class="flex items-center gap-3">
                <h2 class="text-2xl font-semibold">Contoh Nama Caffe</h2>

                <div class="bg-primary-40 px-3 py-1 rounded text-white text-lg">
                    24 Jam
                </div>
            </div>

            <div class="flex gap-2 pb-2 items-center my-3">
                <div class="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-5">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-5">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-5">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-5">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-5">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <p class="font-bold text-sm">4</p>
                <p class="text-sm font-bold text-gray-200">(20 review)</p>
            </div>

            <p class="text-gray-600 line-clamp-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eveniet tempore labore iusto quibusdam! Nisi sunt cum earum! Maxime cum natus quibusdam cumque ipsum quisquam incidunt illo optio sunt tempore inventore officiis sit mollitia repellendus deserunt quidem, non voluptas beatae numquam facere amet! Eveniet quas id nam velit. Dolores laborum labore iusto vel, ipsa repellendus assumenda voluptatum perferendis dignissimos alias nostrum nesciunt id sed laboriosam similique temporibus. Aliquam repellendus blanditiis officia fugit, iure quam labore asperiores velit eos. Aliquid alias nesciunt harum nihil ratione quia perferendis sequi eius odio aperiam temporibus deserunt autem doloribus ipsam hic pariatur non corrupti delectus, magnam aspernatur, quis iure porro enim cum. Facilis aut obcaecati nihil modi accusantium dicta amet id, asperiores fugiat et explicabo voluptatum consequatur voluptas consequuntur? Atque ratione consectetur consequuntur? Libero nostrum culpa magnam quia illo labore cumque, veniam nobis incidunt illum adipisci sequi esse, praesentium maiores at sapiente saepe atque necessitatibus consequatur. Illum ea, animi qui molestias suscipit temporibus, odit nihil numquam laudantium, consectetur excepturi maiores? Commodi ipsum quam eius, in, assumenda molestiae itaque corporis, consequatur temporibus placeat voluptatem ipsa praesentium sequi alias! Rem consequuntur cum assumenda fugiat reiciendis sit aliquam quia nostrum dicta possimus! Est soluta unde eius. Fugiat, laudantium?
            </p>

            <h4 class="font-bold mt-3 mb-2">Reviews</h4>
            <div id="reviewers">
                <Review />
            </div>
        </div>
    </div>
</template>
