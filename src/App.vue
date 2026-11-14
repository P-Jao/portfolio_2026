<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { pageLinks, profile, socials } from './data/portfolio'

const route = useRoute()
const menuOpen = ref(false)
const barEl = ref<HTMLElement | null>(null)
const menuBtn = ref<HTMLButtonElement | null>(null)
const photoEl = ref<HTMLDialogElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onDocumentClick(event: MouseEvent) {
  if (!menuOpen.value || !barEl.value) return
  const path = event.composedPath()
  if (!path.includes(barEl.value)) menuOpen.value = false
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    menuBtn.value?.focus()
  }
}

function openPhoto() {
  const dialog = photoEl.value
  if (dialog && !dialog.open) dialog.showModal()
}

function closePhoto() {
  if (photoEl.value?.open) photoEl.value.close()
}

function onPhotoClick(event: MouseEvent) {
  if (event.target === photoEl.value) closePhoto()
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    window.scrollTo(0, 0)
  },
)

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<template>
  <div class="glow" :class="{ 'no-halo': route.path !== '/' }" aria-hidden="true"></div>

  <header ref="barEl" class="bar" :class="{ open: menuOpen }">
    <div class="brand">
      <button
        type="button"
        class="brand-btn"
        aria-haspopup="dialog"
        :aria-label="`${profile.name}, view larger photo`"
        @click="openPhoto"
      >
        <img class="brand-img" :src="profile.photo" alt="" width="24" height="24" />
        <span>{{ profile.name }}</span>
      </button>
      <button
        ref="menuBtn"
        type="button"
        class="menu-btn"
        aria-controls="site-tabs"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        <svg v-if="!menuOpen" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
    <nav id="site-tabs" class="tabs" aria-label="Pages">
      <RouterLink
        v-for="link in pageLinks"
        :key="link.path"
        class="tab"
        :to="link.path"
        :aria-current="route.path === link.path ? 'page' : undefined"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>

  <dialog ref="photoEl" class="lightbox" aria-labelledby="lb-name" @click="onPhotoClick">
    <figure class="lb-fig">
      <img class="lb-img" :src="profile.photo" :alt="`Photo of ${profile.name}`" />
      <figcaption class="lb-cap">
        <span id="lb-name" class="lb-name">{{ profile.name }}</span>
        <span class="lb-role">{{ profile.role }}</span>
      </figcaption>
    </figure>
    <button type="button" class="lb-close" aria-label="Close photo" @click="closePhoto">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
  </dialog>

  <main class="main">
    <RouterView v-slot="{ Component }">
      <Transition name="view" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <footer class="status">
    <span class="find">find-me</span>
    <a
      v-for="social in socials"
      class="sicon"
      :key="social.label"
      :href="social.href"
      :aria-label="social.label"
      :title="social.label"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path :d="social.icon" />
      </svg>
    </a>
    <span class="copy">Built with Vue 3.</span>
  </footer>
</template>
