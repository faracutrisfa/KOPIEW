<script setup>
import { ref } from "vue";
import BaseButton from "../components/BaseButton.vue";
import InputField from "../components/InputField.vue";


const form = ref({
  username: "",
  password: "",
});
</script>

<template>
  <section class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <div class="hidden lg:flex items-center justify-center bg-primary">
      <div class="w-[80%] rounded-3xl overflow-hidden shadow-xl">
        <img :src="Poster" alt="poster" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="flex items-center justify-center px-6 lg:px-16">
      <div class="w-full max-w-sm">

        <h1 class="text-2xl font-bold text-text-strong">Masuk</h1>

        <form class="space-y-4">
          <InputField
            label="Username"
            placeholder="masukkan nama.."
            v-model="form.username"
          />

          <InputField
            label="Password"
            type="password"
            placeholder="masukkan password.."
            v-model="form.password"
          />

          <BaseButton class="mt-2" full variant="primary"> Daftar </BaseButton>
        </form>

        <p class="mt-4 text-center text-xs text-neutral-600">
          Belum punya akun?
          <RouterLink
            to="{ name: 'register' }"
            class="font-semibold text-primary"
          >
            Daftar dulu
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
