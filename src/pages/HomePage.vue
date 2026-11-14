<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { profile, services } from '../data/portfolio.ts'

const currentIndex = ref(0)
const userPaused = ref(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
const hovered = ref(false)
const focused = ref(false)
const current = computed(() => services[currentIndex.value]!)
let timer: number | undefined

function setService(index: number) {
  currentIndex.value = index
}

onMounted(() => {
  timer = window.setInterval(() => {
    if (!userPaused.value && !hovered.value && !focused.value) {
      currentIndex.value = (currentIndex.value + 1) % services.length
    }
  }, 6000)
})

onBeforeUnmount(() => {
  if (timer !== undefined) window.clearInterval(timer)
})
</script>

<template>
  <section class="view-hello" aria-label="Introduction">
    <div class="wrap">
      <div class="hero">
        <div class="intro">
          <p class="hello">Hello! I am</p>
          <h1 class="name">{{ profile.name }}</h1>
          <p class="role">{{ profile.role }}</p>
          <p class="bio">{{ profile.bio }}</p>
          <div class="actions">
            <RouterLink class="btn btn-primary" to="/projects">View projects</RouterLink>
            <RouterLink class="btn" to="/contact">Get in touch</RouterLink>
          </div>
        </div>

        <div
          class="carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Services"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
          @focusin="focused = true"
          @focusout="focused = false"
        >
          <article class="slide-card">
            <header class="slide-head">
              <h2 class="slide-title">
                {{ current.title }}
              </h2>
            </header>
            <div class="service-visual">
              <Transition name="slide" mode="out-in">
                <img
                  :key="current.id"
                  class="service-image"
                  :src="current.image"
                  :alt="`${current.title} illustration`"
                  width="800"
                  height="500"
                />
              </Transition>
            </div>
            <div class="service-caption">
              <p>{{ current.description }}</p>
            </div>
          </article>
          <div class="controls">
            <div class="dots">
              <button
                v-for="(service, index) in services"
                :key="service.id"
                type="button"
                class="dot"
                :class="{ on: index === currentIndex }"
                :aria-label="`Show ${service.title}`"
                :aria-current="index === currentIndex ? 'true' : undefined"
                @click="setService(index)"
              ></button>
            </div>
            <button
              type="button"
              class="pp"
              :aria-label="userPaused ? 'Play carousel' : 'Pause carousel'"
              @click="userPaused = !userPaused"
            >
              {{ userPaused ? 'play' : 'pause' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
