<template>
  <div class="insert">
    <div class="back-button">
      <button class="btn btn-light" @click="goBack">
        <font-awesome-icon icon="fa-backward" /> Go Back
      </button>
    </div>

    <div class="card">
      <div class="card-header">New Chef</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="name">Name*</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model.trim="v$.form.name.$model"
              :class="{
                'is-invalid':
                  v$.form.name.$error || formValidationMessages.name,
              }"
            />
            <div class="invalid-feedback" v-if="formValidationMessages.name">
              {{ formValidationMessages.name }}
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-outline-secondary"
            :disabled="v$.$invalid"
            @click.prevent="onSubmit"
          >
            Insert
          </button>
        </form>
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
import useVuelidate from '@vuelidate/core';
import { helpers, required, maxLength } from '@vuelidate/validators';
import Modal from '@/components/Modal.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'AppInsert',
  components: {
    gwsModal: Modal,
    gwsSpinner: Spinner,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        name: null,
      },
      formValidationMessages: {
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
  computed: {
    formName() {
      return this.form.name;
    },
  },
  watch: {
    formName: function () {
      this.setValidationMessage('name');
    },
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
        .post('/categories', data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.jwt.access_token}`,
          },
        })
        .then(() => {
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = 'Chef inserted successfully';
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.modal.loading = false;
      this.modal.error = true;
      const errors = error.response.data.errors;

      switch (error.response.status) {
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
      this.$router.push({ name: 'categories' });
    },
    setValidationMessage(key) {
      if (!this.v$.form[key].$dirty) {
        return;
      }
      if (this.v$.form[key].$invalid) {
        this.formValidationMessages[key] = this.v$.form[key].$errors
          .map((error) => error.$message)
          .join('. ');
      } else {
        this.formValidationMessages[key] = null;
      }
    },
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage(
            'The name field is required.',
            required
          ),
          maxLength: maxLength(100),
        },
      },
    };
  },
};
</script>

<style scoped>
.insert {
  padding-top: 15px;
  padding-bottom: 15px;
}

.insert .card {
  max-width: 500px;
  margin: auto;
}

.insert .card form {
  text-align: left;
}

.back-button {
  margin-bottom: 1rem;
}

.show {
  display: block;
}
</style>
