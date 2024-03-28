<template>
  <div id="body">
    <el-container>

      <el-header id="body_head">
        <h1 style="color: #2c3e50">小布庄园</h1>
      </el-header>
      <el-main>

        <el-form id="login_form" label-width="100px" :model="loginUser">
          <el-form-item label="用户名:">
            <el-input type="text" name="username" v-model="loginUser.username"></el-input>
          </el-form-item>

          <el-form-item label="密码:">
            <el-input type="text" name="password" v-model="loginUser.password"></el-input>
          </el-form-item>

          <el-form-item label="验证码:">
            <el-input type="text" name="qrCde" v-model="loginUser.qrCde"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-col :span="4">
                <el-button type="primary" @click="login(loginUser)" style="width: 100px">登录</el-button>
              </el-col>
            </el-row>

          </el-form-item>
        </el-form>


      </el-main>
      <el-footer></el-footer>
    </el-container>


  </div>
</template>

<script>
export default {
  // 登录页面
  name: "login",
  data() {
    return {
      loginUser: {
        username: '',
        password: '',
        qrCde: ''
      }
    }
  },
  methods: {
    login(user) {
      console.log(user)
      this.$axios.post('/doc/login?username=' + user.username + '&password=' + user.password, {
        params: user
      })
        .then(res => {
          // 登录成功 跳转首页
          this.$router.push({
            path:'/homePage'
          })
        })
        .catch(err => {
          this.$message.error('登录失败')
        })
    }
  }
}
</script>

<style scoped>
#body {
  background-image: url("../../../static/image/bb9677aa0d90a0fc621d097529f8daf8.jpg");
  width: 100%;
}

#login_form .el-input {
  width: 25rem;
}

#login_form {
  padding-top: 25rem;
  font-weight: bold;
  font-family: 微软雅黑;
  float: right;
}


</style>
