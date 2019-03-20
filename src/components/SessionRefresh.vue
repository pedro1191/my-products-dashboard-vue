<template>
  <transition name="fade">
    <div class="session-refresh" v-if="sessionRefresh || waitingUserConfirmation">
      <div class="card">
        <div class="card-body" v-if="loading">
          <p class="card-text">Refreshing...</p>
        </div>
        <div class="card-body" v-else-if="requestCompleted">
          <p class="card-text">{{ requestResponse }}</p>
          <button class="card-link card-link-button" @click="onUserConfirmation">Ok</button>
        </div>
        <div class="card-body" v-else>
          <p class="card-text">Are you still there? Your session will expire soon...</p>
          <button class="card-link card-link-button" @click="onRefreshSession">Refresh</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from '@/axios-default'

export default {
  data () {
    return {
      loading: false,
      requestCompleted: false,
      requestResponse: ''
    }
  },
  computed: {
    sessionRefresh () {
      return this.$store.getters.isSessionEnding
    },
    waitingUserConfirmation () {
      return this.requestCompleted
    }
  },
  methods: {
    onRefreshSession () {
      this.loading = true

      axios.post('/auth/refresh', {}, { headers: { 'Authorization': `Bearer ${this.$store.getters.jwt.access_token}` } })
        .then(response => {
          this.onHttpRequestSuccess(response)
        })
        .catch(error => {
          this.onHttpRequestError(error)
        })
    },
    onHttpRequestSuccess (response) {
      this.requestResponse = 'Session refreshed successfully!'
      this.requestCompleted = true
      this.$store.dispatch('refreshSession', response.data)
      this.loading = false
    },
    onHttpRequestError (error) {
      console.log(error.response)
      this.requestResponse = 'Oops! An error occurred...'
      this.requestCompleted = true
      this.$store.dispatch('warnForSessionRefresh', false)
      this.loading = false
    },
    onUserConfirmation () {
      this.requestCompleted = false
      this.requestResponse = ''
    }
  }
}
</script>

<style scoped>
.card {
  right: 0.5rem;
  bottom: 0.5rem;
  position: fixed;
  z-index: 9999;
  background-color: #007bff;
  color: #fff;
  opacity: 0.6;
  width: 11rem;
  height: 11rem;
}

.card-link-button {
  outline: none;
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
