<script setup>
import { ref } from "vue";
import { register } from "../services/auth";
import BaseButton from "../components/BaseButton.vue";
import InputField from "../components/InputField.vue";
import { useRouter } from "vue-router";
import { useToast } from "../composables/useToast";

const router = useRouter();
const { showSuccess, showError } = useToast();

const form = ref({
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;

  try {
    await register({
      name: form.value.username,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.passwordConfirmation,
    });

    showSuccess("Registrasi berhasil! Silakan login 🎉");

    setTimeout(() => {
      router.push({ name: "login" });
    }, 1500);
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Registrasi gagal. Silakan coba lagi";
    showError(errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="grid min-h-screen grid-cols-1 bg-bg-main lg:grid-cols-2">
    <div class="hidden items-center justify-center p-6 lg:flex">
      <div class="relative flex h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-primary text-white">
        <img src="/cup-bg.webp" alt="Kopiew illustration"
          class="pointer-events-none absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 object-cover" />
        <div class="relative flex h-full flex-col justify-between px-8 py-6">
          <div>
            <img src="/white-logo.webp" alt="Kopiew Logo" class="h-10 w-auto" />
          </div>
          <div class="mt-8">
            <p class="mb-2 text-[11px] font-medium tracking-wide">
              dibuat untuk kaum skena.
            </p>
            <h2 class="text-[26px] font-extrabold leading-tight tracking-[0.01em]">
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
          <h1 class="text-3xl font-bold text-text-strong">Buat akun</h1>
          <p class="text-sm leading-relaxed text-text-body">
            Eksplorasi kafemu, temukan pilihanmu, kapanpun, dimanapun - tetap
            jaga produktivitasmu.
          </p>
        </div>

        <form class="space-y-4 text-sm" @submit.prevent="handleRegister">
          <InputField label="Username." placeholder="masukkan nama.." v-model="form.username" />

          <InputField label="email." type="email" placeholder="masukkan email.." v-model="form.email" />

          <InputField label="password." type="password" placeholder="masukkan password.." v-model="form.password"
            icon="eye" />

          <InputField label="konfirmasi password." type="password" placeholder="masukkan konfirmasi password.."
            v-model="form.passwordConfirmation" icon="eye-off" />

          <BaseButton :disabled="loading" variant="primary" full>
            <span v-if="!loading">Daftar</span>
            <span v-else>Memproses...</span>
          </BaseButton>
        </form>

        <p class="mt-2 text-center text-xs text-text-disabled">
          Sudah punya akun?
          <RouterLink :to="{ name: 'login' }" class="font-semibold text-primary">
            Masuk
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
