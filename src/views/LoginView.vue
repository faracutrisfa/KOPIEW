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
  <section class="grid min-h-screen grid-cols-1 bg-bg-main lg:grid-cols-2">
    <div class="hidden items-center justify-center p-6 lg:flex">
      <div
        class="relative flex h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-primary text-white"
      >
        <img
          src="/cup-bg.webp"
          alt="Kopiew illustration"
          class="pointer-events-none absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 object-cover"
        />

        <div class="relative flex h-full flex-col justify-between px-8 py-6">
          <div>
            <img src="/white-logo.webp" alt="Kopiew Logo" class="h-10 w-auto" />
          </div>

          <div class="mt-8">
            <p class="mb-2 text-[11px] font-medium tracking-wide">
              dibuat untuk kaum skena.
            </p>
            <h2
              class="text-[26px] font-extrabold leading-tight tracking-[0.01em]"
            >
              Temukan tempat kopi<br />
              ternyamanmu sekarang
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center px-6 py-10 lg:px-16">
      <div class="w-full max-w-sm space-y-6">
        <img src="/minilogo.webp" alt="Kopiew mini" class="mb-2 h-16" />

        <div class="space-y-2">
          <h1 class="text-3xl font-bold text-text-strong">Masuk</h1>
          <p class="text-sm leading-relaxed text-text-body">
            Eksplorasi kafemu, temukan pilihanmu, kapanpun, dimanapun - tetap
            jaga produktivitasmu.
          </p>
        </div>

        <form class="space-y-4 text-sm">
          <InputField
            label="username."
            type="username"
            placeholder="masukkan username.."
            v-model="form.username"
          />

          <InputField
            label="password."
            type="password"
            placeholder="masukkan password.."
            v-model="form.password"
            icon="eye"
          />

          <BaseButton variant="primary" full>Masuk</BaseButton>
        </form>

        <p class="mt-2 text-center text-xs text-text-disabled">
          Belum punya akun?
          <RouterLink
            :to="{ name: 'register' }"
            class="font-semibold text-primary"
          >
            Daftar
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
