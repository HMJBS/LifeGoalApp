<template>
  <div class="user">
    <b-form @submit="submitUserName">

      <b-form-group
        id="input-group-user"
        label="User Name"
        label-for="input-user"
        description="enter your user name."
      >
        <b-form-input
          id="input-user"
          v-model="userName"
          type="text"
          required
          placeholder="user name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'UserNameForm',
  data() {
    return {
      queryStatus : "",
    }
  },
  computed: {
    userName: {
      get () { return this.$store.state.userName },
      set (value) { this.$store.commit('setUserName', { userName: value })}
    }
  },
  methods: {
    submitUserName() {
      this.$store.dispatch('getLifeObjectByCurrentUser');
    }
  }
}
</script>
