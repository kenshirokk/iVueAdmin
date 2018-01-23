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
                <v-ons-input placeholder="Input your username" class="input">
                </v-ons-input>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">
                <v-ons-input placeholder="Input your password" class="input" type="password">
                </v-ons-input>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">
                <v-ons-button modifier="large">登录</v-ons-button>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-ons-card>
    </v-ons-page>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .input{
      width:100%
    }
</style>
