import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

const createVuexStore = () => {
  return createStore({
    actions: {
      tryAutoLogin() {},
    },
  });
};

describe('App.vue', () => {
  it('renders properly', () => {
    const store = createVuexStore();
    mount(App, {
      global: {
        plugins: [store],
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });
  });
});
