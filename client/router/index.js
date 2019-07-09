import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const CatalogPage = () => import(
  /* webpackChunkName: "CatalogPage" */ 
  'client/pages/catalog'
);
const AdminPage = () => import(
  /* webpackChunkName: "AdminPage" */ 
  'client/pages/admin'
);
const CartPage = () => import(
  /* webpackChunkName: "CartPage" */ 
  'client/pages/cart'
);

export default function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehaviour: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }

      return {
        x: 0,
        y: 0,
      }
    },
    routes: [
      { path: '/admin', component: AdminPage, props: true, },
      { path: '/cart', component: CartPage, props: true, },
      { path: '*', component: CatalogPage, props: true, },
    ],
  });
}
