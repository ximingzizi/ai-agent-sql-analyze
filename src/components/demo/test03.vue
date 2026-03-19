<script>

export default {
  name: "test03",
  data() {
    return {
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
        .then(function (res){
          //请求成功
          console.log(res.data);
          if (res.data.code === 200){
            //登录成功
            //提示信息
            _this.$message.success("登录成功");
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
        .then(function (res) {
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
          }
          else{
            _this.$message.error(res.data.message)
          }
        })
    }
  }
}
</script>

<template>
  <div>
    <div>
    <h1>用户登录</h1>
    用户名：<el-input v-model="userInfo.username" placeholder="请输入用户名"></el-input>
    密码：<el-input v-model="userInfo.password" placeholder="请输入密码" show-password></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="login">登录</el-button>
    <!-- 验证码登录 -->
    <h1>验证码登录</h1>
    邮箱：<el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
    验证码：<el-input v-model="userInfo.captcha" placeholder="请输入验证码" show-password></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="sendCaptcha">发送验证码</el-button>
    <el-button type="primary" style="margin-top: 15px" @click="loginCaptcha">邮箱登录</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
