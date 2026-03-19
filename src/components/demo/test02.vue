<script>
export default {
  name: "test02",
  data(){
    return {
      msg:"hello",
      html:`<div>
      <a href="https://www.baidu.com">百度一下</a>
    </div>`,
      url:"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
      student:{
        name:"张三",
        age:18,
        hobby:["打游戏","看电影"],
        xueli:"本科",
        remark:"无"
      },
      isshow:true,
      json_list:[
        {name:"张三",age:18,score:90}
        ,{name:"王五",age:28,score:80}
        ,{name:"李四  ",age:15,score:70}
      ],
    }
  },
  methods:{
    // 自定义函数
    show(){
      this.msg = "hello world"
      console.log(this.msg)
    }
  },
  mounted() {
    //页面加载时运行，vue内置的钩子函数
    console.log("页面加载")

  }

}
</script>

<template>
  <div>
<!--    文本绑定，采用{{变量名}}-->
    <button type="button" @click="show()">点击 </button>
    <h1 v-show="isshow">{{msg}}</h1>
<!--    html绑定，在标签加v-html-->
    <div v-html="html"> </div>
<!--    绑定属性 针对非表单元素 给属性前方加一个: -->
    <img :src="url">
    <br>
<!--    表单元素 使用v-model定义属性-->
    姓名：<input type="text" v-model="student.name">
    <br>
    年龄：<input type="radio" value="18" v-model="student.age">18 <input type="radio" value="18以上" v-model="student.age">18以上
    <br>
    爱好: <input type="checkbox" value="打游戏" v-model="student.hobby"> 打游戏 <input type="checkbox" value="看电影" v-model="student.hobby"> 看电影
    <br>
    学历:<select v-model = "student.xueli">
          <option value="">选择学历</option>
          <option value="本科">本科</option>
          <option value="硕士">硕士</option>
          <option value="博士">博士</option>
        </select>
    <br>
    备注: <textarea v-model="student.remark" cols="10" rows="5"></textarea>

    <!--  列表循环-->
    <table border="1" width="500">
      <thead>
        <th>姓名</th>
        <th>年龄</th>
      </thead>
      <tbody>
        <tr v-for="x in json_list">
          <td> {{x.name}}</td>
          <td> {{x.age}}</td>
          <td>
            <span v-if="x.score>=80">优</span>
            <span v-else-if="x.score>60 && x.score<80">良</span>
            <span v-else>差</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
