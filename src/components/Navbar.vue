<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseButton from "../components/BaseButton.vue";
import { useAuthStore } from "../stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isOpen = ref(false);
const showProfileDropdown = ref(false);

const NAV_LINKS = [
  { name: "home", label: "Home" },
  { name: "fitur", label: "Fitur" },
  { name: "rekomendasi", label: "Rekomendasi" },
  { name: "tentang", label: "Tentang" },
];

const activeRouteName = computed(() => route.name);
const isActive = (name) => activeRouteName.value === name;

onMounted(() => {
  authStore.checkAuth();
});

const handleLogout = () => {
  authStore.logout();
  showProfileDropdown.value = false;
  router.push({ name: "home" });
};
</script>

<template>
  <header class="sticky top-0 z-30 bg-bg-main relative">
    <div class="mx-auto flex items-center py-4 md:py-6">
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/logo.webp" alt="logo" class="w-32" />
      </RouterLink>

      <nav class="hidden flex-1 items-center justify-center gap-8 text-sm font-bold text-text-body md:flex lg:text-lg">
        <RouterLink v-for="link in NAV_LINKS" :key="link.name" :to="{ name: link.name }" class="transition" :class="isActive(link.name)
          ? 'text-text-strong underline'
          : 'text-text-body hover:text-text-strong'
          ">
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Right Side: Guest vs Authenticated -->
      <div class="hidden items-center gap-3 md:flex">
        <!-- Guest State -->
        <template v-if="!authStore.isAuthenticated">
          <RouterLink :to="{ name: 'login' }">
            <BaseButton full="false">Masuk</BaseButton>
          </RouterLink>

          <RouterLink :to="{ name: 'register' }">
            <BaseButton full="false" variant="outline">Daftar</BaseButton>
          </RouterLink>
        </template>

        <!-- Authenticated State -->
        <template v-else>
          <!-- Search Input -->
          <div class="relative">
            <input type="text" placeholder="cari sesuatu"
              class="w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm text-text-body placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <svg class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Like/Wishlist Icon -->
          <button class="text-text-body hover:text-primary transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button @click="showProfileDropdown = !showProfileDropdown"
              class="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20">
              <img :src="authStore.currentUser?.avatar || '/logo.webp'" :alt="authStore.currentUser?.name || 'User'"
                class="h-10 w-10 rounded-full object-cover border-2 border-gray-200" />
            </button>

            <!-- Dropdown Menu -->
            <div v-if="showProfileDropdown" @click.stop
              class="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="py-1">
                <button @click="showProfileDropdown = false"
                  class="block w-full px-4 py-2 text-left text-sm text-text-body hover:bg-gray-100">
                  Profile
                </button>
                <button @click="handleLogout"
                  class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>

      <button type="button"
        class="ml-auto inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-text-body md:hidden"
        @click="isOpen = !isOpen" aria-label="Toggle navigation" :aria-expanded="isOpen">
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen"
      class="absolute top-full left-0 right-0 border-t border-gray-100 bg-bg-main shadow-lg md:hidden z-40">
      <nav class="mx-auto flex flex-col gap-1 px-6 py-3 text-sm font-semibold text-text-body">
        <RouterLink v-for="link in NAV_LINKS" :key="link.name" :to="{ name: link.name }"
          class="rounded-lg px-3 py-2 transition" :class="isActive(link.name)
            ? 'bg-primary-40 text-cream'
            : 'hover:bg-bg-soft'
            " @click="isOpen = false">
          {{ link.label }}
        </RouterLink>

        <div class="mt-3 flex flex-col gap-2">
          <!-- Guest State -->
          <template v-if="!authStore.isAuthenticated">
            <RouterLink :to="{ name: 'login' }" @click="isOpen = false">
              <BaseButton size="sm">Masuk</BaseButton>
            </RouterLink>

            <RouterLink :to="{ name: 'register' }" @click="isOpen = false">
              <BaseButton size="sm" variant="outline">Daftar</BaseButton>
            </RouterLink>
          </template>

          <!-- Authenticated State -->
          <template v-else>
            <button @click="isOpen = false">
              <BaseButton size="sm" variant="outline">Profile</BaseButton>
            </button>

            <button @click="handleLogout">
              <BaseButton size="sm" variant="outline" class="w-full text-red-600">
                Logout
              </BaseButton>
            </button>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>
