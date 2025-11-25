<template>
    <section class="bg-bg-main py-12 md:py-16">
        <div class="container mx-auto px-6">

            <div ref="headerRef" :class="['mb-8 text-center scroll-animate', { 'is-visible': isHeaderVisible }]">
                <h1 class="text-4xl font-bold text-text-strong md:text-5xl lg:text-6xl">
                    Apapun kami.
                </h1>
            </div>

            <div class="mb-8 flex items-center justify-between">
                <p class="text-sm font-medium text-text-body">Tentang Kami</p>
                <p class="text-sm font-medium text-text-body">Bacakan cerita kami</p>
            </div>

            <div ref="contentRef"
                :class="['relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 scroll-animate', { 'is-visible': isContentVisible }]">
                <div class="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    <div class="flex flex-col justify-center">
                        <h2 class="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                            Kami upayakan yang terbaik.
                        </h2>

                        <div class="mb-6 space-y-4 text-sm leading-relaxed text-white/90 md:text-base">
                            <p>
                                Masing-masing kafe punya pengalaman—dari kita bisa tumbuh, mencari kenyamanan baru, dan
                                sekalian jadi dari pemikirna tujuan yang rajuak atau langsung banyak cerita bersama dari
                                mana kita di sebuah cafe. Semuanya bisa bingung, sunsetna perkara, dan sekalian bisa
                                buat kita jadi lebih bersama.
                            </p>
                            <p>
                                Setiap kafe punya cerita, dan kami tau bahwa kafe itu lebih dari rumah sekarang
                                mahasiswa—tujuak setiap mudah. Karena itu kami hadir, mengajak tempat, tempat terbaik,
                                review jujur dan rekomendasi yang relevan supaya kamu bisa langsung menemukan spot yang
                                cocok buat kamu tanpa ribet.
                            </p>
                        </div>

                        <div>
                            <BaseButton :full="true" variant="soft" size="md">
                                hubungi kami
                            </BaseButton>
                        </div>
                    </div>

                    <div class="flex items-center justify-center lg:justify-end">
                        <div class="relative">
                            <img src="/white-minilogo.webp" alt="Kopiew Logo Putih - Tentang Kami"
                                class="h-64 w-64 object-contain opacity-90 md:h-80 md:w-80 lg:h-96 lg:w-96"
                                loading="lazy" />
                        </div>
                    </div>
                </div>

                <div class="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
                <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import BaseButton from "../../BaseButton.vue";
import { useScrollAnimation } from "../../../composables/useScrollAnimation";

const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 });
const { elementRef: contentRef, isVisible: isContentVisible } = useScrollAnimation({ threshold: 0.1 });
</script>
