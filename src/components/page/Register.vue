<script>
import axios from "axios"
export default {
  name: "Register",
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="title">用户注册</h2>

      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="registerForm.username" />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="registerForm.email" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="registerForm.password"
            type="password"
            show-password
          />
        </el-form-item>

        <el-button type="success" class="btn" @click="handleRegister">
          注册
        </el-button>

        <div class="footer">
          <span @click="goLogin">已有账号？返回登录</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
