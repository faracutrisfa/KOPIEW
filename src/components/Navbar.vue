<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import BaseButton from "../components/BaseButton.vue";

const route = useRoute();
const isOpen = ref(false);

const NAV_LINKS = [
  { name: "home", label: "Home" },
  { name: "fitur", label: "Fitur" },
  { name: "tempat", label: "Tempat" },
  { name: "tentang", label: "Tentang" },
];

const isUserLoggedIn = computed(() => {
  return !!localStorage.getItem('token');
});

const LOGGED_IN_NAV_LINKS = computed(() => {
    return [
        { name: "home", label: "Beranda" },
        { name: "fitur", label: "Fitur" },
        { name: "tempat", label: "Tempat" },
        { name: "wishlist", label: "Wishlist" },
        { name: "tentang", label: "Tentang" },
    ];
});

const activeRouteName = computed(() => route.name);
const isActive = (name) => activeRouteName.value === name;
</script>

<template>
  <header class="sticky top-0 z-30 bg-bg-main">
    <div class="mx-auto flex items-center py-4 md:py-6">
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/logo.webp" alt="logo" class="w-32" />
      </RouterLink>

      <nav
        class="hidden flex-1 items-center justify-center gap-8 text-sm font-bold text-text-body md:flex lg:text-lg"
      >
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.name"
          :to="{ name: link.name }"
          class="transition"
          :class="
            isActive(link.name)
              ? 'text-text-strong underline'
              : 'text-text-body hover:text-text-strong'
          "
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <template v-if="!isUserLoggedIn">
            <RouterLink :to="{ name: 'login' }">
              <BaseButton full="false">Masuk</BaseButton>
            </RouterLink>
            <RouterLink :to="{ name: 'register' }">
              <BaseButton full="false" variant="outline">Daftar</BaseButton>
            </RouterLink>
        </template>
        
        <template v-else>
            <div class="flex items-center gap-4 text-text-body">
                <div class="relative flex items-center border border-border rounded-full pr-2">
                    <input type="text" placeholder="Cari Sesuatu" class="w-28 text-sm p-1 rounded-full border-none focus:outline-none focus:ring-0">
                    <button aria-label="Search" class="ml-1">🔍</button>
                </div>
                <RouterLink :to="{ name: 'wishlist' }" aria-label="Wishlist">❤️</RouterLink>
                </div>
        </template>
      </div>

      <button
        type="button"
        class="ml-auto inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-text-body md:hidden"
        @click="isOpen = !isOpen"
        aria-label="Toggle navigation"
        :aria-expanded="isOpen"
      >
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="border-t border-gray-100 bg-bg-main md:hidden">
      <nav
        class="mx-auto flex flex-col gap-1 px-6 py-3 text-sm font-semibold text-text-body"
      >
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.name"
          :to="{ name: link.name }"
          class="rounded-lg px-3 py-2 transition"
          :class="
            isActive(link.name)
              ? 'bg-primary-40 text-cream'
              : 'hover:bg-bg-soft'
          "
          @click="isOpen = false"
        >
          {{ link.label }}
        </RouterLink>

        <div class="mt-3 flex flex-col gap-2">
          <RouterLink :to="{ name: 'login' }" @click="isOpen = false">
            <BaseButton size="sm">Masuk</BaseButton>
          </RouterLink>

          <RouterLink :to="{ name: 'register' }" @click="isOpen = false">
            <BaseButton size="sm" variant="outline">Daftar</BaseButton>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>
