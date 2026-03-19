<script>
export default {
  name: "Page404"
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <button @click="$router.push('/')">返回首页</button>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}
h1 {
  font-size: 100px;
}
button {
  margin-top: 20px;
  padding: 10px 24px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>
