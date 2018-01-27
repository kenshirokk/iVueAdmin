<template>
    <v-ons-page>
      <app-head title="流水查询"></app-head>
      <v-ons-pull-hook
        :action="getList"
        @changestate="state = $event.state"
        threshold-height="-1px;"
      >
        <span v-show="state === 'initial'"> 下拉刷新...</span>
        <span v-show="state === 'preaction'"> 松开刷新... </span>
        <v-ons-progress-circular v-show="state === 'action'" indeterminate></v-ons-progress-circular>
      </v-ons-pull-hook>
      <v-ons-list>
        <v-ons-list-item >
          <div style="width: 50%">
            月份
          </div>
          <div style="width: 50%">
            金额
          </div>
        </v-ons-list-item>

        <v-ons-list-item  v-for="item in tableData" :key="item.month">
          <div style="width: 50%">
            {{item.month}}月
          </div>
          <div style="width: 50%">
            {{item.money}}
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
</template>

<script>
  import { getMoneyFlowVO} from '@/api/report'
  export default {
    name: 'account',
    data() {
      return {
        tableData: [],
        loading: false,
        state: 'initial'
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(done) {
        this.loading = true;
        getMoneyFlowVO(new Date().getFullYear()).then(response => {
          this.loading = false;
          this.tableData = response.data.list
          if(done){
            done()
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
