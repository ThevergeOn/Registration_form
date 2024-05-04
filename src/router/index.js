import { createRouter, createWebHistory } from 'vue-router'
import Wizard from '@/components/Wizard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Wizard
    },
  ]
})

export default router
