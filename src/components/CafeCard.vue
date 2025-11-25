<template>
    <div
        class="group relative overflow-hidden rounded-2xl bg-bg-main shadow-md transition-all duration-300 hover:shadow-xl">
        <div class="relative aspect-4/3 overflow-hidden">
            <img :src="image" :alt="name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />


        </div>

        <div class="p-4">
            <div class="mt-2 flex items-center justify-between">
                <h3 class="text-lg font-bold text-text-strong">{{ name }}</h3>
                <span v-if="duration" class="text-xs text-text-body">{{ duration }}</span>
            </div>
            <p class="text-xs -translate-y-1 text-text-body">{{ location }}</p>


            <div class="mb-3 flex items-center gap-1">
                <div class="flex items-center gap-0.5">
                    <span v-for="star in 5" :key="star" class="text-sm"
                        :class="star <= rating ? 'text-yellow-500' : 'text-gray-300'">
                        ★
                    </span>
                </div>
                <span class="ml-1 text-sm font-semibold text-text-strong">{{ rating }}</span>
            </div>

            <p class="mb-12 line-clamp-2 text-sm text-text-body">
                {{ description }}
            </p>

            <div class="flex justify-between items-center gap-4">
                <button class="flex h-10 w-14 items-center justify-center rounded-full transition-all hover:scale-110"
                    :class="isFavorite ? 'text-red-500' : 'text-gray-300'" @click="confirmToggle"
                    aria-label="Toggle favorite">
                    <svg class="h-8 w-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
                <BaseButton :full="true" variant="primary" size="md" @click="viewDetail">
                    Lihat Detail
                </BaseButton>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl w-80">
                <h4 class="text-xl font-bold mb-4">{{ isFavorite ? 'Hapus dari Wishlist?' : 'Tambahkan ke Wishlist?' }}</h4>
                <p class="mb-6 text-text-body">
                    {{ isFavorite 
                        ? 'Anda yakin ingin menghapus ' + name + ' dari daftar Wishlist Anda?' 
                        : 'Anda yakin ingin menambahkan ' + name + ' ke daftar Wishlist Anda?' }}
                </p>
                <div class="flex justify-end gap-3">
                    <button @click="showModal = false" class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">Batal</button>
                    <button @click="handleToggleAction" 
                            :class="['px-4 py-2 text-sm text-white rounded-lg', isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600']">
                        {{ isFavorite ? 'Ya, Hapus' : 'Ya, Tambah' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "./BaseButton.vue";
import { createWishlist, deleteWishlistItem } from '../services/wishlist';

const props = defineProps({
    id: {
        type: Number,
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
    initialWishlistId: {
        type: [Number, null],
        default: null,
    }
});

const emit = defineEmits(['view-detail', 'toggled', 'removed']);
const router = useRouter();

const isFavorite = ref(props.favorite);
const showModal = ref(false);
const currentWishlistId = ref(props.initialWishlistId);

watch(() => props.favorite, (newVal) => {
    isFavorite.value = newVal;
});

const confirmToggle = () => {
    if (!localStorage.getItem('token')) {
        alert('Anda harus login untuk menggunakan fitur Wishlist.');
        return;
    }
    showModal.value = true;
};

const handleToggleAction = async () => {
    showModal.value = false;

    try {
        if (isFavorite.value) {
            const idToDelete = currentWishlistId.value; 
            
            if (idToDelete) {
                await deleteWishlistItem(idToDelete);
                isFavorite.value = false;
                currentWishlistId.value = null;
                alert('Berhasil dihapus dari Wishlist!');
                if (props.initialWishlistId) {
                    emit('removed'); 
                } else {
                    emit('toggled'); 
                }
            } else {
                alert('Gagal menghapus: ID Wishlist tidak ditemukan. (Pastikan API Home/Trending menyediakan ID Wishlist untuk item yang sudah di-like).');
            }
        } else {
            const response = await createWishlist(props.id);
            isFavorite.value = true;
            currentWishlistId.value = response.data.data.id;
            alert('Berhasil ditambahkan ke Wishlist!');
            emit('toggled'); 
        }
    } catch (error) {
        console.error("Gagal melakukan aksi Wishlist:", error);
        alert(`Gagal: ${error.response?.data?.message || error.message}`);
    }
};

const viewDetail = () => {
    router.push({ name: 'place-detail', params: { id: props.id } });
    emit('view-detail', props.id);
};
</script>