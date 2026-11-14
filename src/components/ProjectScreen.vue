<script setup lang="ts">
defineProps<{
  path: string
  label: string
}>()
</script>

<template>
  <div class="screen" role="img" :aria-label="`${label}`">
    <img class="lb-img" :src="path" :alt="`${label}`" />
  </div>
</template>
