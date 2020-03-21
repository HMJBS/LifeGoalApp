<template>
  <div class="user">
    <form>
      <label for="userNameInput">User</label>
      <input id="userNameInput" type="text" v-model="userName">
      <input type="submit" value="submit" @click="submitUserName" >
      <input type="button" value="register" @click="registerUser" />
      <span id="queryResultLable"> {{ queryStatus }}</span>
    </form>
  </div>
</template>

<script>

export default {
  name: 'UserNameForm',
  data() {
    return {
      userName : '',
      queryStatus : ''
    }
  },
  methods: {
    submitUserName() {
      this.$store.commit('setUserName', { userName: this.userName });
      this.$store.dispatch('getLifeObjectByCurrentUser');
    },
    registerUser() {
      this.$store.dispatch('registerNewUser', this.userName).
      then(() => {
        this.queryStatus = 'success';
      }).catch(() => {
        this.queryStatus = 'failure';
      });
    }
  }
}
</script>
