import { createRouter, createWebHashHistory } from 'vue-router'
import { useRoutesStore } from '@/store';

const routes = [
  {
    path: '/',
    redirect: '/contents',
  },
  {
    path: '/contents',
    name: 'contents',
    redirect:()=>{
      const routerStore=useRoutesStore()
      const firstRoute=routerStore.routes.normal[0].sub[0].news.substring(0,1)
      return `/contents/${firstRoute}`
    },
    component: () => import('../views/ContentsSite.vue'),
    children: [
      {
        path: '/contents/:part',
        redirect: to => {
          const part = to.params.part;
          return `/contents/${part}/${part}1`;
        },
        name: 'part',
        component: () => import('../views/Contents/PartSite.vue'),
        children: [
          {
            path: '/contents/:part/:sub',
            name: 'part-sub',
            component: () => import('../views/Contents/PartSub.vue'),
          },
        ],
      },
      {
        path: '/contents/X',
        name: 'X',
        redirect:'/contents/X/X_1',
        children: [
          {
            path: '/contents/X/:part',
            component: () => import('../views/Contents/XueyuanSite.vue'),
            children: [
              {
                path: '/contents/X/:part/:sub',
                name: 'X-sub',
                component: () => import('../views/Contents/XueyuanSub.vue'),
              },
            ],
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

// router.afterEach((to, from) => {
//   window.scrollTo(0, 0)
// })

export default router
