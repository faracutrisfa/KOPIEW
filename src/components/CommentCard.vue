<template>
    <div class="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
        <!-- User Avatar -->
        <img :src="userAvatar" :alt="userName" class="h-10 w-10 rounded-full object-cover" />

        <!-- Comment Content -->
        <div class="flex-1">
            <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-text-strong">{{ userName }}</p>
                <span class="text-xs text-text-body">{{ timestamp }}</span>
            </div>
            <p class="mt-1 text-sm text-text-body">{{ text }}</p>
        </div>

        <!-- Delete Button (only for own comments) -->
        <button v-if="isOwnComment" @click="$emit('delete', commentId)"
            class="text-gray-400 transition-colors hover:text-red-500" aria-label="Delete comment">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                </path>
            </svg>
        </button>
    </div>
</template>

<script setup>
defineProps({
    commentId: {
        type: Number,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    isOwnComment: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['delete']);
</script>
