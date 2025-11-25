<template>
    <div class="min-h-screen bg-bg-main py-8 md:py-12">
        <div class="container mx-auto px-6">
            <!-- Back Button -->
            <button @click="$router.back()"
                class="mb-6 flex items-center gap-2 text-text-body transition-colors hover:text-primary">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span class="text-sm font-medium">Kembali</span>
            </button>

            <!-- Thread Detail Card -->
            <div v-if="thread" class="mb-8 overflow-hidden rounded-xl bg-white shadow-lg">
                <!-- Header: Profile Info -->
                <div class="flex items-center justify-between gap-2 border-b border-gray-100 px-6 py-4">
                    <div class="flex items-center gap-3">
                        <img :src="thread.user?.avatar || thread.userAvatar || '/logo.webp'"
                            :alt="thread.user?.name || thread.userName || 'User'"
                            class="h-12 w-12 rounded-full object-cover" />
                        <div>
                            <p class="font-semibold text-text-strong">{{ thread.user?.name || thread.userName || 'User'
                                }}</p>
                            <p class="text-xs text-text-body">{{ thread.created_at || thread.timestamp }}</p>
                        </div>
                    </div>
                </div>

                <!-- Image (if exists) -->
                <div v-if="thread.image" class="relative">
                    <img :src="thread.image" :alt="thread.cafeName || thread.cafe?.name || 'Thread'"
                        class="w-full object-cover" style="max-height: 600px;" />
                </div>

                <!-- Content -->
                <div class="px-6 py-4">
                    <!-- Description -->
                    <p class="mb-4 text-base text-text-body">{{ thread.content || thread.description }}</p>

                    <!-- Cafe Info -->
                    <div v-if="thread.cafeName || thread.cafe?.name" class="mb-4 rounded-lg bg-gray-50 p-3">
                        <p class="text-sm text-text-body">
                            📍 <span class="font-medium text-text-strong">{{ thread.cafeName || thread.cafe?.name
                                }}</span>
                        </p>
                    </div>

                    <!-- Actions: Like and Comment -->
                    <div class="flex items-center gap-6 border-t border-gray-100 pt-4">
                        <button @click="toggleLike" class="flex items-center gap-2 transition-colors"
                            :class="isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'">
                            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span class="text-sm font-medium">{{ likesCount }} Likes</span>
                        </button>

                        <div class="flex items-center gap-2 text-gray-400">
                            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                            </svg>
                            <span class="text-sm font-medium">{{ commentsCount }} Comments</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comments Section -->
            <div class="rounded-xl bg-white p-6 shadow-lg">
                <h2 class="mb-6 text-2xl font-bold text-text-strong">Comments</h2>

                <!-- Comment Input Form -->
                <div class="mb-6">
                    <div class="flex gap-3">
                        <img src="/logo.webp" alt="Current User" class="h-10 w-10 rounded-full object-cover" />
                        <div class="flex-1">
                            <textarea v-model="newComment" placeholder="Tulis komentar..." rows="3"
                                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-text-body placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea>
                            <div class="mt-2 flex justify-end">
                                <BaseButton @click="handleAddComment" variant="primary" size="sm"
                                    :disabled="!newComment.trim()">
                                    Post Comment
                                </BaseButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comments List -->
                <div v-if="comments.length > 0" class="space-y-3">
                    <CommentCard v-for="comment in comments" :key="comment.id" :commentId="comment.id"
                        :userName="comment.userName" :userAvatar="comment.userAvatar" :text="comment.text"
                        :timestamp="comment.timestamp" :isOwnComment="comment.userId === currentUserId"
                        @delete="handleDeleteComment" />
                </div>

                <!-- Empty State -->
                <div v-else class="py-12 text-center">
                    <div class="mb-4 text-6xl opacity-20">💬</div>
                    <p class="text-text-body">Belum ada komentar. Jadilah yang pertama!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import CommentCard from "../components/CommentCard.vue";
import BaseButton from "../components/BaseButton.vue";
import { useThreadDetail } from "../composables/useThreadDetail";
import { useThreadLike } from "../composables/useThreadLike";
import { useThreadComments } from "../composables/useThreadComments";

const route = useRoute();
const threadId = parseInt(route.params.id);
const currentUserId = ref(1);

const { thread, loading: threadLoading, error: threadError, fetchThread } = useThreadDetail(threadId);

const { isLiked, likesCount, toggleLike } = useThreadLike(threadId);

const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    commentsCount,
    fetchComments,
    addComment,
    removeComment,
} = useThreadComments(threadId);

const newComment = ref("");

onMounted(async () => {
    try {
        await fetchThread();

        if (thread.value) {
            isLiked.value = thread.value.is_liked || false;
            likesCount.value = thread.value.likes_count || 0;
        }

        await fetchComments();
    } catch (err) {
        console.error("Failed to load thread:", err);
    }
});

watch(thread, (newThread) => {
    if (newThread) {
        isLiked.value = newThread.is_liked || false;
        likesCount.value = newThread.likes_count || 0;
    }
});

const handleAddComment = async () => {
    if (!newComment.value.trim()) return;

    try {
        await addComment({ content: newComment.value });
        newComment.value = "";

        if (thread.value) {
            thread.value.comments_count = (thread.value.comments_count || thread.value.commentCount || 0) + 1;
        }
    } catch (err) {
        console.error("Failed to add comment:", err);
        alert(commentsError.value || "Gagal menambahkan komentar");
    }
};

const handleDeleteComment = async (commentId) => {
    try {
        await removeComment(commentId);

        if (thread.value) {
            thread.value.comments_count = Math.max(0, (thread.value.comments_count || thread.value.commentCount || 0) - 1);
        }
    } catch (err) {
        console.error("Failed to delete comment:", err);
        alert(commentsError.value || "Gagal menghapus komentar");
    }
};
</script>
