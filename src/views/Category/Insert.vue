<template>
  <div class="insert">

    <div class="back-button">
      <button class="btn btn-light" @click="goBack">&laquo; Go Back</button>
    </div>

    <div class="card">
      <div class="card-header">
        New Category
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
          <button type="submit" class="btn btn-outline-secondary" :disabled="$v.$invalid" @click.prevent="onSubmit">
            Insert
          </button>
        </form>
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
import { required, maxLength } from 'vuelidate/lib/validators';
import Modal from '@/components/Modal.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      form: {
        name: null
      },
      formValidationMessages: {
        name: null
      },
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
        .post('/categories', data, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.jwt.access_token}`
          }
        })
        .then(response => {
          console.log(response.data);
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = 'Category inserted successfully';
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
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100)
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
