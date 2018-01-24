<template>
    <v-ons-page>
      <v-ons-splitter>
        <side-menu></side-menu>

        <v-ons-splitter-content>
          <router-view></router-view>
        </v-ons-splitter-content>
      </v-ons-splitter>
    </v-ons-page>
</template>

<script>
    import SideMenu from '@/components/side-menu'

    export default {
        name: "index",
        components:{
          SideMenu
        }
    }
</script>

<style scoped>

</style>
