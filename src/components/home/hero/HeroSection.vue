<template>
    <section class="container mx-auto px-6 py-1 md:py-2">
        <div ref="elementRef"
            :class="['flex flex-col items-center text-center scroll-animate', { 'is-visible': isVisible }]">
            <div class="mb-6 border rounded-md flex items-center text-xs md:text-sm">
                <span class="pl-4 pr-1 py-1.5 font-medium text-text-strong">
                    Halo
                </span>
                <span class="py-1 px-1 rounded-xs bg-primary text-white font-medium">
                    {{ userName }}
                </span>
                <span class="pr-4 pl-1 py-1.5 font-medium text-text-body">
                    Selamat datang
                </span>
            </div>

            <div class="mb-8">
                <img src="/minilogo.webp" alt="KOPIEW Logo - Platform pencarian cafe untuk kalcer"
                    class="h-20 w-auto md:h-24" />
            </div>
            <h1 class="mb-4 max-w-5xl text-xl font-bold leading-tight text-text-strong md:text-5xl lg:text-6xl">
                Platform lu buat nyari tempat
                <span class="inline-block rounded-lg bg-primary px-3 py-1 text-cream">
                    kalcer
                </span>
                lu sendiri.
            </h1>

            <p class="mb-8 max-w-2xl text-sm text-text-body md:text-base lg:text-lg">
                Sebuah tempat untuk sementara dan popularitas, desainnya untuk dikecokin
            </p>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useScrollAnimation } from '../../../composables/useScrollAnimation';
import { useAuthStore } from '../../../stores/auth';

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
const authStore = useAuthStore();

const userName = computed(() => {
    return authStore.currentUser?.name || 'Sobat Kalcer';
});
</script>