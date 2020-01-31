<template>
  <div class="delete">

    <div class="back-button">
      <button class="btn btn-light" @click="goBack">&laquo; Go Back</button>
    </div>

    <div class="card">
      <div class="card-header">
        Delete Product
      </div>
      <div class="card-body">
        <div class="alert alert-danger">Are you sure you want to delete this product?</div>
        <div class="card">
          <div class="card-body">
            <div class="form">
              <div class="form-group">
                <label for="name">Name</label>
                <div class="text-muted" id="name">
                  {{ form.name }}
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <div class="text-muted" id="description">
                  {{ form.description }}
                </div>
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <div class="text-muted" id="image">
                  <img :alt="form.name" :src="form.image" class="thumbnail">
                </div>
              </div>
              <div class="form-group">
                <label for="category">Category</label>
                <div class="text-muted" id="category">
                  {{ form.category_name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-outline-danger" @click.prevent="onSubmit">
          Delete
        </button>
      </div>
    </div>

    <gws-modal v-if="modal.success || modal.error">
      <div slot="header">My Food</div>
      <div slot="body">{{ modal.message }}</div>
      <button class="btn btn-secondary" @click="onModalClose" slot="footer">OK</button>
    </gws-modal>

    <gws-modal v-if="modal.loading">
      <gws-spinner slot="body"></gws-spinner>
    </gws-modal>

  </div>
</template>

<script>
import axios from '@/axios-default';
import Modal from '@/components/Modal.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  created() {
    this.modal.loading = true;

    axios
      .get(`/products/${this.$route.params.id}?include=category`)
      .then(response => {
        this.modal.loading = false;
        this.form.name = response.data.data.name;
        this.form.description = response.data.data.description;
        this.form.image = response.data.data.image;
        this.form.category_name = response.data.data.category.data.name;
      })
      .catch(error => {
        this.onHttpRequestError(error);
      });
  },
  data() {
    return {
      form: {
        name: null,
        description: null,
        image: null,
        category_name: null
      },
      modal: {
        loading: false,
        success: false,
        error: false,
        message: null
      }
    };
  },
  methods: {
    onSubmit() {
      this.modal.loading = true;

      axios
        .delete(`/products/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.jwt.access_token}`
          }
        })
        .then(() => {
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = 'Product deleted successfully';
        })
        .catch(error => {
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
          this.modal.message = 'The product was not found.';
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
      this.$router.push({ name: 'products' });
    }
  },
  components: {
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
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

.thumbnail {
  width: 96px;
}
</style>
