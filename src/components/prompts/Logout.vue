<template>
  <b-card title="Log Out">
    <b-button
      bg-variant="warn"
      @click="$store.dispatch('logout')"
    >
      OK?
    </b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Logout'
}
</script>
