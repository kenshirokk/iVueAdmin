<template>
  <v-ons-toolbar>

    <div class="center" >
      {{title}}
    </div>
    <div class="left" >
      <v-ons-toolbar-button @click="toggleSide">
        <v-ons-icon icon="ion-navicon"></v-ons-icon>
      </v-ons-toolbar-button>
    </div>
    <div class="right">
      <slot></slot>
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
