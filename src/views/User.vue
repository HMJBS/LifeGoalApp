<template>
    <div class="user">
        <h1> User Management </h1>
        <Register />
    </div>
</template>

<script>

import Register from '@/components/Register.vue'

export default {
    name: 'user',
    components: {
        Register
    }    
}
</script>