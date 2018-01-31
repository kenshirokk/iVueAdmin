<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        修改
      </div>
      <div class="left">
        <v-ons-back-button>返回</v-ons-back-button>
      </div>
      <div class="right">
        <v-ons-toolbar-button @click="save">
          <v-ons-icon icon="fa-check"></v-ons-icon>
          保存
        </v-ons-toolbar-button>
      </div>

    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-header>
        参数名称
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          {{updateData.paramName}}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        参数描述
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          {{updateData.paramDesc}}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        参数值
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input v-model="updateData.paramValue">
          </v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import Bus from '@/bus'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import {update} from '@/api/gameConfig'

  export default {
    name: "p2",
    computed: {
      ...mapState('sysGame', ['pageStack', 'updateData'])
    },
    created() {
    },
    methods: {
      ...mapMutations('sysGame', ['back']),
      save() {
        update(this.updateData)
          .then(() => {
            this.$ons.notification.toast("修改成功", {timeout: 2000})
            Bus.$emit('refreshSysGameData', this.updateData)
            this.back()
          })
          .catch(() => {
            console.log('catch')
          })
      }
    }
  }
</script>

<style scoped>

</style>
