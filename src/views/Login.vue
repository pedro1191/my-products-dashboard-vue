<template>
  <div class="login">
    <div class="card">
      <div class="card-header">
        <gws-logo :customStyle="customLogoStyle"></gws-logo>
      </div>
      <div class="card-body">
        <form>
          <div
            class="form-group"
            :class="{ 'form-group-error': ($v.form.email.$error || formValidationMessages.email) }">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model.trim="$v.form.email.$model">
            <small
              class="error"
              v-if="formValidationMessages.email">
              {{ formValidationMessages.email }}
            </small>
            <div>
              <small
                id="emailHelp"
                class="text-muted">
                The default email is <strong>admin@genericwebsite.com</strong>.
              </small>
            </div>
          </div>
          <div
            class="form-group"
            :class="{ 'form-group-error': ($v.form.password.$error || formValidationMessages.password) }">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model.trim="$v.form.password.$model">
            <small
              class="error"
              v-if="formValidationMessages.password">
              {{ formValidationMessages.password }}
            </small>
            <div>
              <small
                id="passwordHelp"
                class="text-muted">
                The default password is <strong>admin123</strong>.
              </small>
            </div>
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
    <gws-modal v-if="modal.error" @close="onModalClose">
      <div slot="header">Generic Website</div>
      <div slot="body">{{ modal.message }}</div>
      <button class="btn btn-primary" @click="onModalClose" slot="footer">OK</button>
    </gws-modal>
    <gws-modal v-if="modal.loading" @close="onModalClose">
      <gws-spinner slot="body"></gws-spinner>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default'
import router from '@/router'
import { required, email } from 'vuelidate/lib/validators'
import Logo from '@/components/Logo.vue'
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  data () {
    return {
      form: {
        email: null,
        password: null
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
        this.formValidationMessages.email = 'You must provide a valid email.'
      } else if (!this.$v.form.email.required) {
        this.formValidationMessages.email = 'Field is required.'
      } else {
        this.formValidationMessages.email = null
      }
    },
    formPassword: function () {
      if (!this.$v.form.password.required) {
        this.formValidationMessages.password = 'Field is required.'
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
          router.replace('/')
        })
        .catch(error => {
          this.onHttpRequestError(error)
        })
    },
    onHttpRequestError (error) {
      this.modal.loading = false
      this.modal.error = true

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
          console.log(error.response)
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

.login .card form {
  text-align: left;
}

.form-group small {
  color: #6c757d;
}

.form-group-error label,
.form-group-error small {
  color: #dc3545;
}

.form-group-error input {
  border: 1px solid #dc3545;
}

.form-group-error .error {
  display: block;
}

.error {
  display: none;
}
</style>
