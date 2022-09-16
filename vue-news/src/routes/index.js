import Vue from 'vue';
import VueRouter from 'vue-router';
import NewsView from '../views/NewsView.vue';
import AskView from '../views/AskView.vue';
import JobsView from '../views/JobsView.vue';
import UserView from '../views/UserView.vue';
import ItemView from '../views/ItemView.vue';
import bus from '../utils/bus.js';
import { store } from '../store/index.js';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      name: 'new',
      component: NewsView,
      beforeEnter: (to, from, next) => {
        bus.$emit('start:spinner');
        store.dispatch('FETCH_NEWS', to.name)
          .then(() => {
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    {
      path: '/ask',
      name: 'ask', 
      component: AskView,
      beforeEnter: (to, from, next) => {
        bus.$emit('start:spinner');
        store.dispatch('FETCH_ASK', to.name)
          .then(() => {
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    {
      path: '/jobs', 
      name: 'job',
      component: JobsView,
      beforeEnter: (to, from, next) => {
        bus.$emit('start:spinner');
        store.dispatch('FETCH_JOBS', to.name)
          .then(() => {
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    {
      path: '/user/:id',
      component: UserView,
      beforeEnter: (to, from, next) => {
        bus.$emit('start:spinner');
        store.dispatch('FETCH_USER', to.params.id)
          .then(() => {
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    {
      path: '/item/:id',
      component: ItemView,
      beforeEnter: (to, from, next) => {
        bus.$emit('start:spinner');
        store.dispatch('FETCH_ITEM', to.params.id)
          .then(() => {
            next();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  ]
});