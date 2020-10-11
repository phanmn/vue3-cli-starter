import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import store, { init as initStore } from './store/index';
// import accountStorage from '/@/services/accountStorage';

const routes = buildRoutes();
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

// const initStorePromise = initStore();
// guardNagivation();
updateTitlePage();

function buildRoutes(): RouteRecordRaw[] {
  const vueRoutes: RouteRecordRaw[] = [];
  const pagesRoutes = require.context(
    './components/pages',
    true,
    /\.route\.ts$/,
  );

  const keys = pagesRoutes.keys();
  keys.forEach((key: string) => {
    pagesRoutes(key).default(vueRoutes);
  });

  vueRoutes.push({
    path: '/:catchAll(.*)',
    redirect: {
      name: 'landing',
    },
  });

  return vueRoutes;
}

function updateTitlePage() {
  // check change state and set title for page

  router.afterEach(route => {
    document.title = route.meta?.title;
  });
}

// function guardNagivation() {
//   router.beforeEach(async (to, from, next) => {
//     await initStorePromise;

//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     let token = await accountStorage.getToken();

//     if (!requiresAuth || store.state.account.profile) {
//       if (!store.state.account.profile && token) {
//         store.dispatch('account/getProfileIfNotExist');
//       }

//       if (store.state.account.profile && !hasRoutePermisson(to)) {
//         next({ name: 'no_permisson', query: { url: to.fullPath } });
//         return null;
//       }

//       next();
//       return null;
//     }

//     let p = Promise.resolve();
//     if (token) {
//       p = store.dispatch('account/getProfileIfNotExist');
//     }

//     p.then(() => {
//       if (!store.state.account.profile) {
//         next({ name: 'login', query: { redirect: to.fullPath } });
//         return null;
//       }

//       if (!hasRoutePermisson(to)) {
//         next({ name: 'no_permisson', query: { url: to.fullPath } });
//         return null;
//       }

//       next({});
//       return null;
//     })
//       .catch(() => {
//         next({ name: 'login', query: { redirect: to.fullPath } });
//       });
//     return null;
//   });
// }

export default router;
