<script setup>
import { ref, onMounted, nextTick } from "vue";
import Review from "./components/Review.vue";
import Rating from "./components/Rating.vue";
import { placeDetail, placeReviews } from "../../services/placeDetail";
import normalizeImageUrl from "../../helper/Helper";
import ImagePreview from "./components/ImagePreview.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const thumbs = ref([
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
    "https://picsum.photos/300/200?4",
    "https://picsum.photos/300/200?5",
    "https://picsum.photos/300/200?6",
    "https://picsum.photos/300/200?7"
]);

const placeData = ref(null);
const placeReviewsData = ref(null);

onMounted(async () => {
    placeData.value = await placeDetail(props.id);
    placeReviewsData.value = await placeReviews(props.id);
});
</script>


<template>
    <div class="min-h-screen px-6 py-10">
        <div v-if="!placeData">
            Loading...
        </div>
        <div v-if="placeData" class="flex gap-6">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col">
                    <ImagePreview :thumbs="thumbs" />
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
                <span v-if="placeData" class="text-sm text-gray-500">{{ placeData.data.data.address }}</span>
    
                <div class="flex items-center gap-3">
                    <h2 v-if="placeData" class="text-2xl font-semibold">{{ placeData.data.data.name }}</h2>
    
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
    
                <p v-if="placeData" class="text-gray-600 line-clamp-8">
                    {{ placeData.data.data.description }}
                </p>
    
                <h4 class="font-bold mt-3 mb-2">Reviews</h4>
                <div id="reviewers">
                    <p class="text-center" v-if="!placeReviewsData?.data?.data.length">Tidak memiliki review</p>
                    <Review
                        v-for="(review, index) in placeReviewsData?.data?.data || []"
                        :key="index"
                        :userName="review.user.name"
                        :userAvatar="normalizeImageUrl(review.user.profile_photo)"
                        :rating="review.rating"
                        :reviewText="review.content"
                        :reviewImage="review.images"
                        :reviewDate="new Date(review.created_at).toLocaleDateString('id-ID')"
                    />
                </div>
                <h4 class="font-bold mt-3 mb-2">Galery</h4>
                <div
                    id="galery"
                    class="grid grid-cols-4 gap-3 overflow-y-hidden max-h-screen"
                >
                    <p
                        class="col-span-4 text-center"
                        v-if="!placeData?.data?.data?.photos?.length"
                    >
                        Tidak memiliki galery
                    </p>

                    <div
                        v-for="(img, index) in placeData?.data?.data?.photos || []"
                        :key="index"
                        class="w-full shadow-lg aspect-square rounded-lg overflow-hidden"
                    >
                        <img
                            :src="normalizeImageUrl(img.url)"
                            alt="Gallery Image"
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
