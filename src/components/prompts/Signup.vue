<template>
  <div class="register">
    <b-card
      title="Sign Up"
      style="min-width: 33%"
    >
      <b-form
        inline
        @submit.prevent="registerUser"
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
          v-if="queryStatus !== 'registering' && queryStatus !== 'success'"
          type="submit"
          variant="primary"
        >
          Sign Up
        </b-button>
        <b-spinner
          v-if="queryStatus === 'registering'"
          id="registering-spinner"
          variant="primary"
          label="Registering.."
          class="m-2"
        />
        <b-icon
          v-if="queryStatus === 'success'"
          id="signup-success-icon"
          variant="primary"
          icon="check-circle"
          class="m-2"
          style="width: 2rem; height: 2rem;"
        />
        <b-icon
          v-if="queryStatus === 'failure'"
          id="signup-failed-icon"
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
  name: 'Signup',
  data () {
    return {
      userName: '',
      password: '',
      queryStatus: 'normal'
    }
  },
  methods: {
    registerUser () {
      this.queryStatus = 'registering'
      this.$store
        .dispatch('registerNewUser', { userName: this.userName, password: this.password })
        .then(() => {
          this.queryStatus = 'success'
        })
        .catch(() => {
          this.queryStatus = 'failure'
        })
    }
  }
}
</script>
