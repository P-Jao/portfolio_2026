<script setup lang="ts">
import { jobs } from '../data/portfolio'
</script>

<template>
  <section class="wrap page">
    <h1 class="page-title">Experience</h1>
    <p class="page-lead">
      Here's where I’ve worked and what I’ve built in the past couple of years.
    </p>
    <ol class="jobs">
      <li v-for="job in jobs" :key="job.id" class="job">
        <p class="when">{{ job.when }}</p>
        <div>
          <h2>
            {{ job.company }}<span class="company">{{ job.role }}</span>
          </h2>
          <ul class="job-points">
            <li v-for="point in job.points" :key="point">{{ point }}</li>
          </ul>
          <ul class="job-tech tags" aria-label="Technologies used">
            <li v-for="technology in job.technologies" :key="technology" class="tag">
              {{ technology }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>
