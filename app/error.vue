<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()

useSeoMeta({
  title: props.error.statusCode === 404 ? 'Page not found — Business Toolkit' : 'Something went wrong — Business Toolkit',
  robots: 'noindex, nofollow',
})

function handleClear() {
  clearError({ redirect: '/calculators' })
}
</script>

<template>
  <div class="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-16 text-center sm:items-center">
    <h1 class="text-4xl font-bold text-neutral-100">
      {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="text-neutral-400">
      {{
        error.statusCode === 404
          ? "The page you're looking for doesn't exist or may have moved."
          : "We hit an unexpected error. Let's get you back to the calculators."
      }}
    </p>
    <button
      type="button"
      class="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-500"
      @click="handleClear"
    >
      Go to all calculators
    </button>
  </div>
</template>
