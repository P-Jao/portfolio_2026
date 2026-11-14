<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectScreen from '../components/ProjectScreen.vue'
import { folders, projects } from '../data/portfolio.ts'
import type { Project, Screenshot } from '../types.ts'

const route = useRoute()
const router = useRouter()
const selected = computed<Project>(() => {
  const queryId = route.query.project
  const id = typeof queryId === 'string' ? queryId : ''
  return projects.find((project) => project.id === id) ?? projects[0]!
})
const tree = folders.map((folder) => {
  const folderProjects = projects.filter((project) => project.folder === folder.id)
  return { ...folder, projects: folderProjects, wip: folderProjects.length === 0 }
})
const selectedFolder = computed(
  () => tree.find((folder) => folder.id === selected.value.folder) ?? tree[0]!,
)
const openFolders = reactive<Record<string, boolean>>({ web: true })
const detailsEl = ref<HTMLElement | null>(null)
const shotEl = ref<HTMLDialogElement | null>(null)
const shot = ref<Screenshot | null>(null)
const wide = ref(window.innerWidth >= 1000)

function isOpen(id: string) {
  return Boolean(openFolders[id])
}

function toggleFolder(id: string) {
  openFolders[id] = !openFolders[id]
}

function select(id: string) {
  const project = projects.find((item) => item.id === id)
  if (!project) return
  openFolders[project.folder] = true
  void router.replace({ query: { ...route.query, project: id } })
  if (!wide.value) {
    void nextTick(() => detailsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
}

function openShot(image: Screenshot) {
  shot.value = image
  void nextTick(() => {
    if (shotEl.value && !shotEl.value.open) shotEl.value.showModal()
  })
}

function closeShot() {
  if (shotEl.value?.open) shotEl.value.close()
}

function onShotClick(event: MouseEvent) {
  if (event.target === shotEl.value) closeShot()
}

function onViewportChange(event: MediaQueryListEvent) {
  wide.value = event.matches
}

const viewportQuery = window.matchMedia('(min-width: 1000px)')

watch(
  () => selected.value.folder,
  (folder) => {
    openFolders[folder] = true
  },
  { immediate: true },
)

onMounted(() => viewportQuery.addEventListener('change', onViewportChange))
onBeforeUnmount(() => viewportQuery.removeEventListener('change', onViewportChange))
</script>

<template>
  <section class="wk">
    <nav class="pane side" aria-label="Projects">
      <div class="pane-head">
        <h1 class="pane-title">Projects</h1>
      </div>
      <div class="tree-nav">
        <ul class="tree">
          <li v-for="folder in tree" :key="folder.id">
            <button
              type="button"
              class="folder"
              :aria-expanded="isOpen(folder.id)"
              :aria-controls="`files-${folder.id}`"
              @click="toggleFolder(folder.id)"
            >
              <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
              <svg
                class="folder-ico"
                viewBox="0 0 24 24"
                aria-hidden="true"
                :style="{ color: folder.color }"
              >
                <path
                  d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                />
              </svg>
              <span>{{ folder.label }}</span>
              <span v-if="folder.wip" class="wip">
                WIP<span class="vh">, work in progress</span>
              </span>
            </button>
            <ul :id="`files-${folder.id}`" class="files" v-show="isOpen(folder.id)">
              <li v-if="!folder.projects.length" class="empty">
                Nothing here yet. This folder is still work in progress.
              </li>
              <li v-for="project in folder.projects" :key="project.id">
                <button
                  type="button"
                  class="file"
                  :class="{ on: project.id === selected.id }"
                  :aria-current="project.id === selected.id ? 'true' : undefined"
                  @click="select(project.id)"
                >
                  <svg class="file-ico" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5h16v14H4zM4 9h16" />
                  </svg>
                  <span>{{ project.title }}</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <article ref="detailsEl" class="pane detail">
      <div class="pane-head">
        <span>{{ selectedFolder.label }}</span>
        <span aria-hidden="true">/</span>
        <span class="crumb-now">{{ selected.title }}</span>
      </div>
      <div class="detail-body">
        <h2 class="d-title">{{ selected.title }}</h2>
        <p class="d-dates">{{ selected.dates }}</p>
        <dl class="facts">
          <div>
            <dt>Role</dt>
            <dd>{{ selected.role }}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>
              <span class="tags">
                <span v-for="item in selected.stack" :key="item" class="tag">{{ item }}</span>
              </span>
            </dd>
          </div>
        </dl>
        <div class="d-cols">
          <p class="d-summary">{{ selected.summary }}</p>
          <ul class="d-bullets">
            <li v-for="highlight in selected.highlights" :key="highlight">{{ highlight }}</li>
          </ul>
        </div>
        <div class="links">
          <a v-if="selected.live" :href="selected.live" target="_blank" rel="noopener">
            Live demo
          </a>
          <a v-if="selected.source" :href="selected.source" target="_blank" rel="noopener">
            Source code
          </a>
        </div>
      </div>
    </article>

    <aside class="pane shots-pane" aria-label="Screenshots">
      <div class="pane-head">
        <span>screenshots</span><span class="count">{{ selected.shots.length }}</span>
      </div>
      <div class="shots-body">
        <div
          :key="selected.id"
          class="shots-scroll"
          :tabindex="wide ? 0 : undefined"
          role="region"
          :aria-label="`${selected.title} screenshots`"
        >
          <figure v-for="image in selected.shots" :key="image.caption" class="shot">
            <figcaption>{{ image.caption }}</figcaption>
            <button
              type="button"
              class="shot-btn"
              aria-haspopup="dialog"
              :aria-label="`View larger: ${image.caption}`"
              @click="openShot(image)"
            >
              <ProjectScreen :path="image.path" :label="image.caption" />
              <span class="shot-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
                </svg>
              </span>
            </button>
          </figure>
        </div>
      </div>
    </aside>

    <dialog
      ref="shotEl"
      class="lightbox shot-lightbox"
      aria-labelledby="shot-title"
      @click="onShotClick"
      @close="shot = null"
    >
      <figure v-if="shot" class="lb-fig lb-wide">
        <ProjectScreen :path="shot.path" :label="shot.caption" />
        <figcaption class="lb-cap">
          <span id="shot-title" class="lb-name">{{ shot.caption }}</span>
          <span class="lb-role">{{ selected.title }}</span>
        </figcaption>
      </figure>
      <button type="button" class="lb-close" aria-label="Close screenshot" @click="closeShot">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  </section>
</template>
