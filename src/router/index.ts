import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pages/auth/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/pages/my/user',
      name: 'user',
      component: () => import('../views/my/MyUser.vue')
    },
    {
      path: '/home',
      name: 'HomeView',
      redirect: '/',
      component: () => import('../views/home/HomeView.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/home/index.vue')
        },
        {
          path: '/pages/my/my',
          name: 'my',
          component: () => import('../views/my/index.vue')
        },
        {
          path: '/pages/question/question',
          name: 'question',
          component: () => import('../views/question/index.vue')
        },
        {
          path: '/pages/article/article',
          name: 'article',
          component: () => import('../views/article/index.vue')
        },
        {
          path: '/pages/category/category',
          name: 'category',
          component: () => import('../views/category/index.vue')
        }
      ]
    }
  ]
})

export default router
