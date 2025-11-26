<template>
    <div class="min-h-screen bg-bg-main py-8 md:py-12">
        <div class="container mx-auto px-6">
            <!-- Page Header -->
            <div ref="headerRef" :class="['mb-8 text-center scroll-animate', { 'is-visible': isHeaderVisible }]">
                <h1 class="mb-2 text-4xl font-bold text-text-strong md:text-5xl">
                    Threads
                </h1>
                <p class="text-sm text-text-body md:text-base">
                    Bagikan momen kalcer-mu!
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-center">
                <div class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent">
                </div>
                <p class="text-text-body">Memuat threads...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="flex flex-col items-center justify-center py-20 text-center">
                <div class="mb-6 text-8xl opacity-30">⚠️</div>
                <h2 class="mb-3 text-2xl font-bold text-text-strong">Gagal memuat threads</h2>
                <p class="mb-6 text-text-body">{{ error }}</p>
                <BaseButton @click="fetchThreads" variant="primary" size="lg">
                    Coba Lagi
                </BaseButton>
            </div>

            <!-- Empty State -->
            <div v-else-if="!hasThreads" class="flex flex-col items-center justify-center py-20 text-center">
                <div class="mb-6 text-8xl opacity-30">📝</div>
                <h2 class="mb-3 text-2xl font-bold text-text-strong">Belum ada threads</h2>
                <p class="mb-6 text-text-body">Jadilah yang pertama untuk berbagi momen kalcer!</p>
                <BaseButton @click="showCreateModal = true" variant="primary" size="lg">
                    Buat Thread Pertama
                </BaseButton>
            </div>

            <!-- Threads Grid -->
            <div v-else>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <ThreadCard v-for="thread in threads" :key="thread.id" :thread="thread" />
                </div>
            </div>
        </div>

        <!-- Floating Create Button -->
        <button v-if="hasThreads && !loading" @click="showCreateModal = true"
            class="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            aria-label="Create Thread">
            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </button>

        <!-- Create Thread Modal -->
        <CreateThreadModal v-model="showCreateModal" @submit="handleCreateThread" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ThreadCard from "../components/ThreadCard.vue";
import BaseButton from "../components/BaseButton.vue";
import CreateThreadModal from "../components/CreateThreadModal.vue";
import { useScrollAnimation } from "../composables/useScrollAnimation";
import { useThreads } from "../composables/useThreads";
import { useToast } from "../composables/useToast";

const showCreateModal = ref(false);

const { threads, loading, error, hasThreads, fetchThreads, addThread } = useThreads();
const { showSuccess, showError } = useToast();

const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 });
const { elementRef: gridRef, isVisible: isGridVisible } = useScrollAnimation({ threshold: 0.1 });

onMounted(async () => {
    try {
        await fetchThreads();
    } catch (err) {
        console.error("Failed to load threads:", err);
        showError("Gagal memuat threads");
    }
});

const handleCreateThread = async (threadData) => {
    try {
        await addThread(threadData);
        showCreateModal.value = false;
        showSuccess("Thread berhasil dibuat! 🎉");
    } catch (err) {
        console.error("Failed to create thread:", err);
        const errorMsg = err.response?.data?.message || "Gagal membuat thread";
        showError(errorMsg);
    }
};
</script>
