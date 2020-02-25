<template>
<div class="home">
  <UserNameForm />
  <GoalChart />
  <a target="_blank" href="https://icons8.com/icons/set/lifecycle">Life Cycle</a>, <a target="_blank" href="https://icons8.com/icons/set/experience-skill">Experience Skill</a> and other icons by <a target="_blank" href="https://icons8.com">Icons8</a>

</div>
</template>

<script>
// @ is an alias to /src
import GoalChart from '@/components/GoalChart.vue'
import UserNameForm from '@/components/UserNameForm.vue'

export default {
  name: 'home',
  components: {
    GoalChart,
    UserNameForm
  },
  data(){
    return {
      userName: 'jeremy'
    }
  }
}
</script>
