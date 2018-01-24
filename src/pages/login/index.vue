<template>
    <v-ons-page>
      <v-ons-card>
        <div class="title">
          后台管理系统
        </div>
        <div class="content">
          <v-ons-list>
            <v-ons-list-item>
              <div class="center">
                <v-ons-input placeholder="请输入用户名" class="input" v-model="username">
                </v-ons-input>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">
                <v-ons-input placeholder="请输入里面" class="input" type="password" v-model="password">
                </v-ons-input>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">
                <v-ons-button modifier="large" @click="login">登录</v-ons-button>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-ons-card>
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
    import { login,getInfo } from '@/api/login'
    import { mapMutations } from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: "index",
        data() {
          return {
            username: '',
            password: '',
            modalVisible: false
          }
        },
        methods: {
          ...mapMutations('auth',['setLoginUser']),
          login(){
            if(!this.username){
              this.$ons.notification.toast('请输入用户名', {timeout: 2000})
            }else if(!this.password){
              this.$ons.notification.toast('请输入密码', {timeout: 2000})
            }else{
              this.modalVisible = true;
              login(this.username,this.password).then(response => {
                console.log(response)
                getInfo().then(response => {
                  this.modalVisible = false
                  this.$router.push('/index')
                })
              }).catch(() => {
                this.modalVisible = false
              })
            }
          }
        }
    }
</script>

<style scoped>
    .input{
      width:100%
    }
</style>
