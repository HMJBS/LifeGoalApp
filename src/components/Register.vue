<template>
    <div class="register">
        <h2>Register New User</h2>
        <form>
            <label for="userNameInput">User</label>
            <input id="userNameInput" type="text" v-model="userName">
            <label for="passwordInput">Password</label>
            <input id="passwordInput" type="password" v-model="password">
            <input type="submit" value="Register" @click="registerUser" 
            @submit.prevent="registerUser" >
        </form>
        <span id="queryResult"> {{ queryStatus }}</span>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            userName: '',
            password: '',
            queryStatus: ''
        }
    },
    methods: {
        registerUser() {
            this.queryStatus = 'registering..'
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