<script setup>
import { ref } from "vue";
import BaseButton from "../components/BaseButton.vue";
import CafeCard from "../components/CafeCard.vue";
import InputField from "../components/InputField.vue";
import Footer from "../components/Footer.vue";

const editing = ref(false);

const form = ref({
  username: "test",
  email: "test@gmail.com",
  password: "123",
});
</script>

<template>
  <div class="flex justify-between gap-8 mb-48 mt-12">
    <div class="flex-1">
      <div class="shadow-lg min-h-64 rounded-lg p-8 mb-8">
        <h3 class="text-3xl font-bold text-text-disabled mb-10">Info Dasar</h3>
        <div class="mb-6">
          <p class="text-xl font-bold text-text-disabled mb-1">username</p>
          <p v-if="!editing" class="text-xl">{{ form.username }}</p>
          <div v-else>
            <InputField
              placeholder="Masukkan username..."
              v-model="form.username"
            ></InputField>
          </div>
        </div>
        <div class="mb-6">
          <p class="text-xl font-bold text-text-disabled mb-1">email</p>
          <p v-if="!editing" class="text-xl">{{ form.email }}</p>
          <div v-else>
            <InputField
              placeholder="Masukkan email..."
              v-model="form.email"
            ></InputField>
          </div>
        </div>
        <div class="mb-24">
          <p class="text-xl font-bold text-text-disabled mb-1">password</p>
          <p v-if="!editing" class="text-xl">******</p>
          <div v-else>
            <InputField
              type="password"
              placeholder="Masukkan password..."
              v-model="form.password"
            ></InputField>
          </div>
        </div>

        <div class="flex justify-end">
          <BaseButton
            class="flex justify-end"
            :full="false"
            @click="editing = !editing"
            >Edit Profile</BaseButton
          >
        </div>
      </div>

      <div class="shadow-lg min-h-64 rounded-lg p-8">
        <p class="text-3xl font-bold text-text-disabled mb-10">Eksplorasimu.</p>
        <div class="grid grid-cols-2 gap-16 p-8 overflow-y-auto max-h-112">
          <CafeCard> </CafeCard>
          <CafeCard v-for="cafe in cafes" :key="cafe.id" :image="cafe.image" :name="cafe.name" :duration="cafe.duration" :location="cafe.location" :rating="cafe.rating" :description="cafe.description" :favorite="cafe.favorite"> </CafeCard>
        </div>
      </div>
    </div>
    <aside
      class="bg-primary rounded-lg px-8 pt-12 pb-8 min-w-128 min-h-128 self-start"
    >
      <div class="w-96 bg-bg-main h-96 m-auto rounded-full mb-16"><img></img></div>
      <p class="font-bold text-xl text-text-white">Gambar Profile</p>
      <p class="font-bold text-md text-text-grey">
        Membantu personalisasi akun anda
      </p>
    </aside>
  </div>
  <Footer></Footer>
</template>
