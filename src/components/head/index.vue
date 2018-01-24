<template>
  <v-ons-toolbar>

    <div class="center" style="text-align: center">
      <div class="left" style="position: fixed">
        <v-ons-toolbar-button @click="toggleSide">
          <v-ons-icon icon="ion-navicon"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      {{title}}
    </div>
  </v-ons-toolbar>
</template>

<script>
    import Bus from '@/bus'

    export default {
        name: "index",
        props: ['title'],
        methods:{
          toggleSide() {
            Bus.$emit('toggleSide')
          }
        }
    }
</script>

<style scoped>

</style>
