<script>
import axios from "axios"

export default {
  name: "Login",
  data() {
    return {
      // 当前登录方式：password / captcha
      loginType: "password",
      captchaBtnText: "获取验证码",
      captchaDisabled: false,
      userInfo: {
        username: '',
        password: '',
        email: '',
        captcha: '',
      },
    }
  },
  methods:{
    //密码登录
    login(){
      console.log("正在登录");
      //定义一个请求参数
      const ps = {
        "username": this.userInfo.username,
        password: this.userInfo.password,
      };
      console.log(ps);
      // 存储vue的this 对象
      let _this = this;
      //  定义一个Ajax请求
      this.$http.post("http://localhost:8000/login",ps)
        .then(res => {
          //请求成功
          console.log(res.data);
          if (res.data.code === 200){
            //登录成功
            //提示信息
            _this.$message.success("登录成功")
            // 获取服务器传来的user_id，存入到本地存储中
            const user_id = res.data.data
            localStorage.setItem("user_id", user_id)
            _this.$router.push("/home") // 跳转到首页
          }else{
            //登录失败
            //提示信息
            _this.$message.error(res.data.data);
          }
        })
    },
    //验证码发送
    sendCaptcha() {
      // 定义一个请求参数
      const ps = {"email":this.userInfo.email}
      const _this = this
      // 定义一个ajax请求
      this.$http.post('http://localhost:8000/captcha_send', ps)
        .then(res => {
          // 请求成功
          if (res.data.code === 200){
            _this.$message.success("发送成功")
          }
          else{
            _this.$message.error(res.data.message)
          }
        })

    },
    // 验证码登录
    loginCaptcha() {
      // 定义一个请求参数
      const ps = {"email":this.userInfo.email, "captcha":this.userInfo.captcha}
      const _this =this
      // 创建ajax请求
      this.$http.post('http://localhost:8000/captcha_login', ps)
        .then(function (res) {
          console.log(res.data)
          console.log(res.data.code)
          if (res.data.code === 200){
            _this.$message.success("登录成功")
            // 获取服务器传来的user_id，存入到本地存储中
            const user_id = res.data.data
            localStorage.setItem("user_id", user_id)
            _this.$router.push("/home") // 跳转到首页
          }
          else{
            _this.$message.error(res.data.message)
          }
        })
    },
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">电商商品语义推荐系统</h2>

      <!-- 登录方式切换 -->
      <el-radio-group v-model="loginType" class="login-type">
        <el-radio-button label="password">密码登录</el-radio-button>
        <el-radio-button label="captcha">验证码登录</el-radio-button>
      </el-radio-group>

      <!-- 密码登录 -->
      <el-form v-if="loginType === 'password'">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="userInfo.password"
            type="password"
            show-password
          />
        </el-form-item>

        <el-button type="primary" class="btn" @click="login">
          登录
        </el-button>
      </el-form>

      <!-- 验证码登录 -->
      <el-form v-else>
      <el-form-item label="邮箱">
        <el-input
          v-model="userInfo.email"
          placeholder="请输入邮箱"
        />
      </el-form-item>

      <el-form-item label="验证码">
        <el-input
          v-model="userInfo.captcha"
          placeholder="请输入验证码"
        >
          <template slot="append">
            <el-button
              type="primary"
              :disabled="captchaDisabled"
              @click="sendCaptcha"
            >
              {{ captchaBtnText }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-button type="primary" class="btn" @click="loginCaptcha">
        登录
      </el-button>
    </el-form>

      <div class="footer">
        <span>没有账号？立即注册</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/login.css";
</style>
