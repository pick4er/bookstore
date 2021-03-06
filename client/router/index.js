import Vue from 'vue';
import Router from 'vue-router';

import isAuthorized from 'client/router/isAuthorized';

import { ADMIN_MODE } from 'helpers/constants';

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
const UserPage = () => import(
  /* webpackChunkName: "UserPage" */
  'client/pages/UserPage'
);
const BookPage = () => import(
  /* webpackChunkName: "BookPage" */
  'client/pages/BookPage'
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
      };
    },
    routes: [
      {
        path: '/admin',
        component: isAuthorized(AdminPage),
        props: true,
        meta: {
          authMode: ADMIN_MODE,
        },
      },
      {
        path: '/cart',
        component: isAuthorized(CartPage),
        props: true,
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/user/:id/edit',
        component: isAuthorized(UserPage),
        props: true,
        meta: {
          isAuth: true,
        },
      },
      {
        path: '/book/:bookId',
        component: BookPage,
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
