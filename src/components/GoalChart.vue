<template>

  <div id='chart'>
    <h1>{{ userName }}'s Life Goal</h1>
    <table>
      <tr>
        <th>Ultimate Goal</th>
        <th>Big Goal</th>
        <th>Needed Skill</th>
        <th>Must-do task</th>
      </tr>
      <tr>
        <td>"Be Big One"</td>
        <td></td>
        <td></td>
        <td>This is still test</td>
      </tr>
    </table>
  </div>

</template>

<script>

  export default {
    name: 'GoalChart',
    props: {
      userName: String
    }
  }

</script>

<style scoped>



</style>
