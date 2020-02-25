<template>
  <div class="user">
    <form @submit.prevent="submitUserName">
      <label for="userNameInput">User</label>
      <input id="userNameInput" type="text" v-model="userName">
      <input type="submit" value="submit" >
    </form>
  </div>
</template>

<script>

export default {
  name: 'UserNameForm',
  data() {
    return {
      userName : ''
    }
  },
  methods: {
    submitUserName() {
      this.$store.commit('setUserName', { userName: this.userName });
      this.$store.dispatch('getLIfeObjectByCurrentUser');
    }
  }
}
</script>
