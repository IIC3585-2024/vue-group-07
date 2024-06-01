import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '../views/CategoryView.vue'
import GalleryView from '../views/GalleryView.vue'
import BookView from '../views/BookView.vue'

const history = createWebHistory(import.meta.env.BASE_URL);
const routes = [
    {
      path: '/',
      name: "home",
      component: CategoryView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView
    },
    {
      path: '/book',
      name: 'book',
      component: BookView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: "home" }
    }
  ];

export default () => createRouter({ history, routes });
