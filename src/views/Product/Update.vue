<template>
  <div class="update">

    <div class="back-button">
      <button class="btn btn-light" @click="goBack">&laquo; Go Back</button>
    </div>

    <div class="card">
      <div class="card-header">
        Update Dish
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Name*</label>
            <input type="text" class="form-control" id="name" v-model.trim="$v.form.name.$model" :class="{ 'is-invalid': ($v.form.name.$error || formValidationMessages.name) }">
            <div class="invalid-feedback" v-if="formValidationMessages.name">
              {{ formValidationMessages.name }}
            </div>
          </div>
          <div class="form-group">
            <label for="description">Description*</label>
            <textarea class="form-control" id="description" v-model.trim="$v.form.description.$model" :class="{ 'is-invalid': ($v.form.description.$error || formValidationMessages.description) }"></textarea>
            <div class="invalid-feedback" v-if="formValidationMessages.description">
              {{ formValidationMessages.description }}
            </div>
          </div>
          <div class="form-group">
            <label for="current_image">Current Image</label>
            <div class="text-muted" id="current_image">
              <img :alt="form.name" :src="current_image" class="thumbnail">
            </div>
          </div>
          <div class="form-group">
            <label for="image">New Image</label>
            <div class="input-group mb-3">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="image" ref="fileInputRef" @change="setImage" :class="{ 'is-invalid': ($v.form.image.$error || formValidationMessages.image) }">
                <label class="custom-file-label" for="image">
                  {{ form.image ? form.image.name : 'Choose file' }}
                </label>
              </div>
              <div class="invalid-feedback" :class="{ 'show': formValidationMessages.image }" v-if="formValidationMessages.image">
                {{ formValidationMessages.image }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="category">Chef*</label>
            <select class="form-control" id="category" v-model="form.category_id" :class="{ 'is-invalid': ($v.form.category_id.$error || formValidationMessages.category_id) }">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <div class="invalid-feedback" v-if="formValidationMessages.category_id">
              {{ formValidationMessages.category_id }}
            </div>
          </div>
          <button type="submit" class="btn btn-outline-secondary" :disabled="$v.$invalid" @click.prevent="onSubmit">
            Update
          </button>
        </form>
      </div>
    </div>

    <gws-modal v-if="modal.success || modal.error">
      <div slot="header">FoodClub</div>
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
import { required, maxLength } from 'vuelidate/lib/validators';
import Modal from '@/components/Modal.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  created() {
    this.modal.loading = true;

    axios
      .get('/categories')
      .then(response => {
        this.categories = response.data.data;

        axios
          .get(`/products/${this.$route.params.id}?include=category`)
          .then(response => {
            this.modal.loading = false;
            this.form.name = response.data.data.name;
            this.form.description = response.data.data.description;
            this.current_image = response.data.data.image;
            this.form.category_id = response.data.data.category.data.id;
          })
          .catch(error => {
            this.onHttpRequestError(error);
          });
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
        category_id: null,
        _method: 'PUT' // For Laravel/Lumen
      },
      formValidationMessages: {
        name: null,
        description: null,
        image: null,
        category_id: null
      },
      current_image: null,
      categories: [],
      modal: {
        loading: false,
        success: false,
        error: false,
        message: null
      }
    };
  },
  computed: {
    formName() {
      return this.form.name;
    },
    formDescription() {
      return this.form.description;
    },
    formImage() {
      return this.form.image;
    },
    formCategory() {
      return this.form.category_id;
    }
  },
  watch: {
    formName: function() {
      if (!this.$v.form.name.maxLength) {
        this.formValidationMessages.name = `The name may not be greater than ${
          this.$v.form.name.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.form.name.required) {
        this.formValidationMessages.name = 'The name field is required.';
      } else {
        this.formValidationMessages.name = null;
      }
    },
    formDescription: function() {
      if (!this.$v.form.description.maxLength) {
        this.formValidationMessages.description = `The description may not be greater than ${
          this.$v.form.description.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.form.description.required) {
        this.formValidationMessages.description =
          'The description field is required.';
      } else {
        this.formValidationMessages.description = null;
      }
    },
    formImage: function() {
      if (!this.$v.form.image.maxSize) {
        this.formValidationMessages.image =
          'The image may not be greater than 128 kilobytes.';
      } else {
        this.formValidationMessages.image = null;
      }
    },
    formCategory: function() {
      if (!this.$v.form.category_id.required) {
        this.formValidationMessages.category_id =
          'The Chef field is required.';
      } else {
        this.formValidationMessages.category_id = null;
      }
    }
  },
  methods: {
    onSubmit() {
      this.modal.loading = true;
      const data = new FormData();

      for (let key in this.form) {
        if (this.form[key]) {
          data.append(key, this.form[key]);
        }
      }

      axios
        .post(`/products/${this.$route.params.id}`, data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.jwt.access_token}`
          }
        })
        .then(() => {
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = 'Dish updated successfully';
        })
        .catch(error => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.modal.loading = false;
      this.modal.error = true;
      const errors = error.response.data.errors;

      switch (error.response.status) {
        case 404:
          this.modal.message = 'The dish has not been found.';
          break;
        case 422:
          this.modal.message = error.response.data.message;

          for (let key in errors) {
            this.formValidationMessages[key] = errors[key].join(' ');
          }
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
    },
    setImage() {
      this.form.image = this.$refs.fileInputRef.files[0];
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      description: {
        required,
        maxLength: maxLength(1000)
      },
      image: {
        maxSize(value) {
          if (!value) return true;
          return value.size <= 128000;
        }
      },
      category_id: {
        required
      }
    }
  },
  components: {
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
};
</script>

<style scoped>
.update {
  padding-top: 15px;
  padding-bottom: 15px;
}

.update .card {
  max-width: 500px;
  margin: auto;
}

.update .card form {
  text-align: left;
}

.back-button {
  margin-bottom: 1rem;
}

.show {
  display: block;
}

.thumbnail {
  width: 96px;
}
</style>
