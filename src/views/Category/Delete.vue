<template>
  <div class="delete">
    <div class="back-button">
      <button class="btn btn-light" @click="goBack">
        <font-awesome-icon icon="fa-backward" /> Go Back
      </button>
    </div>

    <div class="card">
      <div class="card-header">Delete Chef</div>
      <div class="card-body">
        <div class="alert alert-danger">
          Are you sure you want to delete this Chef and all their dishes?
        </div>
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group">
                <label for="name">Name</label>
                <div class="text-muted" id="name">
                  {{ form.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-outline-danger"
          @click.prevent="onSubmit"
        >
          Delete
        </button>
      </div>
    </div>

    <gws-modal v-if="modal.success || modal.error">
      <template v-slot:header>
        <div>FoodClub</div>
      </template>
      <template v-slot:body>
        <div>{{ modal.message }}</div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-secondary" @click="onModalClose">OK</button>
      </template>
    </gws-modal>

    <gws-modal v-if="modal.loading">
      <template v-slot:body>
        <gws-spinner></gws-spinner>
      </template>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default';
import Modal from '../../components/Modal.vue';
import Spinner from '../../components/Spinner.vue';

export default {
  name: 'AppDelete',
  components: {
    gwsModal: Modal,
    gwsSpinner: Spinner,
  },
  data() {
    return {
      form: {
        name: null,
      },
      modal: {
        loading: false,
        success: false,
        error: false,
        message: null,
      },
    };
  },
  created() {
    this.modal.loading = true;

    axios
      .get(`/categories/${this.$route.params.id}`)
      .then((response) => {
        this.modal.loading = false;
        this.form.name = response.data.data.name;
      })
      .catch((error) => {
        this.onHttpRequestError(error);
      });
  },
  methods: {
    onSubmit() {
      this.modal.loading = true;

      axios
        .delete(`/categories/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.jwt.access_token}`,
          },
        })
        .then(() => {
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = 'Chef deleted successfully';
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.modal.loading = false;
      this.modal.error = true;

      switch (error.response.status) {
        case 403:
          this.modal.message = error.response.data.message;
          break;
        case 404:
          this.modal.message = 'The Chef has not been found.';
          break;
        default:
          this.modal.message = 'Oops! Something went wrong.';
      }
    },
    onModalClose() {
      this.modal.loading = false;
      this.modal.message = null;
      this.modal.error = false;

      if (this.modal.success) {
        this.modal.success = false;
        this.goBack();
      }
    },
    goBack() {
      this.$router.push({ name: 'categories' });
    },
  },
};
</script>

<style scoped>
.delete {
  padding-top: 15px;
  padding-bottom: 15px;
}

.delete .card {
  max-width: 500px;
  margin: auto;
}

.delete .card .form {
  text-align: left;
}

.back-button {
  margin-bottom: 1rem;
}

.btn-outline-danger {
  margin-top: 1rem;
}
</style>
