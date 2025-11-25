<script setup>
import { ref, onMounted, computed } from "vue";
import Review from "../components/detailPlace/Review.vue";
import Rating from "../components/detailPlace/Rating.vue";
import { deleteGalleryImage, getGallery, getProfile, getRating, placeDetail, placeReviews, reviewDelete, uploadGalleryImage, uploadReview } from "../services/placeDetail";
import normalizeImageUrl, { getToken } from "../helper/Helper";
import ImagePreview from "../components/detailPlace/ImagePreview.vue";
import BaseButton from "../components/BaseButton.vue";
import GalleryUploader from "../components/detailPlace/GalleryUploader.vue";

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

const profileData = ref(null);
const placeData = ref(null);
const placeGallery = ref(null);
const placeReviewsData = ref(null);
const placeRating = ref(null);
const showReviewInput = ref(false);
const newReview = ref("");
const selectedRating = ref(0);
const showUpload = ref(false);

onMounted(async () => {
    if(getToken()) {
        profileData.value = await getProfile();
    }
    placeGallery.value = await getGallery(props.id);
    placeData.value = await placeDetail(props.id);
    placeReviewsData.value = await placeReviews(props.id);
    placeRating.value = await getRating(props.id);
});

const hasUserReviewed = computed(() => {
    const userId = profileData.value?.data.data.id;;  
    const reviews = placeReviewsData?.value?.data.data || []; 
    if (!userId || !reviews.length) return false;
    return reviews.some(review => review.user?.id === userId);
});

const handleUpload = async (formData) => {
    try {
        await uploadGalleryImage(props.id, formData); 
        placeGallery.value = await getGallery(props.id);
        alert("Gambar berhasil diupload");
    } catch (err) {
        alert("Gagal mengupload gambar");
        console.error(err);
    }
};

const deleteImage = async (id) => {
    try {
        confirm("Apakah ingin menghapus gambar ini?")
        await deleteGalleryImage(props.id, id)
        placeGallery.value = await getGallery(props.id);
        alert("Gambar berhasil dihapus");
    } catch (error) {
        alert("Gagal menghapus gambar");
        console.error(error);   
    }
};

const submitReview = async () => {
  if (!newReview.value.trim()) return alert("Review tidak boleh kosong");

  try {
    await uploadReview(props.id, { content: newReview.value, rating: selectedRating.value }); 
    placeReviewsData.value = await placeReviews(props.id);
    placeRating.value = await getRating(props.id);
    newReview.value = "";
    selectedRating.value = 0;
    showReviewInput.value = false;
    alert("Review berhasil dikirim");
  } catch (err) {
    console.error(err);
    alert("Gagal mengirim review");
  }
};

const deleteReview = async (id) => {
    try {
        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus review ini?");
        if (!confirmDelete) return;

        await reviewDelete(props.id, id);
        placeRating.value = await getRating(props.id);
        placeReviewsData.value = await placeReviews(props.id);
        alert("Review berhasil dihapus");
    } catch (error) {
        alert("Gagal menghapus review");
        console.error(error);   
    }
};
</script>

<template>
    <div class="min-h-screen px-6 py-10">
        <div v-if="!placeData">
            Loading...
        </div>
        <div v-if="placeData" class="flex gap-6 h-full">
            <div class="sticky top-3 self-start flex flex-col gap-4">
                <div class="flex flex-col">
                    <ImagePreview :thumbs="thumbs" />
                </div>
    
                <div class="flex w-full gap-10 bg-primary/80 px-4 py-5 rounded-lg text-white items-center">             
                    <div class="flex gap-2">
                        <h1 class="font-bold text-6xl">{{ placeRating?.total_bintang / placeRating?.total_reviewer }}</h1>
                        <p class="text-lg pb-1">dari 5</p>
                    </div>
    
                    <div class="flex-1">
                        <Rating 
                            :ratingCounts="{5: placeRating?.bintang_5, 4: placeRating?.bintang_4, 3: placeRating?.bintang_3, 2: placeRating?.bintang_2, 1: placeRating?.bintang_1}" 
                            :totalReviews="placeRating?.total_bintang" 
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
                        <svg v-for="i in 5" :key="i"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-5"
                            :class="(placeRating?.total_bintang / placeRating?.total_reviewer) >= i ? 'text-primary' : 'text-gray-200'">
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <p class="font-bold text-sm">{{ placeRating?.total_bintang / placeRating?.total_reviewer }}</p>
                    <p class="text-sm font-bold text-gray-200">({{ placeRating?.total_reviewer }} review)</p>
                </div>
    
                <p v-if="placeData" class="text-gray-600 line-clamp-8">
                    {{ placeData.data.data.description }}
                </p>
    
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-bold mt-3 mb-2">Reviews</h4>
                   <BaseButton 
                        :full="false" 
                        size="sm" 
                        v-if="getToken() && !hasUserReviewed" 
                        @click="showReviewInput = !showReviewInput"
                    >
                        Tambah
                    </BaseButton>

                </div>

                <div v-if="showReviewInput" class="mb-4">
                    <div class="flex gap-1 mb-2">
                        <svg
                            v-for="i in 5"
                            :key="i"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-6 cursor-pointer transition-colors duration-200"
                            :class="i <= selectedRating ? 'text-primary' : 'text-gray-300'"
                            @click="selectedRating = i"
                        >
                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"/>
                        </svg>
                    </div>

                    <textarea
                        v-model="newReview"
                        placeholder="Tulis review Anda..."
                        class="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-40"
                        rows="3"
                    ></textarea>

                    <div class="flex justify-end mt-2">
                        <BaseButton size="sm" @click="submitReview">Kirim</BaseButton>
                    </div>
                </div>


                <div id="reviewers">
                    <p class="text-center" v-if="!placeReviewsData?.data?.data.length">Tidak memiliki review</p>
                    <Review
                        v-for="(review, index) in placeReviewsData?.data?.data || []"
                        :key="index"
                        :reviewId="review.id"
                        :userName="review.user.name"
                        :userAvatar="normalizeImageUrl(review.user.profile_photo)"
                        :rating="review.rating"
                        :reviewText="review.content"
                        :reviewImage="review.images"
                        :reviewDate="new Date(review.created_at).toLocaleDateString('id-ID')"
                        :replies="review.replies ?? []"
                        :userId="review.user_id"
                        :profileData="profileData"
                        @click="deleteReview(review.id)"
                    />
                </div>
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-bold mt-3 mb-2">Galery</h4>
                    <BaseButton :full="false" size="sm" v-if="getToken()" @click="showUpload = !showUpload"> Tambah </BaseButton>
                </div>

                <GalleryUploader
                    v-if="showUpload"
                    @uploaded="handleUpload"
                    @close="showUpload = false"
                />
                
                <div
                    id="galery"
                    class="grid grid-cols-4 gap-3 overflow-y-auto max-h-fit"
                >
                    <p
                        class="col-span-4 text-center"
                        v-if="!placeData?.data?.data?.photos?.length"
                    >
                        Tidak memiliki galery
                    </p>

                    <div
                        v-for="(img, index) in placeGallery?.data?.data || []"
                        :key="index"
                        class="relative"
                    >
                        <div class="flex flex-col w-full shadow-lg aspect-square rounded-lg overflow-hidden">
                            <img
                                :src="normalizeImageUrl(img.url)"
                                alt="Gallery Image"
                                class="w-full h-full object-cover overflow-hidden"
                            />
                        </div>
                        <button
                            v-if="img.user.id === profileData?.data.data.id"
                            @click="deleteImage(img.id)"
                            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-tr-lg  hover:bg-red-600"
                            title="Hapus gambar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
