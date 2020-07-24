<template>
  <div class="login-collapse">
    <b-card
      title="Log In"
      style="width: 200rem; min-width: 33%"
    >
      <b-form
        inline
        @submit.prevent="login"
      >
        <b-form-group
          id="input-group-user"
          label="User Name"
          label-for="input-user"
          class="mx-2"
        >
          <b-form-input
            id="input-user"
            v-model="userName"
            type="text"
            required
            placeholder="user name"
            class="mx-1"
          />
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label="Password"
          label-for="input-password"
          class="mx-2"
        >
          <b-form-input
            id="input-password"
            v-model="password"
            type="password"
            required
            placeholder="password"
            class="mx-1"
          />
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
        >
          Log In
        </b-button>
        <b-icon
          v-if="queryStatus === 'success'"
          id="login-success-icon"
          variant="primary"
          icon="check-circle"
          class="m-2"
          style="width: 2rem; height: 2rem;"
        />
        <b-icon
          v-if="queryStatus === 'failure'"
          id="login-failed-icon"
          variant="danger"
          icon="exclamation-circle"
          class="m-2"
          style="width: 2rem; height: 2rem;"
        />
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: '',
      queryStatus: 'normal'
    }
  },
  methods: {
    login: async function () {
      try {
        this.queryStatus = 'registering'
        await this.$store.dispatch('login', { userName: this.userName, password: this.password })
        // do ok something
        this.queryStatus = 'success'
      } catch (err) {
        // do error something
        this.queryStatus = 'failure'
        console.error('login failed', err.message, err)
      }
    }
  }
}
</script>
