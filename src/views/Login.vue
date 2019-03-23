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
              v-model.trim="$v.form.email.$model"
              :class="{ 'is-invalid': ($v.form.email.$error || formValidationMessages.email) }">
            <div
              class="invalid-feedback"
              v-if="formValidationMessages.email">
              {{ formValidationMessages.email }}
            </div>
            <small
              id="emailHelp"
              class="text-muted">
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
              v-model.trim="$v.form.password.$model"
              :class="{ 'is-invalid': ($v.form.password.$error || formValidationMessages.password) }">
            <div
              class="invalid-feedback"
              v-if="formValidationMessages.password">
              {{ formValidationMessages.password }}
            </div>
            <small
              id="passwordHelp"
              class="text-muted">
              The default password is <strong>admin123</strong>.
            </small>
          </div>
          <button
            type="submit"
            class="btn btn-outline-primary"
            :disabled="$v.$invalid"
            @click.prevent="onSubmit">
            Log in
          </button>
        </form>
      </div>
    </div>
    <gws-modal v-if="modal.error">
      <div slot="header">Generic Website</div>
      <div slot="body">{{ modal.message }}</div>
      <button class="btn btn-primary" @click="onModalClose" slot="footer">OK</button>
    </gws-modal>
    <gws-modal v-if="modal.loading">
      <gws-spinner slot="body"></gws-spinner>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default'
import { required, email } from 'vuelidate/lib/validators'
import Logo from '@/components/Logo.vue'
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  data () {
    return {
      form: {
        email: 'admin@myproducts.com',
        password: 'admin123'
      },
      formValidationMessages: {
        email: null,
        password: null
      },
      customLogoStyle: {
        height: '50px'
      },
      modal: {
        loading: false,
        error: false,
        message: null
      }
    }
  },
  computed: {
    formEmail () {
      return this.form.email
    },
    formPassword () {
      return this.form.password
    }
  },
  watch: {
    formEmail: function () {
      if (!this.$v.form.email.email) {
        this.formValidationMessages.email = 'The email must be a valid email address.'
      } else if (!this.$v.form.email.required) {
        this.formValidationMessages.email = 'The email field is required.'
      } else {
        this.formValidationMessages.email = null
      }
    },
    formPassword: function () {
      if (!this.$v.form.password.required) {
        this.formValidationMessages.password = 'The passowrd field is required.'
      } else {
        this.formValidationMessages.password = null
      }
    }
  },
  methods: {
    onSubmit () {
      this.modal.loading = true

      axios.post('/auth/login', this.form)
        .then(response => {
          this.$store.dispatch('login', response.data)
          this.modal.loading = false
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          this.onHttpRequestError(error)
        })
    },
    onHttpRequestError (error) {
      this.modal.loading = false
      this.modal.error = true
      console.log(error.response)

      switch (error.response.status) {
        case 422:
          this.modal.message = error.response.data.message

          const errors = error.response.data.errors

          for (let key in errors) {
            this.formValidationMessages[key] = errors[key].join(' ')
          }

          break
        default:
          this.modal.message = 'Oops! Something went wrong.'
      }
    },
    onModalClose () {
      this.modal.loading = false
      this.modal.error = false
      this.modal.message = null
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  components: {
    gwsLogo: Logo,
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
}
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
