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
          <div style="width: 25%">
            月份
          </div>
          <div style="width: 50%">
            金额
          </div>
          <div style="width: 25%">
            操作
          </div>
        </v-ons-list-item>

        <v-ons-list-item  v-for="item in tableData" :key="item.month">
          <div style="width: 25%">
            {{item.month}}月
          </div>
          <div style="width: 50%">
            {{item.money}}
          </div>
          <div  style="width: 25%">
            <router-link :to="'/account/detail/'+year+'/'+item.month" >
              <v-ons-button modifier="outline"  class="btn">详情</v-ons-button>
            </router-link>
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
        state: 'initial',
        year:''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(done) {
        this.loading = true;
        this.year = new Date().getFullYear();
        getMoneyFlowVO(this.year).then(response => {
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
  .btn {
    max-width: 60px;
    font-size: 12px;
  }
</style>
