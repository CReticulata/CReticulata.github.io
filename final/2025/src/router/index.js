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
    {
      path: '/subscription',
      name: 'Subscription',
      component: () => import('@/views/SubscriptionView.vue'),
      beforeEnter: (to, from) => {
        if (!localStorage.getItem('Tomato-key')) {
          return { name: 'Notes' }
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Notes' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  navigationFallback: {
    rewrite: '/index.html',
    exclude: ['/images/*.{png,jpg,gif}', '/css/*'],
  },
})

export default router
