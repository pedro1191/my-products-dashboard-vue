<template>
  <transition name="ease-in">
    <div class="update-notifier bg-light" v-if="updateExists">
      <p>There is an update available!</p>
      <button
        class="btn btn-secondary py-1"
        @click="refreshApp"
        :disabled="refreshing"
      >
        Refresh
      </button>
    </div>
  </transition>
  <Spinner v-if="refreshing"></Spinner>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'AppUpdateNotifier',
  components: {
    Spinner,
  },
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  created() {
    if ('serviceWorker' in navigator) {
      document.addEventListener('swUpdated', this.showNotification, {
        once: true,
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!this.refreshing) {
          this.refreshing = true;
          window.location.reload();
        }
      });
    }
  },
  methods: {
    showNotification(event) {
      this.registration = event.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;

      if (this.registration && this.registration.waiting) {
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    },
  },
};
</script>

<style scoped>
.update-notifier {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  padding: 1rem;
  z-index: 100;
  border: 1px solid var(--secondary);
  text-align: center;
}
</style>
