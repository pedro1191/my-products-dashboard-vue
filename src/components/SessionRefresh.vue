<template>
  <transition name="fade-in">
    <div
      class="session-refresh bg-light"
      v-if="sessionRefresh || waitingUserConfirmation"
    >
      <div class="card">
        <div class="card-body" v-if="loading">
          <p class="card-text">Refreshing...</p>
        </div>
        <div class="card-body" v-else-if="requestCompleted">
          <p class="card-text">{{ requestResponse }}</p>
          <button class="btn btn-secondary" @click="onUserConfirmation">
            Ok
          </button>
        </div>
        <div class="card-body" v-else>
          <p class="card-text">
            Are you still there? Your session will expire soon...
          </p>
          <button class="btn btn-secondary" @click="onRefreshSession">
            Refresh
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from '@/axios-default';

export default {
  name: 'AppSessionRefresh',
  data() {
    return {
      loading: false,
      requestCompleted: false,
      requestResponse: null,
    };
  },
  computed: {
    sessionRefresh() {
      return this.$store.getters.isSessionEnding;
    },
    waitingUserConfirmation() {
      return this.requestCompleted;
    },
  },
  methods: {
    onRefreshSession() {
      this.loading = true;

      axios
        .put(
          '/auth/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.jwt.access_token}`,
            },
          }
        )
        .then((response) => {
          this.onHttpRequestSuccess(response);
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestSuccess(response) {
      this.requestResponse = 'Session refreshed successfully!';
      this.requestCompleted = true;
      this.$store.dispatch('refreshSession', response.data);
      this.loading = false;
    },
    onHttpRequestError() {
      this.requestResponse = 'Oops! An error has occurred...';
      this.requestCompleted = true;
      this.$store.dispatch('warnForSessionRefresh', false);
      this.loading = false;
    },
    onUserConfirmation() {
      this.requestCompleted = false;
      this.requestResponse = null;
    },
  },
};
</script>

<style scoped>
.card {
  right: 1rem;
  bottom: 1rem;
  position: fixed;
  z-index: 9999;
  max-width: 200px;
  text-align: center;
  border: 1px solid var(--secondary);
}
</style>
