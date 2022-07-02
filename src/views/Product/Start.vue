<template>
  <div class="products">
    <div class="row">
      <div class="col-sm-6 mb-2">
        <router-link
          class="btn btn-secondary float-left"
          :to="{ name: 'productsInsert' }"
        >
          New Dish
        </router-link>
      </div>
      <div class="col-sm-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control search-control"
            placeholder="Search..."
            @input="onSearch"
            v-model="query"
          />
        </div>
      </div>
    </div>

    <div class="products-list">
      <ul class="list-unstyled" v-if="products.length > 0">
        <li class="media my-2" v-for="product in products" :key="product.id">
          <img
            :src="product.image"
            class="thumbnail mr-3"
            :alt="product.name"
          />
          <div class="media-body">
            <div class="row">
              <div class="col-md-8 col-lg-9">
                <h3 class="mt-0 mb-1">
                  <strong>{{ product.name }}</strong>
                </h3>
                <h5>{{ product.category.data.name }}</h5>
                {{ product.description }}
              </div>
              <div class="col-md-4 col-lg-3 my-2 my-md-0 actions">
                <router-link
                  class="btn btn-outline-secondary mr-2"
                  :to="{ name: 'productsUpdate', params: { id: product.id } }"
                >
                  Update
                </router-link>
                <router-link
                  class="btn btn-outline-danger"
                  :to="{ name: 'productsDelete', params: { id: product.id } }"
                >
                  Delete
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center text-muted" v-else>
        <h1>No results found =/</h1>
      </div>
    </div>

    <gws-pagination
      v-if="pagination.total_pages > 1"
      :pagination="pagination"
      @onLinkClicked="changePage($event)"
    >
    </gws-pagination>

    <gws-modal v-if="modal.error">
      <template v-slot:header>
        <div>FoodClub</div>
      </template>
      <template v-slot:body>
        <div>{{ modal.message }}</div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary" @click="onModalClose">OK</button>
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
import Modal from '@/components/Modal.vue';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'AppStart',
  components: {
    gwsModal: Modal,
    gwsSpinner: Spinner,
    gwsPagination: Pagination,
  },
  data() {
    return {
      query: null,
      searchTimeout: null,
      products: [],
      pagination: {},
      current_page: 1,
      modal: {
        loading: false,
        error: false,
        message: null,
      },
    };
  },
  computed: {
    urlParams() {
      const params = {
        params: {
          include: 'category',
          page: this.current_page,
        },
      };

      if (this.query) {
        params.params['name'] = this.query;
      }

      return params;
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    onSearch() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.current_page = 1;
        this.getProducts();
      }, 500);
    },
    getProducts() {
      this.modal.loading = true;

      axios
        .get('/products', this.urlParams)
        .then((response) => {
          this.products = response.data.data;
          this.pagination = response.data.meta.pagination;
          this.modal.loading = false;
        })
        .catch((error) => {
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
      this.getProducts();
    },
  },
};
</script>

<style scoped>
.products {
  padding-top: 15px;
  padding-bottom: 15px;
}

.products-list {
  padding: 2rem 0;
  text-align: left;
}

.thumbnail {
  width: 96px;
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
