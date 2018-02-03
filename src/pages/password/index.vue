<template>
  <v-ons-page>
    <app-head title="修改密码"></app-head>
    <div >
      <div >
        <form ref="dataForm">
          <v-ons-list>
            <v-ons-list-item label="旧密码：" prop="password">
              <v-ons-input type="password" placeholder="请输入旧密码"  v-model="temp.oldPassword" style=" background-image: none;"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item label="新密码：" prop="password">
              <v-ons-input type="password" placeholder="请输入新密码"  v-model="temp.password" style=" background-image: none;"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item label="确认密码：" prop="password2">
              <v-ons-input type="password" placeholder="请确认新密码"  v-model="temp.password2" style=" background-image: none;"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button modifier="large" style="margin: 6px 0" @click="save">保存</v-ons-button>
            </v-ons-list-item>
          </v-ons-list>
        </form>
      </div>
    </div>
    <v-ons-modal :visible="modalVisible" >
      <p style="text-align: center">
        <v-ons-icon icon="fa-spinner" spin  size="32px"></v-ons-icon>
        <br/>
        <br/>
        <span style="font-size: 14px;">加载中...</span>
      </p>
    </v-ons-modal>
  </v-ons-page>

</template>

<script>
  import { updatePwd } from '@/api/agency'
  import { login } from '@/api/login';
  import {mapGetters} from 'vuex'
  export default {
    name: "create-proxy",
    data(){
      return{
        modalVisible: false,
        temp: {
          id:'',
          oldPassword: '',
          nickname:'无',
          avatar: require('@/assets/image/default_avatar.jpg'),
          password:'',
          password2:'',
          phoneNo:''
        }
      }
    },
    methods:{
      ...mapGetters(['getLoginUser']),
      validatePassword() {
        if(!this.temp.password){
          this.$ons.notification.toast('请输入密码', {timeout: 2000})
        }else if(!this.temp.password2) {
          this.$ons.notification.toast('请输入确认密码', {timeout: 2000})
        }else if(this.temp.password == this.temp.password2){
          return true;
        }else{
          this.$ons.notification.toast('两次密码不一致', {timeout: 2000})
          return false
        }
      },
      save(){
        this.modalVisible = true;

        if(this.validatePassword()){
          login(this.getLoginUser().id,this.temp.oldPassword).then(response => {
            var params = {password:this.temp.password}
            updatePwd(params).then(() => {
              this.$ons.notification.toast('修改成功', {timeout: 2000})
              this.temp.id = '';
              this.temp.avatar =  require('@/assets/image/default_avatar.jpg');;
              this.temp.nickname = '无';
              this.temp.password = '';
              this.temp.password2 = '';
              this.temp.oldPassword = '';
              this.modalVisible = false;
            })
          }).catch(() => {
            this.modalVisible = false
          })
        }else{
          this.modalVisible = false;
        }

      }
    }
  }
</script>

<style scoped>

</style>
