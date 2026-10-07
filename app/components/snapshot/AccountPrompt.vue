<script setup lang="ts">
// Phase 2 flips this on once accounts exist — the component and copy are
// ready now so enabling it later needs no markup changes.
const ACCOUNTS_ENABLED = false
</script>

<template>
  <div v-if="ACCOUNTS_ENABLED" class="account-prompt rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm">
    <p class="font-medium text-emerald-300">Want to keep your Business Snapshot?</p>
    <p class="mt-1 text-emerald-400">Create a free account to save your history across visits.</p>
  </div>
  <div v-else class="account-prompt rounded-xl border border-dashed border-neutral-800 p-4 text-sm text-neutral-600">
    Free accounts — coming soon.
  </div>
</template>
