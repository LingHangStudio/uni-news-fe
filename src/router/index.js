import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/contents"
  },
  {
    path: "/contents",
    name: "contents",
    component: () => import("../views/Contents.vue"),
    redirect: "/contents/xuexiao",
    children: [
      {
        path: "/contents/xuexiao",
        name: "学校",
        component: () => import("../views/Contents/Xuexiao.vue"),
        redirect: "/contents/xuexiao/yaowen",
        children: [
          {
            path: ":sub",
            name: "xuexiao-sub",
            component: () => import('../views/Contents/XuexiaoSub.vue')
          }
        ]
      },
      {
        path: "/contents/jiaowu",
        name: "教务",
        component: () => import("../views/Contents/Jiaowu.vue"),
        redirect: "/contents/jiaowu/tongzhigonggao",
        children: [
          {
            path: ":sub",
            name: "jiaowu-sub",
            component: () => import('../views/Contents/JiaowuSub.vue')
          }
        ]
      },
      {
        path: "/contents/xueyuan",
        name: "学院",
        component: () => import("../views/Contents/Xueyuan.vue"),
        redirect: "/contents/xueyuan/cailiaoyuyejinxueyuan",
        children: [
          {
            path: ":sub",
            name: "xueyuan-sub",
            component: () => import('../views/Contents/XueyuanSub.vue')
          }
        ]
      },
      {
        path: "/contents/tuanwei",
        name: "团委",
        component: () => import("../views/Contents/Tuanwei.vue"),
        redirect: "/contents/tuanwei/tuanqing",
        children: [
          {
            path: ":sub",
            name: "tuanwei-sub",
            component: () => import('../views/Contents/TuanweiSub.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import("../views/Article.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

export default router;
