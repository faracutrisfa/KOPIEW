<script setup>
const props = defineProps({
  label: String,
  type: {
    type: String,
    default: "text",
  },
  modelValue: String,
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 block text-xs font-medium text-text-body">
      {{ label }}
    </label>

    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="w-full rounded-lg border-2 border-gray-200 px-3 py-3 text-xs text-text-disabled placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
</template>
