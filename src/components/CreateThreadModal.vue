<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                @click.self="closeModal">
                <div class="w-full max-w-2xl rounded-xl bg-white shadow-2xl" @click.stop>
                    <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2 class="text-2xl font-bold text-text-strong">{{ isEditing ? 'Edit Thread' : 'Buat Thread Baru' }}</h2>
                        <button @click="closeModal" class="text-gray-400 transition-colors hover:text-gray-600"
                            aria-label="Close">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="max-h-[70vh] overflow-y-auto p-6">
                        <div class="mb-4">
                            <label class="mb-2 block text-sm font-medium text-text-strong">
                                Deskripsi <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="description" placeholder="Ceritakan momen kalcer-mu..." rows="5"
                                maxlength="500"
                                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-text-body placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                :class="{ 'border-red-500': errors.description }"></textarea>
                            <div class="mt-1 flex items-center justify-between">
                                <p v-if="errors.description" class="text-xs text-red-500">{{ errors.description }}</p>
                                <p class="ml-auto text-xs text-gray-500">{{ description.length }}/500</p>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="mb-2 block text-sm font-medium text-text-strong">
                                Gambar (Opsional)
                            </label>
                            <div class="flex items-center gap-3">
                                <input ref="fileInput" type="file" accept="image/*" class="hidden"
                                    @change="handleImageUpload" />
                                <BaseButton @click="$refs.fileInput.click()" variant="outline" size="sm">
                                    <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                    Pilih Gambar
                                </BaseButton>
                                <span v-if="imagePreview" class="text-sm text-text-body">Gambar dipilih</span>
                            </div>
                            <div v-if="imagePreview" class="relative mt-3">
                                <img :src="imagePreview" alt="Preview" class="h-48 w-full rounded-lg object-cover" />
                                <button @click="removeImage"
                                    class="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition-all hover:bg-red-600"
                                    aria-label="Remove image">
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="mb-2 block text-sm font-medium text-text-strong">
                                Lokasi Cafe (Opsional)
                            </label>
                            <select v-model="selectedCafe"
                                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-text-body transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                                <option value="">Pilih cafe...</option>
                                <option v-for="cafe in cafes" :key="cafe.id" :value="cafe">
                                    {{ cafe.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                        <BaseButton @click="closeModal" variant="outline">
                            Batal
                        </BaseButton>
                        <BaseButton @click="handleSubmit" variant="primary" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Posting') }}
                        </BaseButton>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    initialData: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const description = ref("");
const imagePreview = ref(null);
const imageFile = ref(null);
const selectedCafe = ref("");
const isSubmitting = ref(false);
const errors = ref({});

const isEditing = computed(() => !!props.initialData);

const cafes = ref([
    { id: 1, name: "Kopi Kenangan" },
    { id: 2, name: "Cafe Aesthetic" },
    { id: 3, name: "Green Garden Cafe" },
    { id: 4, name: "Business Lounge Cafe" },
    { id: 5, name: "Digital Nomad Cafe" },
]);

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    imagePreview.value = null;
    imageFile.value = null;
};

const validateForm = () => {
    errors.value = {};

    if (!description.value.trim()) {
        errors.value.description = "Deskripsi wajib diisi";
        return false;
    }

    if (description.value.length > 500) {
        errors.value.description = "Deskripsi maksimal 500 karakter";
        return false;
    }

    return true;
};

const handleSubmit = () => {
    if (!validateForm()) return;

    isSubmitting.value = true;

    const threadData = {
        content: description.value,
        cafe_id: selectedCafe.value?.id || null,
    };

    if (imageFile.value) {
        threadData.image = imageFile.value;
    }

    emit('submit', threadData);
    isSubmitting.value = false;
};

const resetForm = () => {
    description.value = "";
    imagePreview.value = null;
    imageFile.value = null;
    selectedCafe.value = "";
    errors.value = {};
};

const closeModal = () => {
    emit('update:modelValue', false);
    resetForm();
};

const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/storage/${imagePath}`;
};

watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        if (props.initialData) {
            description.value = props.initialData.content || "";
            selectedCafe.value = props.initialData.cafe || "";
            if (props.initialData.cafe_id) {
                selectedCafe.value = cafes.value.find(c => c.id === props.initialData.cafe_id) || "";
            } else if (props.initialData.cafe) {
                selectedCafe.value = props.initialData.cafe;
            }

            if (props.initialData.image) {
                imagePreview.value = getImageUrl(props.initialData.image);
            }
        } else {
            resetForm();
        }
    } else {
        resetForm();
    }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .rounded-xl,
.modal-leave-active .rounded-xl {
    transition: transform 0.3s ease;
}

.modal-enter-from .rounded-xl,
.modal-leave-to .rounded-xl {
    transform: scale(0.9);
}
</style>
