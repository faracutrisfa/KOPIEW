<template>
  <section class="min-h-[60vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-soft">
      <h1 class="mb-4 text-xl font-bold text-kopi-600">Daftar</h1>
      <p class="mb-6 text-xs text-neutral-600">
        Buat akun untuk mulai eksplor kopi dan menyimpan favoritmu.
      </p>

      <form class="space-y-4 text-sm">
        <div>
          <label class="mb-1 block text-xs font-medium">Nama</label>
          <input
            type="text"
            class="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kopi-500"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium">Email</label>
          <input
            type="email"
            class="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kopi-500"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium">Password</label>
          <input
            type="password"
            class="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kopi-500"
          />
        </div>
        <button
          type="submit"
          class="w-full rounded-xl2 bg-kopi-500 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-kopi-600 transition"
        >
          Daftar
        </button>
      </form>
    </div>
  </section>
</template>
