<template>
  <div class="min-h-screen bg-bg-main py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-text-strong mb-2">
          Tambahkan<br />eksplorasi barumu.
        </h1>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-text-strong mb-6">Detail Tempat</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-semibold text-text-strong mb-2">
                  Nama Tempat
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  placeholder="nama tempat..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  minlength="5"
                  maxlength="100"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>

              <div>
                <label for="address" class="block text-sm font-semibold text-text-strong mb-2">
                  Lokasi
                </label>
                <input
                  id="address"
                  v-model="formData.address"
                  type="text"
                  placeholder="nama tempat..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  maxlength="255"
                />
                <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
              </div>

              <div>
                <label for="operating_hours" class="block text-sm font-semibold text-text-strong mb-2">
                  Jam Operasi
                </label>
                <input
                  id="operating_hours"
                  v-model="formData.operating_hours"
                  type="text"
                  placeholder="nama tempat..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p v-if="errors.operating_hours" class="text-red-500 text-xs mt-1">{{ errors.operating_hours }}</p>
              </div>

              <div>
                <label for="description" class="block text-sm font-semibold text-text-strong mb-2">
                  Deskripsi.
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  placeholder="masukkan deskripsi..."
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                  maxlength="255"
                ></textarea>
                <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-text-strong mb-2">
                Foto Tempat
              </label>
              <div
                class="relative aspect-4/3 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors"
                @click="triggerFileInput"
              >
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
                
                <div
                  v-else
                  class="absolute inset-0 flex flex-col items-center justify-center text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="text-sm font-medium">Tambah Foto</span>
                </div>

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileChange"
                />
              </div>
              <p class="text-xs text-gray-500 mt-2">
                Klik untuk upload foto (opsional)
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-4 pt-6">
            <BaseButton
              type="button"
              variant="outline"
              @click="handleCancel"
              :disabled="loading"
            >
              Batal
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :disabled="loading"
            >
              {{ loading ? 'Menyimpan...' : 'Tambah Tempat' }}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';
import { createPlace, uploadPlacePhoto } from '../services/place.js';

const router = useRouter();

const formData = ref({
  name: '',
  address: '',
  operating_hours: '',
  description: ''
});

const errors = ref({});
const loading = ref(false);
const imagePreview = ref(null);
const fileInput = ref(null);
const selectedFile = ref(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.name || formData.value.name.length < 5) {
    errors.value.name = 'Nama tempat minimal 5 karakter';
    isValid = false;
  }

  if (!formData.value.address) {
    errors.value.address = 'Lokasi harus diisi';
    isValid = false;
  }

  if (!formData.value.description) {
    errors.value.description = 'Deskripsi harus diisi';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  if (!localStorage.getItem('token')) {
    alert('Anda harus login untuk menambahkan tempat');
    router.push({ name: 'login' });
    return;
  }

  loading.value = true;

  try {
    const placeResponse = await createPlace(formData.value);
    const newPlaceId = placeResponse.data.data.id;
    
    console.log('Place created with ID:', newPlaceId);

    if (selectedFile.value) {
      try {
        const photoFormData = new FormData();
        photoFormData.append('url', selectedFile.value);
        photoFormData.append('caption', `Foto ${formData.value.name}`);

        await uploadPlacePhoto(newPlaceId, photoFormData);
        console.log('Photo uploaded successfully');
      } catch (photoError) {
        console.error('Failed to upload photo:', photoError);
      }
    }

    alert('Tempat berhasil ditambahkan!');
    
    router.push({ name: 'detail', params: { id: newPlaceId } });
  } catch (error) {
    console.error('Error creating place:', error);
    
    if (error.response?.status === 401) {
      alert('Sesi Anda telah berakhir. Silakan login kembali.');
      router.push({ name: 'login' });
    } else if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
    } else {
      alert('Gagal menambahkan tempat. Silakan coba lagi.');
    }
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  if (confirm('Batalkan penambahan tempat? Data yang diisi akan hilang.')) {
    router.push({ name: 'tempat' });
  }
};
</script>