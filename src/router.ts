import { createRouter, createWebHistory } from 'vue-router'
import ContactPage from './pages/ContactPage.vue'
import ExperiencePage from './pages/ExperiencePage.vue'
import HomePage from './pages/HomePage.vue'
import ProjectPage from './pages/ProjectPage.vue'
import SkillPage from './pages/SkillPage.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/projects', name: 'projects', component: ProjectPage },
    { path: '/skills', name: 'skills', component: SkillPage },
    { path: '/experience', name: 'experience', component: ExperiencePage },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
