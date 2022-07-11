<template>
  <div class="products pt-5">
    <div class="row">
      <div class="col-sm-5 col-md-7 my-3">
        <router-link
          class="btn btn-insert float-left"
          :to="{ name: 'productsInsert' }"
        >
          <font-awesome-icon class="mr-1" icon="fa-plus" />
          New Dish
        </router-link>
      </div>
      <div class="col-sm-7 col-md-5 my-3">
        <form class="form">
          <div class="input-group ml-auto">
            <input
              type="text"
              class="form-control search-control"
              placeholder="Search..."
              @input="onSearch"
              v-model="query"
            />
            <div class="input-group-append">
              <button class="btn" type="button">
                <font-awesome-icon icon="fa-search" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="products-list">
      <ul class="list-unstyled" v-if="products.length > 0">
        <li
          class="media my-3 p-5 list-item-bg-light"
          v-for="product in products"
          :key="product.id"
        >
          <div class="row">
            <div class="col-auto">
              <img :src="product.image" class="thumbnail" :alt="product.name" />
            </div>
            <div class="col">
              <div class="row">
                <div class="col pt-3 pt-md-0">
                  <h3 class="mt-0 mb-1">
                    <strong>{{ product.name }}</strong>
                  </h3>
                  <h5>{{ product.category.data.name }}</h5>
                </div>
              </div>
              <div class="row">
                <div class="col py-3">
                  {{ product.description }}
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="actions">
                    <router-link
                      class="btn btn-update"
                      :to="{
                        name: 'productsUpdate',
                        params: { id: product.id },
                      }"
                    >
                      <font-awesome-icon class="mr-1" icon="fa-pen" /> Update
                    </router-link>
                    <router-link
                      class="btn btn-delete ml-3"
                      :to="{
                        name: 'productsDelete',
                        params: { id: product.id },
                      }"
                    >
                      <font-awesome-icon class="mr-1" icon="fa-trash-can" />
                      Delete
                    </router-link>
                  </div>
                </div>
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
  max-width: 192px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
}

.search-control {
  border-top: none;
  border-left: none;
  border-right: none;
}

.search-control:focus {
  box-shadow: none;
}

.input-group-append {
  position: absolute;
  right: 0;
}

.input-group-append button {
  cursor: default;
  border-bottom: 1px solid transparent;
  z-index: 100;
}

.list-item-bg-light {
  background-color: #f4f5f7;
}
</style>
