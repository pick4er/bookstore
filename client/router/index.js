import Vue from 'vue';
import Router from 'vue-router';

import isAuthorized from 'client/router/isAuthorized';

Vue.use(Router);

const CatalogPage = () => import(
  /* webpackChunkName: "CatalogPage" */ 
  'client/pages/CatalogPage'
);
const AdminPage = () => import(
  /* webpackChunkName: "AdminPage" */ 
  'client/pages/AdminPage'
);
const CartPage = () => import(
  /* webpackChunkName: "CartPage" */ 
  'client/pages/CartPage'
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
      { 
        path: '/admin', 
        component: isAuthorized(AdminPage), 
        props: true,
        meta: {
          isAuth: true,
        },
      },
      { 
        path: '/cart', 
        component: CartPage, 
        props: true, 
      },
      { 
        path: '*', 
        component: CatalogPage, 
        props: true, 
      },
    ],
  });
}
