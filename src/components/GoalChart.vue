<template>
  <div class="mb-4">
    <b-card-group deck>
    <b-card
      title="Be Good Programmer"
      sub-title="Be skillful programmer enough to work as professional."
      tag="Goal"
      class="mb-2"
    >
      <b-card-text>Needed Skills</b-card-text>
      <b-card title="Business Analysitics skills" sub-title="REBOK I guess.">
        <b-icon-arrow-down-short v-b-toggle.collapse-1 class="h3" />
        <b-collapse id="collapse-1" class="mb-2">
          <b-card title="Learn Group Facilitation Skill" sub-title="Goup">
            <b-icon-arrow-down-short v-b-toggle.collapse-1-1 class="h3" />
            <b-collapse id="collapse-1-1" class="mb-2">
              <b-card
                title="Read Business Analystic Vol.2"
                sub-title="Read'em All"
              >
              </b-card>
              <b-card
                title="Read Business Analystic Vol.2"
                sub-title="Read'em All"
              >
              </b-card>
              
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-card>

      <b-card title="Soft skilz, mate" sub-title="REBOK I guess."></b-card>

      <b-card title="Business Analysitics skills" sub-title="REBOK I guess."></b-card>
    </b-card>
        <b-card
      title="Be Good Programmer"
      sub-title="Be skillful programmer enough to work as professional."
      tag="Goal"
      class="mb-2"
    >
      <b-card-text>Needed Skills</b-card-text>
      <b-card title="Business Analysitics skills" sub-title="REBOK I guess.">
        <b-icon-arrow-down-short v-b-toggle.collapse-1 class="h3" />
        <b-collapse id="collapse-1" class="mb-2">
          <b-card title="Learn Group Facilitation Skill" sub-title="Goup">
            <b-icon-arrow-down-short v-b-toggle.collapse-1-1 class="h3" />
            <b-collapse id="collapse-1-1" class="mb-2">
              <b-card
                title="Read Business Analystic Vol.2"
                sub-title="Read'em All"
              >
              </b-card>
              <b-card
                title="Read Business Analystic Vol.2"
                sub-title="Read'em All"
              >
              </b-card>
              
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-card>

      <b-card title="Soft skilz, mate" sub-title="REBOK I guess."></b-card>

      <b-card title="Business Analysitics skills" sub-title="REBOK I guess."></b-card>
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
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border: 2px solid Black;
  border-collapse: collapse;
  table-layout: fixed;
}

thead th {
  padding: 10px 5px;
  font: 1.5em sans-serif, bold;
}

tbody tr:nth-child(odd) {
  background-color: LightGrey;
}

tbody tr:nth-child(even) {
  background-color: White;
}

tbody tr {
  padding: 5px 3px;
  font: 1.2em serif;
}
</style>
