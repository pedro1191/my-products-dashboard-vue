import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from './axios-default'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: {
      access_token: null,
      token_type: null,
      expires_in: null
    },
    sessionRefreshTimerId: null,
    automaticLogoutTimerId: null,
    sessionRefreshWarning: false
  },
  mutations: {
    authUser(state, jwt) {
      state.jwt = jwt
    },
    unauthUser(state) {
      state.jwt = {
        access_token: null,
        token_type: null,
        expires_in: null
      }
    },
    setSessionTimerIds(state, timerIds) {
      state.sessionRefreshTimerId = timerIds.sessionRefreshTimerId
      state.automaticLogoutTimerId = timerIds.automaticLogoutTimerId
    },
    updateRefreshWarning(state, alert) {
      state.sessionRefreshWarning = alert
    }
  },
  actions: {
    login({ commit, dispatch }, jwt) {
      const expirationTimeInMilliseconds = (jwt.expires_in * 1000)
      const now = new Date()
      const expirationDateInMilliseconds = (now.getTime() + expirationTimeInMilliseconds)
      jwt.expiration_date = expirationDateInMilliseconds

      dispatch('createSessionTimers', expirationTimeInMilliseconds)
      commit('authUser', jwt)
      localStorage.setItem('jwt', JSON.stringify(jwt))
    },
    tryAutoLogin({ dispatch }) {
      dispatch('checkTokenValidity')
        .then(jwt => {
          dispatch('login', jwt)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkTokenValidity() {
      return new Promise((resolve, reject) => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))

        if (jwt === null || !jwt.access_token || !jwt.expiration_date) {
          return reject(new Error('The token was invalid.'))
        }
        const expirationDateInMilliseconds = jwt.expiration_date
        const now = new Date()

        if (expirationDateInMilliseconds <= now.getTime()) {
          return reject(new Error('The token was expired.'))
        }
        jwt.expires_in = ((expirationDateInMilliseconds - now.getTime()) / 1000)

        axios.get('/auth/me', { headers: { 'Authorization': `Bearer ${jwt.access_token}` } })
          .then(response => {
            console.log(response)
            return resolve(jwt)
          })
          .catch(error => {
            console.log(error.response)
            return reject(new Error('The token was invalid or expired.'))
          })
      })
    },
    refreshSession({ dispatch }, jwt) {
      dispatch('destroySessionTimers')
      dispatch('warnForSessionRefresh', false)
      dispatch('login', jwt)
    },
    createSessionTimers({ commit, dispatch }, expirationTime) {
      const warnForSessionRefreshIn = (expirationTime - 60000)

      const sessionRefreshTimerId = setTimeout(() => {
        dispatch('warnForSessionRefresh', true)
      }, (warnForSessionRefreshIn < 0) ? 0 : warnForSessionRefreshIn)

      const automaticLogoutTimerId = setTimeout(() => {
        dispatch('logout')
      }, expirationTime)

      commit('setSessionTimerIds', { sessionRefreshTimerId, automaticLogoutTimerId })
    },
    destroySessionTimers({ getters }) {
      clearTimeout(getters.sessionRefreshTimerId)
      clearTimeout(getters.automaticLogoutTimerId)
    },
    warnForSessionRefresh({ commit }, alert) {
      commit('updateRefreshWarning', alert)
    },
    logout({ dispatch }) {
      dispatch('logoutOnServer')
      dispatch('logoutOnBrowser')
    },
    logoutOnServer({ getters }) {
      axios.delete('/auth/logout', { headers: { 'Authorization': `Bearer ${getters.jwt.access_token}` } })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    logoutOnBrowser({ commit, dispatch }) {
      dispatch('destroySessionTimers')
      dispatch('warnForSessionRefresh', false)
      commit('unauthUser')
      localStorage.removeItem('jwt')
      router.replace('/login')
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.jwt.access_token !== null
    },
    jwt(state) {
      return state.jwt
    },
    automaticLogoutTimerId(state) {
      return state.automaticLogoutTimerId
    },
    sessionRefreshTimerId(state) {
      return state.sessionRefreshTimerId
    },
    isSessionEnding(state) {
      return state.sessionRefreshWarning
    }
  }
})
