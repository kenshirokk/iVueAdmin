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
        标题
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          {{updateData.title}}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        内容
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input v-model="updateData.content">
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        注释
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input v-model="updateData.desc">
          </v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
  import Bus from '@/bus'
  import {update} from '@/api/bulletin'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    name: "p2",
    computed: {
      ...mapState('sysMessage', ['pageStack', 'updateData'])
    },
    methods: {
      ...mapMutations('sysMessage', ['back']),
      save() {
        update(this.updateData).then(() => {
          this.$ons.notification.toast("修改成功", {timeout: 2000})
          Bus.$emit('refreshSysMessageData', this.updateData)
          this.back()
        })
      }
    }
  }
</script>

<style scoped>

</style>
