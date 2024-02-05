import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'User',
    component: () => import('../views/user/UserView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/user/HomeView.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/user/ProductsView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
