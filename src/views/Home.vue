<template>
<div class="home">
  <GoalChart
  userName="Pootis"
  :goalsData="this.rawGoalData" />
</div>
</template>

<script>
// @ is an alias to /src
import GoalChart from '@/components/GoalChart.vue'
import rawGoalDataJson from '../assets/goalData.json'
export default {
  name: 'home',
  components: {
    GoalChart
  },
  data(){
    return {
      rawGoalData: rawGoalDataJson
    }
  }
}
</script>
