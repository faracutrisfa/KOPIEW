<script setup>
import { ref } from "vue";
import BaseButton from "../BaseButton.vue";

const emit = defineEmits(['uploaded','close']);

const props = defineProps({
  isProcessingImg: Boolean
});

const isDragging = ref(false);
const previewImage = ref(null);
const selectedFile = ref(null);

const fileInput = ref(null);

const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const closeModal = () => emit("close");

const handleFileInput = (e) => {
    const file = e.target.files[0];
    processFile(file);
};

const onDragOver = (e) => {
    e.preventDefault();
    isDragging.value = true;
};

const onDragLeave = () => {
    isDragging.value = false;
};

const onDrop = (e) => {
    e.preventDefault();
    isDragging.value = false;
    const file = e.dataTransfer.files[0];
    processFile(file);
};

const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Hanya file gambar yang diperbolehkan");
        return;
    }

    selectedFile.value = file;

    if (previewImage.value) URL.revokeObjectURL(previewImage.value);

    previewImage.value = URL.createObjectURL(file);
};

const submitUpload = () => {
    if (!selectedFile.value) return;

    const formData = new FormData();
    formData.append("caption", "Uploaded via GalleryUploader");
    formData.append("url", selectedFile.value);

    emit("uploaded", formData);
};

const clearInput = () => {
    selectedFile.value = null;
    previewImage.value = null;
    if (fileInput.value) fileInput.value.value = null;
};

defineExpose({
    clearInput
});
</script>


<template>
    <div class="mb-5 p-4 border rounded-lg shadow">
        <div class="flex justify-between items-center mb-3">
            <h4 class="font-bold">Upload Foto</h4>
            <button class="text-red-500 text-sm" @click="closeModal">
                Tutup ✖
            </button>
        </div>

        <div
            class="border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all"
            :class="{
                'border-primary-40 bg-primary-40/10': isDragging,
                'border-gray-300': !isDragging
            }"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            @drop="onDrop"
        >
            <p class="hidden lg:block text-sm mb-2">
                Seret & lepaskan gambar ke sini<br />
                atau klik untuk memilih file
            </p>

            <input
                type="file"
                accept="image/*"
                class="hidden"
                ref="fileInput"
                @change="handleFileInput"
            />

            <BaseButton variant="outline" size="sm" @click="triggerFileInput">
                Pilih File
            </BaseButton>
        </div>

        <div
            v-if="previewImage"
            class="w-32 h-32 rounded-lg overflow-hidden mt-4 border shadow"
        >
            <img :src="previewImage" class="w-full h-full object-cover" />
        </div>

        <BaseButton :disabled="props.isProcessingImg"  size="sm" class="mt-3" @click="submitUpload">
            Upload
        </BaseButton>
    </div>
</template>
