import { createApp } from 'vue';
import { faBars, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueGtag from 'vue-gtag';

library.add(faBars, faBackward);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(VueGtag, {
    config: { id: 'G-HTR2SWPRNK' },
  })
  .mount('#app');
