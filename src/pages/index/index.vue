<template>
    <v-ons-page>
      <v-ons-toolbar>
        <div class="left">
          <v-ons-toolbar-button @click="toggleSide">
            <v-ons-icon icon="ion-navicon, material:md-more-vert"></v-ons-icon>
          </v-ons-toolbar-button>
        </div>
        <div class="center">首页</div>
      </v-ons-toolbar>
      this is 首页 page
    </v-ons-page>
</template>

<script>
    import Bus from '@/bus'
    export default {
        name: "index",
        methods:{
          toggleSide() {
            Bus.$emit('toggleSide')
          }
        }
    }
</script>

<style scoped>

</style>
