import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export default function init(routes: RouteRecordRaw[]) {
  const defaultRoute = {
    path: '/',
    component: defineAsyncComponent({
      loader: () =>
        import('@/components/layouts/landingLayout/LandingLayout.vue'),
    }),
    children: [
      {
        path: '/',
        name: 'landing',
        component: defineAsyncComponent({
          loader: () => import(/* webpackChunkName: "LandingPage" */ '@/components/pages/landing/LandingPage.vue'),
        }),
        meta: {
          title: 'Home',
        },
      },
    ],
  };

  routes.push(defaultRoute);
}
