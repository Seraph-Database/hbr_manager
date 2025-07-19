// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:label?",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: '/en/:label?',
        name: 'RosterManEn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/RosterManager.vue'),
      },
      {
        path: '/:label?',
        name: 'RosterMan',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/RosterManager.vue'),
      },
      // {
      //   path: "/en/:label?",
      //   name: "GachaSimEn",
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () =>
      //     import(/* webpackChunkName: "home" */ "@/views/LotterySimulator.vue"),
      // },
      // {
      //   path: "/:label?",
      //   name: "GachaSim",
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () =>
      //     import(/* webpackChunkName: "home" */ "@/views/LotterySimulator.vue"),
      // },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
