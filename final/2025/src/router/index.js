import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Notes',
      component: () => import('@/views/NotesView.vue'),
    },
    {
      path: '/map',
      name: 'Map',
      component: () => import('@/views/MapView.vue'),
    },
  ],
})

export default router
