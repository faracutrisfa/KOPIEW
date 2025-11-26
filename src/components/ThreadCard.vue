<template>
    <div @click="navigateToThread"
        class="block w-full shrink-0 cursor-pointer rounded-lg border-2 border-gray-300 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 bg-gray-50 hover:bg-white relative">
        <div class="flex items-center justify-between gap-2 px-4 pt-4 pb-2">
            <div class="flex items-center gap-2">
                <img :src="thread.user?.avatar || '/logo.webp'" :alt="thread.user?.name || 'User'"
                    class="h-10 w-10 rounded-full object-cover" @error="$event.target.src = '/logo.webp'" />
                <div class="flex-1">
                    <p class="text-sm font-semibold text-text-strong">
                        {{ thread.user?.name || 'Unknown User' }}
                    </p>
                    <p class="text-xs text-text-body">{{ formatDate(thread.created_at) }}</p>
                </div>
            </div>

            <div v-if="isOwner" class="relative">
                <button @click.stop="toggleMenu"
                    class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>

                <div v-if="showMenu"
                    class="absolute right-0 top-full z-10 mt-1 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                    <button @click.stop="handleEdit"
                        class="block w-full px-4 py-2 text-left text-sm text-text-body hover:bg-gray-50">
                        Edit
                    </button>
                    <button @click.stop="handleDelete"
                        class="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <div v-if="thread.image" class="relative overflow-hidden">
            <img :src="getImageUrl(thread.image)" :alt="thread.content" class="aspect-square w-full object-cover"
                @error="$event.target.style.display = 'none'" />
        </div>

        <div v-if="thread.content" class="px-4 py-3">
            <p class="text-sm text-text-body line-clamp-3">{{ thread.content }}</p>
        </div>

        <div class="flex items-center gap-4 px-4 pb-3">
            <button @click.prevent="toggleFavorite" class="flex items-center gap-2 transition-colors"
                :class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'" :disabled="isLiking"
                aria-label="Like">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span class="text-sm font-medium">{{ likesCount }}</span>
            </button>

            <button @click.prevent class="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary"
                aria-label="Comment">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
                <span class="text-sm font-medium">{{ thread.comments_count || 0 }}</span>
            </button>
        </div>

        <div v-if="thread.cafe?.name || thread.cafeName" class="border-t border-gray-100 px-4 py-2">
            <p class="text-xs text-text-body">
                📍 <span class="font-medium">{{ thread.cafe?.name || thread.cafeName }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { toggleThreadLike } from "../services/threads/threadLikeService";
import { deleteThread } from "../services/threads/threadService";
import { useToast } from "../composables/useToast";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
    thread: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['delete', 'edit']);

const router = useRouter();
const { showError, showSuccess } = useToast();
const authStore = useAuthStore();

const isFavorite = ref(props.thread.is_liked || false);
const likesCount = ref(props.thread.likes_count || 0);
const isLiking = ref(false);
const showMenu = ref(false);
const isDeleting = ref(false);

const isOwner = computed(() => {
    return authStore.currentUser?.id === props.thread.user_id;
});

const navigateToThread = () => {
    router.push(`/threads/${props.thread.id}`);
};

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
};

const handleEdit = () => {
    showMenu.value = false;
    emit('edit', props.thread);
};

const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus thread ini?")) return;

    showMenu.value = false;
    isDeleting.value = true;

    try {
        await deleteThread(props.thread.id);
        showSuccess("Thread berhasil dihapus");
        emit('delete', props.thread.id);
    } catch (err) {
        console.error("Failed to delete thread:", err);
        showError("Gagal menghapus thread");
    } finally {
        isDeleting.value = false;
    }
};

const toggleFavorite = async () => {
    if (isLiking.value) return;

    const previousLiked = isFavorite.value;
    const previousCount = likesCount.value;

    isFavorite.value = !isFavorite.value;
    likesCount.value += isFavorite.value ? 1 : -1;
    isLiking.value = true;

    try {
        const response = await toggleThreadLike(props.thread.id);

        if (response.data.data) {
            likesCount.value = response.data.data.likes_count;
        }
    } catch (err) {
        isFavorite.value = previousLiked;
        likesCount.value = previousCount;
        console.error("Failed to toggle like:", err);
        showError("Gagal menyukai thread");
    } finally {
        isLiking.value = false;
    }
};

const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/storage/${imagePath}`;
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } else if (days > 0) {
        return `${days} hari lalu`;
    } else if (hours > 0) {
        return `${hours} jam lalu`;
    } else if (minutes > 0) {
        return `${minutes} menit lalu`;
    } else {
        return 'Baru saja';
    }
};
</script>
