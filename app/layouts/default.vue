<script setup lang="ts">
import { calculatorsByCategory } from '~/config/calculators'

const categories = calculatorsByCategory()
const year = new Date().getFullYear()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-neutral-900">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <NuxtLink href="/" class="flex items-center gap-2 text-lg font-bold text-neutral-100">
          <span class="h-3 w-3 rounded-full bg-emerald-500" aria-hidden="true" />
          Business Toolkit
        </NuxtLink>
        <nav aria-label="Calculators by category" class="hidden gap-6 sm:flex">
          <div v-for="group in categories" :key="group.category" class="group relative">
            <button type="button" class="text-sm font-medium text-neutral-400 hover:text-emerald-400">
              {{ group.label }}
            </button>
            <div
              class="invisible absolute left-0 top-full z-30 w-56 rounded-xl border border-neutral-800 bg-neutral-950 py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100"
            >
              <NuxtLink
                v-for="calculator in group.items"
                :key="calculator.id"
                :href="`/${calculator.slug}`"
                class="block px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-emerald-400"
              >
                {{ calculator.name }}
              </NuxtLink>
            </div>
          </div>
        </nav>
        <NuxtLink href="/calculators" class="text-sm font-medium text-emerald-400 hover:underline">
          All calculators
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-neutral-900">
      <div class="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500">
        <div class="flex flex-wrap gap-4">
          <NuxtLink v-for="group in categories" :key="group.category" :href="`/calculators#${group.category}`" class="hover:text-emerald-400">
            {{ group.label }}
          </NuxtLink>
          <NuxtLink href="/about" class="hover:text-emerald-400">About</NuxtLink>
          <NuxtLink href="/contact" class="hover:text-emerald-400">Contact</NuxtLink>
          <NuxtLink href="/privacy" class="hover:text-emerald-400">Privacy</NuxtLink>
          <NuxtLink href="/terms" class="hover:text-emerald-400">Terms</NuxtLink>
        </div>
        <p>© {{ year }} Business Toolkit. Calculators are estimates, not financial or tax advice.</p>
      </div>
    </footer>
  </div>
</template>
