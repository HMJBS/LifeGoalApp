<template>
  <div class="login-collapse">
    <b-card title="Log In" style="width: 200rem; min-width: 33%">
      <b-form inline @click="registerUser" @submit.prevent="registerUser">
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
          ></b-form-input>
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
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Log In</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: "",
      password: ""
    }
  },
  methods: {
    registerUser: function() {
      // TODO
    }
  }
};
</script>