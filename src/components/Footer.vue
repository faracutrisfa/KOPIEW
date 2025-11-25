<template>
    <footer class="bg-bg-main py-8 md:py-12">
        <div class="mx-auto">
            <!-- Top Section: Logo and Navigation -->
            <div class="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <img src="/logo.webp" alt="Kopiew Logo" class="h-12 w-auto md:h-16" />
                </div>

                <!-- Navigation Links -->
                <div class="flex flex-wrap items-center gap-6 md:gap-8">
                    <a href="#contact"
                        class="text-sm font-medium text-text-body transition-colors hover:text-text-strong md:text-base">
                        Hubungi Kami
                    </a>
                    <button @click="scrollToTop"
                        class="text-sm font-medium text-text-body transition-colors hover:text-text-strong md:text-base">
                        Kembali ke atas
                    </button>
                </div>
            </div>

            <!-- Divider -->
            <div class="mb-6 border-t border-border-subtle"></div>

            <!-- Bottom Section: Copyright and Legal -->
            <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <!-- Copyright and Legal Links -->
                <div class="flex flex-wrap items-center gap-4 md:gap-6">
                    <p class="text-xs text-text-body md:text-sm">
                        © Kopiesw
                    </p>
                    <a href="#legal" class="text-xs text-text-body transition-colors hover:text-text-strong md:text-sm">
                        Legal
                    </a>
                    <a href="#privacy"
                        class="text-xs text-text-body transition-colors hover:text-text-strong md:text-sm">
                        Privacy
                    </a>
                </div>

                <!-- All Rights Reserved -->
                <p class="text-xs text-text-body md:text-sm">
                    All Right Reserved
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>