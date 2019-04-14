<template>
  <div class="categories">

    <div class="row">
      <div class="col-sm-6 mb-2">
        <router-link tag="button" class="btn btn-secondary float-left" :to="{ name: 'categoriesInsert'}">New Category</router-link>
      </div>
      <div class="col-sm-6">
        <div class="input-group">
          <input type="text" class="form-control search-control" placeholder="Search..." @input="onSearch" v-model="query">
        </div>
      </div>
    </div>

    <div class="categories-list">
      <ul class="list-unstyled" v-if="categories.length > 0">
        <li class="media my-2" v-for="category in categories" :key="category.id">
          <div class="media-body">
            <div class="row">
              <div class="col-md-8 col-lg-9">
                <h5 class="mt-0 mb-1"><strong>{{ category.name }}</strong></h5>
              </div>
              <div class="col-md-4 col-lg-3 my-2 my-md-0 actions">
                <router-link tag="button" class="btn btn-outline-secondary mr-2" :to="{ name: 'categoriesUpdate', params: { id: category.id } }">Update</router-link>
                <router-link tag="button" class="btn btn-outline-danger" :to="{ name: 'categoriesDelete', params: { id: category.id } }">Delete</router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center text-muted" v-else>
        <h1>No categories found =/</h1>
      </div>
    </div>

    <gws-pagination v-if="pagination.total_pages > 1" :pagination="pagination" @onLinkClicked="changePage($event)"></gws-pagination>

    <gws-modal v-if="modal.error">
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
import Pagination from '@/components/Pagination.vue';

export default {
  created() {
    this.getCategories();
  },
  data() {
    return {
      query: null,
      searchTimeout: null,
      categories: [],
      pagination: {},
      current_page: 1,
      modal: {
        loading: false,
        error: false,
        message: null
      }
    };
  },
  computed: {
    urlParams() {
      const params = {
        params: {
          page: this.current_page
        }
      };

      if (this.query) {
        params.params['name'] = this.query;
      }

      return params;
    }
  },
  methods: {
    onSearch() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.current_page = 1;
        this.getCategories();
      }, 500);
    },
    getCategories() {
      this.modal.loading = true;

      axios
        .get('/categories', this.urlParams)
        .then(response => {
          this.categories = response.data.data;
          this.pagination = response.data.meta.pagination;
          this.modal.loading = false;
        })
        .catch(error => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.modal.loading = false;
      this.modal.error = true;

      switch (error.response.status) {
        default:
          this.modal.message = 'Oops! Something went wrong.';
      }
    },
    onModalClose() {
      this.modal.loading = false;
      this.modal.error = false;
      this.modal.message = null;
    },
    changePage(page) {
      this.current_page = page;
      this.getCategories();
    }
  },
  components: {
    gwsModal: Modal,
    gwsSpinner: Spinner,
    gwsPagination: Pagination
  }
};
</script>

<style scoped>
.categories {
  padding-top: 15px;
  padding-bottom: 15px;
}

.categories-list {
  padding: 2rem 0;
  text-align: left;
}

.actions {
  display: flex;
  justify-content: right;
  align-content: center;
  align-items: flex-start;
}

.search-control {
  border-top: none;
  border-left: none;
  border-right: none;
}

.search-control:focus {
  box-shadow: none;
}
</style>
