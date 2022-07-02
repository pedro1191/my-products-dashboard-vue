<template>
  <div class="login">
    <div class="card">
      <div class="card-header">
        <gws-logo :customStyle="customLogoStyle"></gws-logo>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model.trim="v$.form.email.$model"
              :class="{
                'is-invalid':
                  v$.form.email.$error || formValidationMessages.email,
              }"
            />
            <div class="invalid-feedback" v-if="formValidationMessages.email">
              {{ formValidationMessages.email }}
            </div>
            <small id="emailHelp" class="text-muted">
              The default email is <strong>admin@myproducts.com</strong>.
            </small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              aria-describedby="passwordHelp"
              v-model.trim="v$.form.password.$model"
              :class="{
                'is-invalid':
                  v$.form.password.$error || formValidationMessages.password,
              }"
            />
            <div
              class="invalid-feedback"
              v-if="formValidationMessages.password"
            >
              {{ formValidationMessages.password }}
            </div>
            <small id="passwordHelp" class="text-muted">
              The default password is <strong>admin123</strong>.
            </small>
          </div>
          <button
            type="submit"
            class="btn btn-outline-secondary"
            :disabled="v$.$invalid"
            @click.prevent="onSubmit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>

    <gws-modal v-if="modal.error">
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
import { helpers, required, email } from '@vuelidate/validators';
import Logo from '../components/Logo.vue';
import Modal from '../components/Modal.vue';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'AppLogin',
  components: {
    gwsLogo: Logo,
    gwsModal: Modal,
    gwsSpinner: Spinner,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        email: 'admin@myproducts.com',
        password: 'admin123',
      },
      formValidationMessages: {
        email: null,
        password: null,
      },
      customLogoStyle: {
        height: '50px',
      },
      modal: {
        loading: false,
        error: false,
        message: null,
      },
    };
  },
  computed: {
    formEmail() {
      return this.form.email;
    },
    formPassword() {
      return this.form.password;
    },
  },
  watch: {
    formEmail: function () {
      this.setValidationMessage('email');
    },
    formPassword: function () {
      this.setValidationMessage('password');
    },
  },
  methods: {
    onSubmit() {
      this.modal.loading = true;

      axios
        .post('/auth/login', this.form)
        .then((response) => {
          this.$store.dispatch('login', response.data);
          this.modal.loading = false;
          this.$router.push({ name: 'home' });
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
      this.modal.error = false;
      this.modal.message = null;
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
        email: {
          required: helpers.withMessage(
            'The email field is required.',
            required
          ),
          email,
        },
        password: {
          required: helpers.withMessage(
            'The password field is required.',
            required
          ),
        },
      },
    };
  },
};
</script>

<style scoped>
.login {
  padding-top: 15px;
  padding-bottom: 15px;
}

.login .card {
  max-width: 350px;
  margin: auto;
}

.card-header {
  text-align: center;
}

.login .card form {
  text-align: left;
}

.form-group small {
  color: #6c757d;
}
</style>
