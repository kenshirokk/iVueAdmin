<template>
  <v-ons-page>
    <app-head title="创建代理"></app-head>
    <div >
      <div >
        <form ref="dataForm">
          <v-ons-list>
            <v-ons-list-item label="玩家ID：" prop="id">
              <v-ons-input placeholder="请输入玩家ID" v-model="temp.id" @blur="validateId"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item label="玩家昵称："  >
              <div style="text-align: left;">{{temp.nickname}}</div>
            </v-ons-list-item>
            <v-ons-list-item label="玩家头像：">
              <div style="text-align: left;">
                <a href="javascript:void(0);">
                  <img :src="temp.avatar" class="avatar_80" @click="showUserAavatar()"/>
                </a>

              </div>
            </v-ons-list-item>
            <v-ons-list-item label="设置密码：" prop="password">
              <v-ons-input type="password" placeholder="请输入密码"  v-model="temp.password"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item label="确认密码：" prop="password2">
              <v-ons-input type="password" placeholder="请确认密码"  v-model="temp.password2" ></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item label="手机号：" prop="phoneNo">
              <v-ons-input placeholder="请输入手机号" v-model="temp.phoneNo"></v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-ons-button modifier="large" style="margin: 6px 0" @click="create">保存</v-ons-button>
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
  import { getById } from '@/api/accountsInfo'
  import { getByUserId,create } from '@/api/agency'
  export default {
    name: "create-proxy",
    data(){
      return{
        modalVisible: false,
        temp: {
          id:'',
          nickname:'无',
          avatar: require('@/assets/image/default_avatar.jpg'),
          password:'',
          password2:'',
          phoneNo:''
        }
      }
    },
    methods:{
      validateId(callback) {
        if (/^[1-9]\d*$/.test(this.temp.id) === false) {
          this.$ons.notification.toast('用户ID必须是一个正整数', {timeout: 2000})
          this.modalVisible = false;
        } else {
          getById(this.temp.id).then(response1 => {
            if(response1.data.entity){
              getByUserId(this.temp.id).then(response2 => {
                if(response2.data.entity){
                  this.$ons.notification.toast('这个玩家已经是代理了', {timeout: 2000})
                  this.modalVisible = false;
                  this.temp.avatar =  require('@/assets/image/default_avatar.jpg');
                  this.temp.nickname = '无';
                }else{
                  this.temp.avatar = response1.data.entity.customFace;
                  this.temp.nickname = response1.data.entity.nickName;
                  console.log(callback )
                  if(typeof callback == 'function'){
                    callback();
                  }
                }
              })
            }else{
              this.$ons.notification.toast('玩家不存在', {timeout: 2000})
              this.modalVisible = false;
              this.temp.avatar =  require('@/assets/image/default_avatar.jpg');
              this.temp.nickname = '无';
            }
          })
        }
      },
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
      validatePhone() {
        if(this.temp.phoneNo){
          return true;
        }else {
          this.$ons.notification.toast('请输入手机号', {timeout: 2000})
          return false;
        }
      },
      create(){
        this.modalVisible = true;
        this.validateId(() => {
          if(this.validatePassword() && this.validatePhone()){
            var params = {userId:this.temp.id,password:this.temp.password,phone:this.temp.phoneNo}
            create(params).then(() => {
              this.$ons.notification.toast('创建成功', {timeout: 2000})
              this.temp.id = '';
              this.temp.avatar =  require('@/assets/image/default_avatar.jpg');;
              this.temp.nickname = '无';
              this.temp.password = '';
              this.temp.password2 = '';
              this.temp.phoneNo = '';
              this.modalVisible = false;
            })
          }else{
            this.modalVisible = false;
          }

        })
      }
    }
  }
</script>

<style scoped>

</style>
