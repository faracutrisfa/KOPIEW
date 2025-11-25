<script setup>
import { ref } from "vue";

const props = defineProps({
  userNama: String,
  userAvatar: String,
  rating: Number,
  reviewText: String,
  reviewImage: Array,
  reviewDate: String,
});

const activeImage = ref(props.reviewImage?.[0] ?? null);
</script>


<template>
    <div class="flex flex-col gap-2 shadow-sm p-4 rounded-lg mb-3">
        <div class="flex items-center gap-2">
            <div class="w-[60px] h-[60px] rounded">
                <img :src="userAvatar ?? 'https://blogger.googleusercontent.com/img/a/AVvXsEgFEMze_nmuI79pIvhZ6Nam0oSOUrWz0jTW-WZmhkrfb0gtvuAbTyWcRrDmfBTwDq6nhFSziH9LwV1zD2pkAsK2AmFaiqXlPl4Wp8gLMN5sQ0y0ajM_PeXaFl5DZYU1p6oNdwLR84hqMbPF9z8n_HUGVQAxL0OT4vH7S21SnzZ_GgFaGmyI-lklxLeJ'" alt="User Avatar" class="w-full h-full object-cover rounded" />
            </div>
            <div class="flex flex-col">
                <p class="font-bold">{{ userNama ?? "Anonymous"}}</p>
                <div class="flex mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-3">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-3">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-3">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-3">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-3">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <p class="text-[10px]">{{ reviewDate ?? "09/09/9999" }}</p>
            </div>
        </div>
        <p>{{ reviewText }}</p>
        <button>
            <div class="w-[80px] h-[80px] rounded bg-red-100">
                <img :src="reviewImage?.[0] ?? 'https://via.placeholder.com/80'" alt="Review Image" class="w-full h-full object-cover rounded" />
            </div>
        </button>
    </div>
</template>