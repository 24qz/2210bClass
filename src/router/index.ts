import { createRouter, createWebHashHistory, routerKey } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pages/auth/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/pages/my/user',
      name: 'user',
      component: () => import('../views/my/MyUser.vue'),
      meta: {
        title: '个人资料'
      }
    },
    {
      path: '/pages/my/study',
      name: 'study',
      component: () => import('../views/my/PageStudy.vue'),
      meta: {
        title: '我的学习'
      }
    },
    {
      path: '/pages/my/setting',
      name: 'setting',
      component: () => import('../views/my/MySeting.vue'),
      meta: {
        title: '设置'
      }
    },
    {
      path: '/pages/my/feedback',
      name: 'feedback',
      component: () => import('../views/my/MyFeedback.vue'),
      meta: {
        title: '意见反馈'
      }
    },
    {
      path: '/pages/my/about',
      name: 'myabout',
      component: () => import('../views/my/MyAbout.vue'),
      meta: {
        title: '关于梦学谷'
      }
    },
    {
      path: '/pages/order/order',
      name: 'order',
      component: () => import('../views/order/index.vue'),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/pages/order/order-pay',
      name: 'order-pay',
      component: () => import('../views/order/OrderPay.vue'),
      meta: {
        title: '订单支付'
      }
    },
    {
      path: '/pages/order/my-balance',
      name: 'balance',
      component: () => import('../views/order/MyBalance.vue'),
      meta: {
        title: '我的余额'
      }
    },
    {
      path: '/pages/order/confirm-buy',
      name: 'balance',
      component: () => import('../views/order/ConfirmBuy.vue'),
      meta: {
        title: '确认购买'
      }
    },
    {
      path: '/pages/course/course',
      name: 'course',
      component: () => import('../views/course/index.vue'),
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/pages/course/course-play',
      name: 'course-play',
      component: () => import('../views/course/CoursePay.vue'),
      meta: {
        title: '/pages/course/course-play'
      }
    },
    {
      path: '/pages/course/course-details',
      name: 'coursedetails',
      component: () => import('../views/course/CourseDetails.vue'),
      meta: {
        title: '/pages/course/course-details'
      }
    },
    {
      path: '/pages/article/details',
      name: 'articledetails',
      component: () => import('../views/article/ArticleDetails.vue'),
      meta: {
        title: '阅读详情'
      }
    },
    {
      path: '/pages/question/details',
      name: 'questiondetails',
      component: () => import('../views/question/QuestionDetail.vue'),
      meta: {
        title: '问题详情'
      }
    },
    {
      path: '/pages/search/search',
      name: 'course',
      component: () => import('../views/search/index.vue'),
      meta: {
        title: '分类详情'
      }
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
          component: () => import('../views/home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/pages/my/my',
          name: 'my',
          component: () => import('../views/my/index.vue'),
          meta: {
            title: '我的'
          }
        },
        {
          path: '/pages/question/question',
          name: 'question',
          component: () => import('../views/question/index.vue'),
          meta: {
            title: '问答'
          }
        },
        {
          path: '/pages/article/article',
          name: 'article',
          component: () => import('../views/article/index.vue'),
          meta: {
            title: '阅读'
          }
        },
        {
          path: '/pages/category/category',
          name: 'category',
          component: () => import('../views/category/index.vue'),
          meta: {
            title: '分类'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  document.title = `${to.meta.title}`
})

export default router
