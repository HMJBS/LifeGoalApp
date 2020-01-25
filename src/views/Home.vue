<template>
<div class="home">
  <GoalChart />
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</div>
</template>

<script>
// @ is an alias to /src
import GoalChart from '@/components/GoalChart.vue'
export default {
  name: 'home',
  components: {
    GoalChart
  }
}
</script>
