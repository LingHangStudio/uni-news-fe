import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/xuexiao"
  },
  {
    path: "/xuexiao",
    name: "学校",
    component: () => import("../views/Xuexiao.vue"),
    redirect: "/xuexiao/yaowen",
    children: [
      {
        path: ":sub",
        component: () => import('../views/XuexiaoSub.vue')
      }
    ]
  },
  {
    path: "/jiaowu",
    name: "教务",
    component: () => import("../views/Jiaowu.vue")
  },
  {
    path: "/xueyuan",
    name: "学院",
    component: () => import("../views/Xueyuan.vue")
  },
  {
    path: "/tuanwei",
    name: "团委",
    component: () => import("../views/Tuanwei.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
