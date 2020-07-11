<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand class="font-weight-bolder" to="/">Life Goal Tracker</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/user">User</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right Alligned-->

        <b-navbar-nav class="ml-auto">
          <b-button
            variant="light"
            id="loginButton"
            aria-controls="login-collapse"
            :aria-expanded="visibles.login ? 'true': 'false'"
            :class="visibles.login ? null : 'collapsed'"
            @click="openOnly('login')"
          >Log In</b-button>
          <b-button
            variant="light"
            id="signupButton"
            aria-controls="signup-collapse"
            :aria-expanded="visibles.signup ? 'true': 'false'"
            :class="visibles.signup ? null : 'collapsed'"
            @click="openOnly('signup')"
          >Sign Up</b-button>
          <b-button
            variant="light"
            id="logoutButton"
            aria-controls="logout-collapse"
            :aria-expanded="visibles.logout ? 'true': 'false'"
            :class="visibles.logout ? null : 'collapsed'"
            @click="openOnly('logout')"
          >Log Out</b-button>
          <b-avatar></b-avatar>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-collapse id="login-collapse" v-model="visibles.login">
      <b-card style="max-width: 50rem;" class="mb-2 float-right">Log In</b-card>
    </b-collapse>
    <b-collapse id="signup-collapse" v-model="visibles.signup">
      <b-card style="max-width: 50rem;" class="mb-2 float-right">Sign Up</b-card>
    </b-collapse>
    <b-collapse id="logout-collapse" v-model="visibles.logout">
      <b-card style="max-width: 50rem;" class="mb-2 float-right">Log Out</b-card>
    </b-collapse>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      visibles: {
        login: false,
        signup: false,
        logout: false
      }
    };
  },
  methods: {
    /**
     * show only 1 collapse
     */
    openOnly(element) {
      switch (element) {
        case 'login': {
          this.visibles.signup = false;
          this.visibles.logout = false;
          this.visibles.login = true;
          break;
        }
        case 'signup': {
          this.visibles.login = false;
          this.visibles.logout = false;
          this.visibles.signup = true;
          break;
        }
        case 'logout': {
          this.visibles.login = false;
          this.visibles.signup = false;
          this.visibles.logout = true;
          break;
        }
      }
    }
  }
};
</script>


