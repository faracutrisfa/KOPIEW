<template>
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        <TransitionGroup name="toast">
            <div v-for="toast in toasts" :key="toast.id" @click="removeToast(toast.id)"
                class="pointer-events-auto min-w-[320px] max-w-md rounded-lg shadow-lg backdrop-blur-sm cursor-pointer transform transition-all duration-300 hover:scale-105"
                :class="toastClasses(toast.type)">
                <div class="flex items-start gap-3 p-4">
                    <!-- Icon -->
                    <div class="flex-shrink-0">
                        <svg v-if="toast.type === 'success'" class="h-6 w-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else-if="toast.type === 'error'" class="h-6 w-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <!-- Message -->
                    <div class="flex-1 pt-0.5">
                        <p class="text-sm font-medium leading-relaxed">{{ toast.message }}</p>
                    </div>

                    <!-- Close button -->
                    <button @click.stop="removeToast(toast.id)"
                        class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Progress bar -->
                <div class="h-1 bg-black bg-opacity-10 overflow-hidden">
                    <div class="h-full bg-white bg-opacity-30 animate-progress"
                        :style="{ animationDuration: `${toast.duration}ms` }"></div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>
import { useToast } from "../composables/useToast";

const { toasts, removeToast } = useToast();

const toastClasses = (type) => {
    const baseClasses = "text-white";

    switch (type) {
        case "success":
            return `${baseClasses} bg-primary`;
        case "error":
            return `${baseClasses} bg-red-500`;
        case "info":
            return `${baseClasses} bg-blue-500`;
        default:
            return `${baseClasses} bg-gray-700`;
    }
};
</script>

<style scoped>
/* Toast animations */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
}

.toast-move {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Progress bar animation */
@keyframes progress {
    from {
        width: 100%;
    }

    to {
        width: 0%;
    }
}

.animate-progress {
    animation: progress linear forwards;
}
</style>
