<script>
import {test1,test_a} from "@/assets/js/test";
export default {
  name: "tes01",
  data(){ //数据初始化，所有变量放在这里和数据类型都在这里定义
    return {
        url:require("@/assets/logo.png"),
    }
  },
  mounted() { //vue内置函数，文档加载事件
    test1();
    console.log(test_a)
  }
}
</script>

<template>
    <div class="test1">
      hello world
          <img :src="url" alt="">
    </div>

</template>

<style scoped>
@import url("../../assets/css/test.css");

</style>
