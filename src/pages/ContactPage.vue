<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { profile, socials } from '../data/portfolio'

type CopyKey = 'email' | 'phone'
type CopyState = 'idle' | 'copied' | 'select'

const emailEl = ref<HTMLElement | null>(null)
const phoneEl = ref<HTMLElement | null>(null)
const copyState = ref<CopyState>('idle')
const copyKey = ref<CopyKey | ''>('')
const copyNote = computed(() => {
  const noun = copyKey.value === 'email' ? 'Email address' : 'Phone number'
  if (copyState.value === 'copied') return `${noun} copied to your clipboard.`
  if (copyState.value === 'select') return `${noun} selected. Press Ctrl+C or Cmd+C to copy it.`
  return ''
})

let copyTimer: number | undefined

function isCopied(key: CopyKey) {
  return copyState.value === 'copied' && copyKey.value === key
}

function labelFor(key: CopyKey) {
  return isCopied(key) ? 'Copied' : `Copy ${key === 'phone' ? 'phone number' : 'email'}`
}

function finishCopy(key: CopyKey, state: Exclude<CopyState, 'idle'>) {
  copyKey.value = key
  copyState.value = state
  if (copyTimer !== undefined) window.clearTimeout(copyTimer)
  copyTimer = window.setTimeout(() => {
    copyState.value = 'idle'
    copyKey.value = ''
  }, 2800)
}

function selectText(key: CopyKey) {
  const element = key === 'phone' ? phoneEl.value : emailEl.value
  if (element) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }
  finishCopy(key, 'select')
}

async function copyText(key: CopyKey) {
  const text = key === 'phone' ? profile.phone : profile.email
  if (!navigator.clipboard?.writeText) {
    selectText(key)
    return
  }
  try {
    await navigator.clipboard.writeText(text)
    finishCopy(key, 'copied')
  } catch {
    selectText(key)
  }
}

onBeforeUnmount(() => {
  if (copyTimer !== undefined) window.clearTimeout(copyTimer)
})
</script>

<template>
  <section class="wrap page page-contact">
    <h1 class="page-title">Have a project in mind?</h1>
    <p class="page-lead">
      {{
        profile.available
          ? "I'd be happy to discuss your ideas and explore how I can help bring your vision to life through thoughtful and effective web solutions."
          : 'My calendar is full for now, but you are welcome to reach out and I will reply when a slot opens.'
      }}
    </p>
    <div class="c-grid">
      <div class="c-info">
        <h2 class="c-sub">Get in touch today</h2>
        <p class="c-text">
          You can reach me through the contact details below. I look forward to hearing from you.
        </p>
        <ul class="c-list">
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3 7l9 6 9-6"
              />
            </svg>
            <span ref="emailEl" class="c-val">{{ profile.email }}</span>
            <button
              type="button"
              class="icon-btn"
              :class="{ done: isCopied('email') }"
              :aria-label="labelFor('email')"
              :title="labelFor('email')"
              @click="copyText('email')"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  :d="
                    isCopied('email')
                      ? 'M5 12l5 5L20 7'
                      : 'M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1'
                  "
                />
              </svg>
            </button>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
              />
            </svg>
            <span ref="phoneEl" class="c-val">{{ profile.phone }}</span>
            <button
              type="button"
              class="icon-btn"
              :class="{ done: isCopied('phone') }"
              :aria-label="labelFor('phone')"
              :title="labelFor('phone')"
              @click="copyText('phone')"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  :d="
                    isCopied('phone')
                      ? 'M5 12l5 5L20 7'
                      : 'M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1'
                  "
                />
              </svg>
            </button>
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
              />
            </svg>
            <span class="c-val">{{ profile.location }}</span>
          </li>
        </ul>
        <p class="copy-note" aria-live="polite">{{ copyNote }}</p>
      </div>

      <div class="c-side">
        <h2 class="c-sub">Find me online</h2>
        <p class="c-text">
          Prefer to look around first? My work history and projects are both one click away.
        </p>
        <ul class="c-list">
          <li v-for="social in socials" :key="social.label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path :d="social.icon" />
            </svg>
            <a class="c-link" :href="social.href" target="_blank" rel="noopener">
              <span class="c-val">{{ social.display }}</span>
              <span class="vh"> ({{ social.label }}, opens in a new tab)</span>
              <svg class="c-go" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
