<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
    >
      <b-navbar-brand
        class="font-weight-bolder"
        to="/"
      >
        Life Goal Tracker
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item to="/user">
            User
          </b-nav-item>
          <b-nav-item to="/about">
            About
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button
            id="loginButton"
            variant="light"
            aria-controls="login-collapse"
            :aria-expanded="visibles.login ? 'true': 'false'"
            :class="[visibles.login ? '': collapsed, this.$store.state.isLogin ? 'd-none' : 'd-inline-block' ]"
            @click="toggleOnly('login')"
          >
            Log In
          </b-button>
          <b-button
            id="signupButton"
            variant="light"
            aria-controls="signup-collapse"
            :display="this.$store.state.isLogin ? 'none' : 'inline-block'"
            :aria-expanded="visibles.signup ? 'true': 'false'"
            :class="[visibles.signup ? '': collapsed, this.$store.state.isLogin ? 'd-none' : 'd-inline-block' ]"
            @click="toggleOnly('signup')"
          >
            Sign Up
          </b-button>
          <b-button
            id="logoutButton"
            variant="light"
            aria-controls="logout-collapse"
            :display="this.$store.state.isLogin ? 'inline-block' : 'none'"
            :aria-expanded="visibles.logout ? 'true': 'false'"
            :class="[visibles.logout ? '': collapsed, this.$store.state.isLogin ? 'd-inline-block' : 'd-none' ]"
            @click="toggleOnly('logout')"
          >
            Log Out
          </b-button>
          <b-avatar />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-collapse
      id="login-collapse"
      v-model="visibles.login"
      class="mb-3"
    >
      <Login />
    </b-collapse>
    <b-collapse
      id="signup-collapse"
      v-model="visibles.signup"
      class="mb-3"
    >
      <Signup />
    </b-collapse>
    <b-collapse
      id="logout-collapse"
      v-model="visibles.logout"
      class="mb-3"
    >
      <Logout />
    </b-collapse>
    <router-view />
  </div>
</template>

<script>
import Signup from '@/components/prompts/Signup.vue'
import Login from '@/components/prompts/Login.vue'
import Logout from '@/components/prompts/Logout.vue'

export default {
  name: 'App',
  components: {
    Signup,
    Login,
    Logout
  },
  data () {
    return {
      visibles: {
        login: false,
        signup: false,
        logout: false
      }
    }
  },
  mounted () {
    // watch for store.isLogin and collapse prompts
    this.$store.watch((state, getters) => state.isLogin, (newValue, oldValue) => {
      if (newValue) {
        this.visibles.login = false
        this.visibles.signup = false
      } else {
        this.visibles.logout = false
      }
    })
  },
  methods: {
    /**
     * show only 1 collapse
     */
    toggleOnly (element) {
      switch (element) {
        case 'login': {
          this.visibles.signup = false
          this.visibles.logout = false
          this.visibles.login = !this.visibles.login
          break
        }
        case 'signup': {
          this.visibles.login = false
          this.visibles.logout = false
          this.visibles.signup = !this.visibles.signup
          break
        }
        case 'logout': {
          this.visibles.login = false
          this.visibles.signup = false
          this.visibles.logout = !this.visibles.logout
          break
        }
      }
    }
  }
}
</script>
