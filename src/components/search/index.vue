<template>
  <v-ons-dialog cancelable :visible.sync="visible"  @posthide="close()">
    <v-ons-list>
      <v-ons-list-item v-for="item in list">
        <v-ons-input :placeholder="item.placeholder" :name="item.name" v-model="temp[item.name]"></v-ons-input>
      </v-ons-list-item>
      <v-ons-list-item   >
        <v-ons-button style="margin: 0 auto" @click="search">查询</v-ons-button>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-dialog>
</template>

<script>
    export default {
        name: "index",
        props: ['visible','list','temp'],
        methods:{
          search(){
            this.$emit("change-params",this.temp);
          },
          close(){
            this.$emit('update:visible', false)
          }
        }
    }
</script>

<style scoped>

</style>
