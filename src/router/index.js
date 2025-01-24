import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/contents',
  },
  {
    path: '/contents',
    name: 'contents',
    component: () => import('../views/ContentsSite.vue'),
    redirect: '/contents/xuexiao',
    children: [
      {
        path: '/contents/xuexiao',
        name: 'xuexiao',
        component: () => import('../views/Contents/XuexiaoSite.vue'),
        redirect: '/contents/xuexiao/yaowen',
        children: [
          {
            path: '/contents/xuexiao/:sub',
            name: 'xuexiao-sub',
            component: () => import('../views/Contents/XuexiaoSub.vue'),
          },
        ],
      },
      {
        path: '/contents/jiaowu',
        name: 'jiaowu',
        component: () => import('../views/Contents/JiaowuSite.vue'),
        redirect: '/contents/jiaowu/tongzhigonggao',
        children: [
          {
            path: '/contents/jiaowu/:sub',
            name: 'jiaowu-sub',
            component: () => import('../views/Contents/JiaowuSub.vue'),
          },
        ],
      },
      {
        path: '/contents/xueyuan',
        name: 'xueyuan',
        component: () => import('../views/Contents/XueyuanSite.vue'),
        children: [
          {
            path: '/contents/xueyuan/:part',
            children: [
              {
                path: '/contents/xueyuan/:part/:sub',
                name: 'xueyuan-sub',
                component: () => import('../views/Contents/XueyuanSub.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/contents/tuanwei',
        name: 'tuanwei',
        component: () => import('../views/Contents/TuanweiSite.vue'),
        redirect: '/contents/tuanwei/tuanqing',
        children: [
          {
            path: '/contents/tuanwei/:sub',
            name: 'tuanwei-sub',
            component: () => import('../views/Contents/TuanweiSub.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('../views/ArticleSite.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
