<template>
  <v-ons-navigator :page-stack="pageStack">
    <component v-for="page in pageStack" :is="page" :key="page.name"
               :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>

<script>
  import P1 from './p1'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    name: "index",
    created() {
      this.push(P1)
    },
    beforeDestroy() {
      this.empty()
    },
    computed: {
      ...mapState('player', ['pageStack'])
    },
    components: {
      P1
    },
    methods: {
      ...mapMutations('player', ['push', 'empty'])
    }
  }
</script>

<style scoped>

</style>
