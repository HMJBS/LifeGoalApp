<template>
  <div class="login-collapse">
    <b-card title="Log In">
      <form>
        <label for="user-input">User</label>
        <input id="user-input" type="text" v-model="user" />
        <label for="password-input">Password</label>
        <input id="password-input" type="password" v-model="password" />
        <input type="submit" value="Register" @click="registerUser" @submit.prevent="registerUser" />
      </form>
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
  }
};
</script>