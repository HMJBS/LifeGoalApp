<template>
  <div class="home">
    <GoalChart v-if="this.$store.state.isLogin" />
    <a
      target="_blank"
      href="https://icons8.com/icons/set/lifecycle"
    >Life Cycle</a>, <a
      target="_blank"
      href="https://icons8.com/icons/set/experience-skill"
    >Experience Skill</a> and other icons by <a
      target="_blank"
      href="https://icons8.com"
    >Icons8</a>
  </div>
</template>

<script>
// @ is an alias to /src
import GoalChart from '@/components/GoalChart.vue'

export default {
  name: 'Home',
  components: {
    GoalChart
  }
}
</script>
