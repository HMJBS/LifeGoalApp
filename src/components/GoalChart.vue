<template>
  <div class="mb-4">
    I'm here.
    <b-card-group deck  v-if="objectsJson">

    <!-- Life Object layer -->
    <b-card v-for="lifeGoal in objectsJson.data.children" v-bind:key="lifeGoal._id"
      v-bind:title="lifeGoal.name"
      sub-title="None"
      class="mb-2"
    >
      <b-card-text>Needed Skills</b-card-text>
      <!-- skillset layer -->
      <b-card v-for="skillset in lifeGoal.children" :key="skillset._id"
        :title="skillset.name"
        sub-title="REBOK I guess."
      >
        <!-- v-binding v-b-toggle don"t work -->
        <b-icon-arrow-down-short v-b-toggle="`collapse-${skillset._id}`" class="h3" />
        <b-collapse class="mb-2" :id="`collapse-${skillset._id}`">
          <!-- skill layer -->
          <b-card v-for="skill in skillset.children" :key="skill._id" 
            :title="skill.name"
            sub-title="Goup"
          >
            <b-icon-arrow-down-short v-b-toggle="'collapse-' + skill._id"  class="h3" />
            <b-collapse :id="'collapse-' + skill._id " class="mb-2">
              <!-- study layer -->
              <b-card v-for="study in skill.children" :key="study._id"
                :title="study.name"
                sub-title="Read'em All"
              >
              </b-card>
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-card>
    </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  computed: {
    objectsJson() {
      return this.$store.state.lifeObjects;
    }
  },
  data() {
    return {
      newObjectStr: "",
      clickedNode: null
    };
  },
  name: "GoalChart",
  methods: {
    showAddObjectModal: function(payload) {
      this.clickedNode = payload;
      this.$bvModal.show("addOjectModal");
    },
    hideObjectModal: function() {
      this.$bvModal.hide("addOjectModal");
    },
    registerNewObject: function() {
      // check clikced node has children
      this.$store.dispatch("registerNewObject", {
        name: this.newObjectStr,
        finished: false,
        parentId: this.clickedNode._id
      });

      this.$modal.hide("addObject");
    },
    generateCollapseId: function( collapseId ) {
      return 'collapse-' + collapseId;
    }
  }
};
</script>

<style scoped>

</style>
