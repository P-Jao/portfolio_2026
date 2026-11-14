<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { skillFiles } from '../data/portfolio'

const fileId = ref(skillFiles[0]!.id)
const activeLine = ref(skillFiles[0]!.firstLine)
const currentFile = computed(() => skillFiles.find((file) => file.id === fileId.value)!)
const activeCol = computed(() => {
  const line = currentFile.value.lines[activeLine.value - 1]
  return line ? line.len + 1 : 1
})

function openFile(id: string) {
  const file = skillFiles.find((item) => item.id === id)
  if (!file) return
  fileId.value = id
  activeLine.value = file.firstLine
}

function onFileKey(event: KeyboardEvent) {
  const currentIndex = skillFiles.findIndex((file) => file.id === currentFile.value.id)
  const count = skillFiles.length
  let nextIndex: number
  if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % count
  else if (event.key === 'ArrowLeft') nextIndex = (currentIndex + count - 1) % count
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = count - 1
  else return
  event.preventDefault()
  const nextFile = skillFiles[nextIndex]!
  openFile(nextFile.id)
  void nextTick(() => document.getElementById(`tab-${nextFile.id}`)?.focus())
}
</script>

<template>
  <section class="wrap page page-skills">
    <h1 class="page-title">Skills</h1>
    <p class="page-lead">
      Every tool below earned its place through real projects, whether for a team, a client, or my
      own curiosity. Open a file to see what I use for each layer.
    </p>

    <div class="ide" :style="{ '--c': currentFile.color }">
      <div class="ide-title" aria-hidden="true">
        <span class="ide-dots"><i></i><i></i><i></i></span>
        <span>paul-jao / skills</span>
      </div>
      <div class="ide-tabs" role="tablist" aria-label="Skill files" @keydown="onFileKey">
        <button
          v-for="file in skillFiles"
          :id="`tab-${file.id}`"
          :key="file.id"
          type="button"
          role="tab"
          class="ide-tab"
          :style="{ '--c': file.color }"
          :aria-selected="file.id === fileId"
          :aria-controls="`panel-${file.id}`"
          :tabindex="file.id === fileId ? 0 : -1"
          @click="openFile(file.id)"
        >
          <span class="ide-dot" aria-hidden="true"></span>{{ file.file }}
        </button>
      </div>
      <div
        :id="`panel-${currentFile.id}`"
        class="ide-body"
        role="tabpanel"
        :aria-labelledby="`tab-${currentFile.id}`"
      >
        <ul class="vh">
          <li v-for="item in currentFile.items" :key="item.key">{{ item.key }}: {{ item.name }}</li>
        </ul>
        <div class="ide-code" aria-hidden="true">
          <ol :key="currentFile.id" class="code">
            <li
              v-for="line in currentFile.lines"
              :key="line.n"
              class="cl"
              :class="{ on: line.n === activeLine }"
              :style="{ '--n': line.n }"
              @click="activeLine = line.n"
            >
              <span class="ln">{{ line.n }}</span>
              <span class="src">
                <span v-for="(token, index) in line.toks" :key="index" :class="token.c">
                  {{ token.t }}
                </span>
              </span>
            </li>
          </ol>
        </div>
        <div class="ide-map" aria-hidden="true">
          <i
            v-for="line in currentFile.lines"
            :key="line.n"
            :class="{ sk: line.skill, on: line.n === activeLine }"
            :style="{ '--len': line.len }"
          ></i>
        </div>
      </div>
      <div class="ide-status">
        <span class="st-ok">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          {{ currentFile.items.length }} skills loaded
        </span>
        <span>Ln {{ activeLine }}, Col {{ activeCol }}</span>
        <span class="st-opt">Spaces: 2</span>
        <span class="st-opt">UTF-8</span>
        <span>{{ currentFile.lang }}</span>
      </div>
    </div>
  </section>
</template>
