<template>
    <v-ons-page>
      <app-head title="业绩查询"></app-head>
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
          <div style="width: 25%">
            月份
          </div>
          <div style="width: 25%">
           一级返利
          </div>
          <div style="width: 25%">
            二级返利
          </div>
          <div style="width: 25%">
            总返利
          </div>
        </v-ons-list-item>

        <v-ons-list-item  v-for="item in tableData" :key="item.month">
          <div style="width: 25%">
            {{item.month}}月
          </div>
          <div style="width: 25%">
            {{item.levelOneMoney}}
          </div>
          <div style="width: 25%">
            {{item.levelTwoMoney}}
          </div>
          <div style="width: 25%">
            {{item.levelOneMoney + item.levelTwoMoney}}
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
</template>

<script>
  import { getPerformanceVO} from '@/api/report'
  export default {
    name: 'performance',
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
        getPerformanceVO(new Date().getFullYear()).then(response => {
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
