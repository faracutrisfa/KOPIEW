<template>
  <div class="min-h-screen">
    <HeroSection />
    <PreviewSection />
    <ThreadsSection />
    <RekomendasiSection />
    <TrendingSection />
    <TentangSection />
    <KenapaSection />
  </div>
</template>

<script setup>
import HeroSection from "../components/home/hero/HeroSection.vue";
import PreviewSection from "../components/home/hero/PreviewSection.vue";
import RekomendasiSection from "../components/home/rekomendasi/RekomendasiSection.vue";
import TrendingSection from "../components/home/trending/TrendingSection.vue";
import ThreadsSection from "../components/home/threads/ThreadsSection.vue";
import TentangSection from "../components/home/tentang/TentangSection.vue";
import KenapaSection from "../components/home/kenapa/KenapaSection.vue";
</script>
