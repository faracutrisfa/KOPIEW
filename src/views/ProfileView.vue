<script setup>
import BaseButton from "../components/BaseButton.vue";
import CafeCard from "../components/CafeCard.vue";
import InputField from "../components/InputField.vue";
import { getProfile, updateProfile } from "../services/profile.js";
import { computed, reactive, ref, onMounted } from "vue";
import { useAuthStore } from '../stores/auth';
import { getWishlists } from "../services/wishlist.js";
import normalizeImageUrl from "../helper/Helper";

const wishlist = ref([]);
const editing = ref(false);
const authStore = useAuthStore();

const profilePicture = computed(() => {
  if (!authStore.user) return '/default-avatar.png';
  return normalizeImageUrl(authStore.user.profile_photo);
});

console.log("Profile photo path:", authStore.user.profile_photo); 
console.log("Normalized URL:", normalizeImageUrl(authStore.user.profile_photo));


const form = reactive({
  username: "",
  email: ""
});

async function loadProfile() {
  const user = await getProfile();
  authStore.user = user;
}

onMounted(async () => {
  if (!authStore.user) {
    await loadProfile(); 
  }
  form.username = authStore.user.name;
  form.email = authStore.user.email;

  try {
    const response = await getWishlists(); 
    wishlist.value = response.data.data.filter(
      w => w.user_id === authStore.user.id
    );
    console.log(wishlist.value);
  } catch (err) {
    console.error("Failed to fetch wishlist:", err);
  }

  
});


async function saveProfile() {
  try {
    const updatedUser = await updateProfile({
      name: form.username,
      email: form.email,
    });
    authStore.user = updatedUser;
    console.log(authStore.user);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    editing.value = false;
  } catch (error) {
    console.error("Failed to save profile:", error);
    alert(`Failed to save profile. ${error.message}`);
  }
}
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
            ></InputField>
          </div>
        </div>

        <div v-if="!editing" class="flex justify-end">
          <BaseButton
            :full="false"
            @click="editing = !editing"
            >Edit Profile</BaseButton
          >
        </div>
        <div v-else class="flex justify-end">
          <BaseButton
            :full="false"
            @click="saveProfile()"
            >Save Profile</BaseButton>
        </div>
      </div>

      <div class="shadow-lg min-h-64 rounded-lg p-8">
        <p class="text-3xl font-bold text-text-disabled mb-10">Eksplorasimu.</p>
        <div class="grid grid-cols-2 gap-16 p-8 overflow-y-auto max-h-112">
          <CafeCard v-for="wish in wishlist" :key="wish.id" :image="wish.image" :name="wish.name" :duration="wish.duration" :location="wish.location" :rating="wish.rating" :description="wish.description" :favorite="wish.favorite"> </CafeCard>
        </div>
      </div>
    </div>
    <aside
      class="bg-primary rounded-lg px-8 pt-12 pb-8 min-w-128 min-h-128 self-start"
    >
      <div class="w-96 bg-bg-main h-96 m-auto rounded-full mb-16"><img :src="profilePicture" class="w-full h-full rounded-full object-cover"></img></div>
      <p class="font-bold text-xl text-text-white">Gambar Profile</p>
      <p class="font-bold text-md text-text-grey">
        Membantu personalisasi akun anda
      </p>
    </aside>
  </div>
</template>
