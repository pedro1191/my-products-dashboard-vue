<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <gws-logo :customStyle="customLogoStyle" /> FoodClub
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        :aria-expanded="mobileNavbarOpen"
        aria-label="Toggle navigation"
        :class="{ collapsed: !mobileNavbarOpen }"
        @click="onNavbarTogglerClick"
      >
        Menu <font-awesome-icon class="ml-2" icon="fa-bars" />
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        :class="{ show: mobileNavbarOpen }"
      >
        <ul class="navbar-nav ml-auto">
          <router-link
            class="nav-item"
            to="/"
            active-class="active"
            exact
            v-if="isAuthenticated"
          >
            <a class="nav-link">Home</a>
          </router-link>
          <router-link class="nav-item" to="/about" active-class="active">
            <a class="nav-link">About</a>
          </router-link>
          <li
            class="nav-item dropdown"
            @click="onDropdownClick"
            :class="{ show: dropdownOpen }"
            v-if="isAuthenticated"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              :aria-expanded="dropdownOpen"
            >
              Manage
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="navbarDropdown"
              :class="{ show: dropdownOpen }"
            >
              <router-link
                class="dropdown-item"
                to="/categories"
                active-class="active"
              >
                Chefs
              </router-link>
              <router-link
                class="dropdown-item"
                to="/products"
                active-class="active"
              >
                Dishes
              </router-link>
            </div>
          </li>
          <router-link
            class="nav-item"
            to="/login"
            active-class="active"
            v-if="!isAuthenticated"
          >
            <a class="nav-link">Login</a>
          </router-link>
          <li class="nav-item" v-else>
            <button class="nav-link nav-link-button" @click="onLogout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: 'AppNavbar',
  components: {
    gwsLogo: Logo,
  },
  data() {
    return {
      customLogoStyle: {
        height: '50px',
      },
      dropdownOpen: false,
      mobileNavbarOpen: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    onNavbarTogglerClick() {
      this.mobileNavbarOpen = !this.mobileNavbarOpen;
    },
    onDropdownClick() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    onLogout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style scoped>
.navbar {
  font-family: PatrickHand, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
  font-size: 1.25rem;
}

.nav-link-button {
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  margin: auto;
}

.nav-item {
  text-align: center;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: rgba(255, 255, 255, 0.75);
  background-color: #343a40;
}
</style>
