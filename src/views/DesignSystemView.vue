<script setup>
import BaseButton from "../components/BaseButton.vue";
import InputField from "../components/InputField.vue";

const colors = [
  {
    group: "primary",
    name: "primary",
    class: "bg-primary",
    token: "--color-primary",
  },
  {
    group: "primary",
    name: "primary-40",
    class: "bg-primary-40",
    token: "--color-primary-40",
  },
  {
    group: "primary",
    name: "primary-20",
    class: "bg-primary-20",
    token: "--color-primary-20",
  },

  {
    group: "neutral",
    name: "bg-main",
    class: "bg-bg-main",
    token: "--color-bg-main",
  },
  {
    group: "neutral",
    name: "bg-soft",
    class: "bg-bg-soft",
    token: "--color-bg-soft",
  },
  {
    group: "neutral",
    name: "bg-card",
    class: "bg-bg-card",
    token: "--color-bg-card",
  },
  {
    group: "neutral",
    name: "border",
    class: "bg-border",
    token: "--color-border",
  },
  {
    group: "neutral",
    name: "gray-200",
    class: "bg-gray-200",
    token: "--color-gray-200",
  },
  {
    group: "neutral",
    name: "gray-100",
    class: "bg-gray-100",
    token: "--color-gray-100",
  },

  {
    group: "text",
    name: "text-strong",
    class: "bg-text-strong",
    token: "--color-text-strong",
  },
  {
    group: "text",
    name: "text-body",
    class: "bg-text-body",
    token: "--color-text-body",
  },
  {
    group: "text",
    name: "text-disabled",
    class: "bg-text-disabled",
    token: "--color-text-disabled",
  },
  {
    group: "text",
    name: "text-white",
    class: "bg-text-white border border-gray-200",
    token: "--color-text-white",
  },
];
</script>

<template>
  <div class="min-h-screen bg-bg-main px-6 py-10 text-text-body">
    <div class="mx-auto space-y-10">
      <!-- Header -->
      <header class="space-y-1">
        <h1 class="text-2xl font-bold text-text-strong">
          Design System – Kopiew
        </h1>
        <p class="text-sm text-text-disabled">
          Preview warna, dan komponen button yang digunakan
        </p>
      </header>

      <!-- Colors -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-text-strong">🎨 Colors</h2>

        <div class="grid gap-4 md:grid-cols-3">
          <div
            v-for="group in ['primary', 'neutral', 'text']"
            :key="group"
            class="rounded-2xl bg-bg-soft p-4"
          >
            <h3
              class="mb-3 text-xs font-semibold uppercase tracking-wide text-text-disabled"
            >
              {{ group }}
            </h3>
            <div class="space-y-2">
              <div
                v-for="color in colors.filter((c) => c.group === group)"
                :key="color.name"
                class="flex items-center gap-3 rounded-xl bg-bg-main p-2 text-xs"
              >
                <div
                  class="h-8 w-8 rounded-xl border border-gray-100"
                  :class="color.class"
                />
                <div class="flex flex-col">
                  <span class="font-medium text-text-strong">{{
                    color.name
                  }}</span>
                  <span class="text-[11px] text-text-disabled">{{
                    color.token
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-text-strong">🔘 Buttons</h2>

        <div class="grid gap-8 md:grid-cols-2">
          <div class="rounded-2xl bg-bg-soft p-4">
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-wide text-text-disabled"
            >
              Button (full width)
            </p>
            <div class="space-y-3">
              <BaseButton variant="primary"> Text </BaseButton>
              <BaseButton variant="outline"> Text </BaseButton>
              <BaseButton variant="soft"> Text </BaseButton>
            </div>
          </div>

          <div class="rounded-2xl bg-bg-soft p-4">
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-wide text-text-disabled"
            >
              Button (content width)
            </p>
            <div class="space-y-3">
              <div class="flex justify-end">
                <BaseButton :full="false"> Teks </BaseButton>
              </div>
              <div class="flex justify-end">
                <BaseButton variant="outline" :full="false"> Teks </BaseButton>
              </div>
              <div class="flex justify-end">
                <BaseButton variant="soft" :full="false"> Teks </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Inputs -->
      <!-- Inputs -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-text-strong">📝 Inputs</h2>

        <div class="grid gap-8 md:grid-cols-2">
          <!-- Basic Inputs -->
          <div class="rounded-2xl bg-bg-soft p-4">
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-wide text-text-disabled"
            >
              Input States
            </p>

            <div class="space-y-4">
              <!-- Normal -->
              <InputField placeholder="masukkan teks..." />

              <!-- With label -->
              <InputField label="Username" placeholder="masukkan username..." />

              <!-- Password -->
              <InputField
                label="Password"
                type="password"
                placeholder="masukkan password..."
              />

              <!-- Disabled -->
              <div class="opacity-50 pointer-events-none">
                <InputField label="Disabled" placeholder="input tidak aktif" />
              </div>
            </div>
          </div>

          <!-- Focus simulation -->
          <div class="rounded-2xl bg-bg-soft p-4">
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-wide text-text-disabled"
            >
              Dummy Focus State (Simulated)
            </p>

            <div class="space-y-4">
              <div>
                <label class="text-[11px] font-medium text-text-body">
                  Focus (simulasi)
                </label>
                <input
                  class="w-full rounded-lg border-2 border-primary px-3 py-3 text-xs text-text-body focus:outline-none"
                  value="typing..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
