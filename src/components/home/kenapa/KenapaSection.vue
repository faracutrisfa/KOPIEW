<template>
    <section class="bg-bg-main py-16 md:py-20 lg:py-24">
        <div class="container mx-auto px-6">
            <div class="mb-12 border-t border-border-subtle"></div>

            <div ref="elementRef" :class="['scroll-animate', { 'is-visible': isVisible }]">
                <div class="mb-6 text-center">
                    <p class="text-xs font-medium uppercase tracking-wider text-text-body">
                        Jelajahi
                    </p>
                </div>

                <div class="mb-8 text-center">
                    <h2 class="text-4xl font-bold text-text-strong md:text-5xl lg:text-6xl">
                        Kenapa Kami ?
                    </h2>
                </div>

                <div class="mb-10 text-center">
                    <p class="mx-auto max-w-3xl text-sm leading-relaxed text-text-body md:text-base">
                        Kami bisa tau dan explore semua kebahagiaan, Ambil kuncina, dan buka petualanganmu
                        <span class="font-semibold text-text-strong">Sekarang!</span>
                        <br />
                        Sampai jumpa di platform kami!
                    </p>
                </div>

                <div class="flex justify-center">
                    <BaseButton :full="false" variant="primary" size="lg">
                        Jelajahi
                    </BaseButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import BaseButton from "../../BaseButton.vue";
import { useScrollAnimation } from "../../../composables/useScrollAnimation";

const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
</script>
