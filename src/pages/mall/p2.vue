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
        商品价格
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input v-model="updateData.price">
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        商品数量
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input v-model="updateData.goodsNum">
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
  import {update} from '@/api/mall'

  export default {
    name: "p2",
    computed: {
      ...mapState('mall', ['pageStack', 'updateData'])
    },
    methods: {
      ...mapMutations('mall', ['back']),
      save() {
        update(this.updateData)
          .then(() => {
            Bus.$emit('refreshMallData', this.updateData)
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
