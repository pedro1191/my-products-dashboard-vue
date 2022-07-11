import { createStore } from 'vuex';
import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/axios-default';
import SessionRefresh from '@/components/SessionRefresh.vue';

const createVuexStore = (
  sessionRefreshWarning = false,
  refreshSessionAction = () => {},
  warnForSessionRefreshAction = () => {}
) => {
  return createStore({
    state() {
      return {
        jwt: {
          access_token: null,
          token_type: null,
          expires_in: null,
        },
        sessionRefreshWarning,
      };
    },
    getters: {
      jwt(state) {
        return state.jwt;
      },
      isSessionEnding(state) {
        return state.sessionRefreshWarning;
      },
    },
    mutations: {
      updateRefreshWarning(state, alert) {
        state.sessionRefreshWarning = alert;
      },
    },
    actions: {
      refreshSession({ commit }, jwt) {
        commit('updateRefreshWarning', false);
        refreshSessionAction(jwt);
      },
      warnForSessionRefresh({ commit }, alert) {
        commit('updateRefreshWarning', alert);
        warnForSessionRefreshAction(alert);
      },
    },
  });
};

describe('SessionRefresh.vue', () => {
  let mockedJwt;

  beforeEach(() => {
    jest.clearAllMocks();
    const jwt = {
      access_token: faker.datatype.uuid(),
      expiration_date: faker.date.soon(),
      expires_in: faker.datatype.number(),
    };
    mockedJwt = {
      data: jwt,
    };
  });

  it('renders a SessionRefresh', () => {
    // ARRANGE
    const store = createVuexStore(true);
    const wrapper = mount(SessionRefresh, {
      global: {
        plugins: [store],
      },
    });

    // ACT
    const wrapperText = wrapper.text();
    const button = wrapper.get('button');

    // ASSERT
    expect(wrapperText).toContain(
      'Are you still there? Your session will expire soon...'
    );
    expect(button.text()).toBe('Refresh');
  });

  it('refreshes the session', async () => {
    // ARRANGE
    const refreshSessionAction = jest.fn();
    const store = createVuexStore(true, refreshSessionAction);
    jest.spyOn(axios, 'put').mockResolvedValue(mockedJwt);
    const wrapper = mount(SessionRefresh, {
      global: {
        plugins: [store],
      },
    });

    // ACT
    await wrapper.get('button').trigger('click');
    await flushPromises();

    // ASSERT
    expect(wrapper.text()).toContain('Session refreshed successfully!');
    expect(wrapper.get('button').text()).toBe('Ok');
    expect(refreshSessionAction).toHaveBeenCalledWith(mockedJwt.data);
    await wrapper.get('button').trigger('click');
    expect(wrapper.find('.session-refresh').exists()).toBe(false);
  });

  it('catches an error', async () => {
    // ARRANGE
    const warnForSessionRefreshAction = jest.fn();
    const store = createVuexStore(true, () => {}, warnForSessionRefreshAction);
    jest.spyOn(axios, 'put').mockRejectedValue();
    const wrapper = mount(SessionRefresh, {
      global: {
        plugins: [store],
      },
    });

    // ACT
    await wrapper.get('button').trigger('click');
    await flushPromises();

    // ASSERT
    expect(wrapper.text()).toContain('Oops! An error has occurred...');
    expect(wrapper.get('button').text()).toBe('Ok');
    expect(warnForSessionRefreshAction).toHaveBeenCalledWith(false);
    await wrapper.get('button').trigger('click');
    expect(wrapper.find('.session-refresh').exists()).toBe(false);
  });
});
