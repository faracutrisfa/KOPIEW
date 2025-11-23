<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  full: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const sizeClass = computed(() => {
  if (props.size === "sm") {
    return "h-9 px-8 text-xs";
  }
  return "h-11 px-10 text-sm";
});

const variantClass = computed(() => {
  if (props.variant === "outline") {
    return [
      "bg-bg-main",
      "text-text-body",
      "border border-primary",
      "shadow-none",
      "hover:bg-bg-soft",
      "disabled:text-text-disabled disabled:border-gray-200 disabled:bg-bg-main",
    ].join(" ");
  }

  if (props.variant === "soft") {
    return [
      "bg-bg-main",
      "text-text-body",
      "border border-transparent",
      "shadow",
      "hover:bg-bg-soft",
      "disabled:text-text-disabled disabled:bg-bg-soft",
    ].join(" ");
  }

  return [
    "bg-primary",
    "text-cream",
    "shadow-soft",
    "hover:bg-primary-40",
    "disabled:bg-gray-200 disabled:text-text-disabled",
  ].join(" ");
});

const widthClass = computed(() => (props.full ? "w-full" : "inline-flex"));
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150',
      widthClass,
      sizeClass,
      variantClass,
      disabled && 'cursor-not-allowed',
    ]"
  >
    <slot />
  </button>
</template>
