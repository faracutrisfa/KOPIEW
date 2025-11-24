<template>
    <section class="bg-bg-main py-12 md:py-16">
        <div class="container mx-auto px-6">

            <div class="mb-8 text-center">
                <p class="mb-2 text-sm font-medium text-text-body">Rekomendasi</p>
                <h2 class="mb-2 text-3xl font-bold text-text-strong md:text-4xl">
                    Explorasi Cafemu.
                </h2>
                <p class="text-sm text-text-body md:text-base">
                    Langkahkan kakimu kesana!
                </p>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CafeCard v-for="cafe in cafes" :key="cafe.id" :image="cafe.image" :name="cafe.name"
                    :duration="cafe.duration" :location="cafe.location" :rating="cafe.rating"
                    :description="cafe.description" :favorite="cafe.favorite" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import CafeCard from "../../CafeCard.vue";
import { rekomendasiCafes } from "../../../data/rekomendasi/dataRekomendasi.js";

const cafes = ref(rekomendasiCafes);
</script>
