import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/CategoryView.vue'
import GalleryView from '../views/GalleryView.vue'
import BookView from '../views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "home",
      component: CategoryView
    },
    {
      path: '/gallery/:id',
      name: 'gallery',
      component: GalleryView
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: "home" }
    }
  ]
})

export default router
