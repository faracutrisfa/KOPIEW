<template>
    <section class="bg-bg-main py-8 md:py-12">
        <div class="container mx-auto px-6">

            <div ref="headerRef" :class="['mb-8 flex justify-start scroll-animate', { 'is-visible': isHeaderVisible }]">
                <div class="text-left">
                    <p class="mb-2 text-sm font-medium text-text-body">Threads</p>
                    <h2 class="mb-2 text-3xl font-bold text-text-strong md:text-4xl">
                        Perkumpulan orang Kalcer.
                    </h2>
                    <p class="text-sm text-text-body md:text-base">
                        Langkahkan kakimu kesana!
                    </p>
                </div>
            </div>

            <div ref="contentRef" :class="['scroll-animate-fade', { 'is-visible': isContentVisible }]">
                <div v-if="loading" class="flex justify-center py-8">
                    <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>

                <div v-else-if="!threads || threads.length === 0"
                    class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="mb-4 text-6xl opacity-30">📝</div>
                    <h3 class="mb-2 text-lg font-semibold text-text-strong">Belum ada threads</h3>
                    <p class="text-sm text-text-body">Jadilah yang pertama untuk berbagi cerita!</p>
                </div>

                <div v-else class="overflow-x-auto py-10">
                    <div class="flex gap-4" style="min-width: min-content">
                        <div v-for="thread in threads" :key="thread.id" class="w-[300px] shrink-0">
                            <ThreadCard :thread="thread" @delete="handleDeleteThread" @edit="handleEditThread" />
                        </div>
                    </div>
                </div>
            </div>

            <CreateThreadModal v-model="showEditModal" :initialData="threadToEdit" @submit="handleSubmitEdit" />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ThreadCard from "../../ThreadCard.vue";
import CreateThreadModal from "../../CreateThreadModal.vue";
import { useScrollAnimation } from "../../../composables/useScrollAnimation";
import { useThreads } from "../../../composables/useThreads";
import { useToast } from "../../../composables/useToast";

const { threads, loading, error, fetchThreads, editThread } = useThreads();
const { showSuccess, showError } = useToast();

const showEditModal = ref(false);
const threadToEdit = ref(null);

const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 });
const { elementRef: contentRef, isVisible: isContentVisible } = useScrollAnimation({ threshold: 0.1 });

onMounted(async () => {
    try {
        await fetchThreads({ limit: 5 });
    } catch (err) {
        console.error("Failed to load threads:", err);
    }
});

const handleEditThread = (thread) => {
    threadToEdit.value = thread;
    showEditModal.value = true;
};

const handleDeleteThread = (threadId) => {
    const index = threads.value.findIndex((t) => t.id === threadId);
    if (index !== -1) {
        threads.value.splice(index, 1);
    }
};

const handleSubmitEdit = async (threadData) => {
    try {
        if (threadToEdit.value) {
            await editThread(threadToEdit.value.id, threadData);
            showSuccess("Thread berhasil diperbarui! 🎉");
            showEditModal.value = false;
            threadToEdit.value = null;
        }
    } catch (err) {
        console.error("Failed to update thread:", err);
        showError("Gagal memperbarui thread");
    }
};
</script>
