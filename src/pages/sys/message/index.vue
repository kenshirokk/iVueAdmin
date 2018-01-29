<template>
  <v-ons-navigator :page-stack="pageStack">
    <component v-for="page in pageStack" :is="page" :key="page.name"
               :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>

<script>
  import P1 from './p1'
  import P2 from './p2'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'

  export default {
    name: "index",
    created() {
      this.push(P1)
    },
    computed: {
      ...mapState('sysMessage', ['pageStack'])
    },
    components: {
      P1, P2
    },
    methods: {
      ...mapMutations('sysMessage', ['push'])
    }
  }
</script>

<style scoped>

</style>
