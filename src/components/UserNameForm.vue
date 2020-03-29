<template>
  <div class="user">
    <form>
      <label for="userNameInput">User</label>
      <input id="userNameInput" type="text" v-model="userName">
      <input type="submit" value="submit" @click="submitUserName" >
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
    }
  }
}
</script>
