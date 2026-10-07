<script setup lang="ts">
const isOpen = ref(false)
const snapshotStore = useSnapshotStore()
</script>

<template>
  <div class="snapshot-drawer">
    <button
      type="button"
      class="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-emerald-500"
      :aria-expanded="isOpen"
      aria-controls="snapshot-drawer-panel"
      @click="isOpen = !isOpen"
    >
      Business Snapshot
      <span
        v-if="snapshotStore.stats.toolsUsed"
        class="rounded-full bg-white/20 px-2 py-0.5 text-xs"
      >{{ snapshotStore.stats.toolsUsed }}</span>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex justify-end bg-black/60"
        @click.self="isOpen = false"
      >
        <aside
          id="snapshot-drawer-panel"
          class="h-full w-full max-w-md overflow-y-auto border-l border-neutral-800 bg-neutral-950 p-6 shadow-xl"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="sr-only">Business Snapshot</h2>
            <NuxtLink href="/snapshot" class="text-sm text-emerald-400 hover:underline">
              Open full page →
            </NuxtLink>
            <button
              type="button"
              aria-label="Close snapshot"
              class="text-neutral-600 hover:text-neutral-400"
              @click="isOpen = false"
            >
              ✕
            </button>
          </div>
          <SnapshotPanel />
        </aside>
      </div>
    </Teleport>
  </div>
</template>
