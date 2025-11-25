<template>
  <div class="min-h-screen">
    <HeroSection />
    <PreviewSection />
    <TrendingSection />
    <RekomendasiSection />
  </div>
</template>

<script setup>
import HeroSection from "../components/home/hero/HeroSection.vue";
import PreviewSection from "../components/home/hero/PreviewSection.vue";
import RekomendasiSection from "../components/home/rekomendasi/RekomendasiSection.vue";
import TrendingSection from "../components/home/trending/TrendingSection.vue";
</script>
