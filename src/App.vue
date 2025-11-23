<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";

const route = useRoute();

const AUTH_ROUTES = ["login", "register"];

const showNavbar = computed(() => !AUTH_ROUTES.includes(route.name));
</script>

<template>
  <div class="min-h-screen text-text-strong">
    <Navbar v-if="showNavbar" />

    <main>
      <RouterView />
    </main>
  </div>
</template>
