import { App } from 'vue';
import { Router } from 'vue-router';
import { createApp } from 'vue';
import i18n from './i18n';
import AppVue from './App.vue';
import { Store } from 'vuex';
import './styles/tailwind.css';

function importDirectives(app: App) {
  const pagesRoutes = require.context('./directives', true, /\.ts$/);
  const keys = pagesRoutes.keys();

  keys.forEach((key: string) => {
    pagesRoutes(key)(app);
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function importComponents(app: App) {
  // app.component('SvgRender', SvgRender);
}

export function initVue(router: Router, store: Store<unknown>) {
  const app = createApp(AppVue)
    .use(store)
    .use(router)
    .use(i18n);

  app.mount('#app');
  importDirectives(app);
  importComponents(app);
  return app;
}
