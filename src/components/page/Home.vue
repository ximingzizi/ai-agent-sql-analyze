<script>

export default {
  name: "Home",
  data() {
    return {
      activeMenu: "home",
      keyword: "",
      imageFile: null,
      goodsList: [
        {
          id: 1,
          name: "ThinkBook 14 轻薄本",
          price: 4899,
          image: "http://localhost:8080/static/image/img.png",
          brand: "ThinkBook",
          category: "笔记本电脑",
          attributes: ["轻薄", "学生", "性价比高"],
          reasons: ["高性价比", "学生用户常选"]
        },
        {
          id: 2,
          name: "RedmiBook Pro 14",
          price: 5299,
          image: "http://localhost:8080/static/image/img.png",
          brand: "Redmi",
          category: "笔记本电脑",
          attributes: ["办公性能均衡", "高续航"],
          reasons: ["办公性能好", "轻便"]
        },
        {
          id: 3,
          name: "华为 MateBook D14",
          price: 4999,
          image: "http://localhost:8080/static/image/img.png",
          brand: "华为",
          category: "笔记本电脑",
          attributes: ["便携", "学生推荐"],
          reasons: ["便携轻薄", "学生常选"]
        },
        {
          id: 4,
          name: "Apple MacBook Air M2",
          price: 8999,
          image: "http://localhost:8080/static/image/img.png",
          brand: "Apple",
          category: "笔记本电脑",
          attributes: ["轻薄", "高性能", "办公/娱乐"],
          reasons: ["性能强", "颜值高"]
        },
        {
          id: 5,
          name: "Apple MacBook Air M2",
          price: 8999,
          image: "http://localhost:8080/static/image/img.png",
          brand: "Apple",
          category: "笔记本电脑",
          attributes: ["轻薄", "高性能", "办公/娱乐"],
          reasons: ["性能强", "颜值高"]
        },
        {
          id: 6,
          name: "Apple MacBook Air M2",
          price: 8999,
          image: "http://localhost:8080/static/image/img.png",
          brand: "Apple",
          category: "笔记本电脑",
          attributes: ["轻薄", "高性能", "办公/娱乐"],
          reasons: ["性能强", "颜值高"]
        },
        {
          id: 7,
          name: "Apple MacBook Air M2",
          price: 8999,
          image: "http://localhost:8080/static/image/img.png",
          brand: "Apple",
          category: "笔记本电脑",
          attributes: ["轻薄", "高性能", "办公/娱乐"],
          reasons: ["性能强", "颜值高"]
        },
        {
          id: 8,
          name: "Apple MacBook Air M2",
          price: 8999,
          image: "http://localhost:8080/static/image/img.png",
          brand: "Apple",
          category: "笔记本电脑",
          attributes: ["轻薄", "高性能", "办公/娱乐"],
          reasons: ["性能强", "颜值高"]
        }
      ],

      loading: false
    }
  },
  created() {
    if (!localStorage.getItem("user_id")) {
      this.$router.push("/")
    }
    this.loadRecommend()
  },
  methods: {
    /* ========== 首页推荐 ========== */
    async loadRecommend() {
      this.loading = true
      // try {
      //   const res = await this.$http.get(
      //     "http://localhost:8000/recommend"
      //   )
      //   this.goodsList = res.data.data
      // } catch (e) {
      //   this.$message.error("加载失败")
      // } finally {
      //   this.loading = false
      // }

    },

    /* ========== 商品搜索 ========== */
    async textSearch() {
      if (!this.keyword) return
      this.loading = true
      try {
        const res = await this.$http.post(
          "http://localhost:8000/chat",
          { "question": this.keyword }
        )
        console.log(res.data.data)
        // this.goodsList = res.data.data
      } catch (e) {
        this.$message.error("搜索失败")
      } finally {
        this.loading = false
      }
    },

    /* ========== 菜单切换 ========== */
    handleMenu(key) {
      this.activeMenu = key
      if (key === "home") this.loadRecommend()
      if (key === "image") this.$router.push("/image")
      if (key === "chat") this.$router.push("/chat")
      if (key === "knowledge") this.$router.push("/knowledge")
    },
    goDetail(item) {
      // 跳转到商品详情页，携带商品 id
      this.$router.push({
        path: "/product",
        query: { id: item.id }
      })
    },

    logout() {
      localStorage.removeItem("user_id")
      this.$router.push("/")
    }
  }
}
</script>

<template>
  <div class="page">
    <!-- 顶部导航 -->
    <div class="top-nav">
      <div class="nav-left">SmartShop</div>

      <el-input
        v-model="keyword"
        placeholder="搜索你感兴趣的商品"
        class="nav-search"
      >
        <template slot="append">
          <el-button type="primary" @click="textSearch">搜索</el-button>
        </template>
      </el-input>

      <div class="nav-right">
        <span class="user">你好，用户</span>
        <el-button type="text" @click="logout">退出</el-button>
      </div>
    </div>

    <!-- Banner -->
    <div class="banner">
      <h2>多模态智能推荐 · 更懂你的商品</h2>
      <p>基于机器视觉与知识图谱的电商推荐系统</p>
    </div>

    <!-- 主体 -->
    <div class="content">
      <!-- 左侧菜单 -->
      <div class="side">
        <div class="menu-item" @click="handleMenu('home')">首页推荐</div>
        <div class="menu-item" @click="handleMenu('image')">图片搜索</div>
        <div class="menu-item" @click="handleMenu('chat')">文本搜索</div>
        <div class="menu-item" @click="handleMenu('knowledge')">知识图谱</div>
      </div>

      <!-- 商品区 -->
      <div class="goods">
        <div
          class="goods-card"
          v-for="item in goodsList"
          :key="item.id"
          @click="goDetail(item)"
        >
          <img :src="item.image" />
          <div class="name">{{ item.name }}</div>
          <div class="price">¥{{ item.price }}</div>
          <div class="reason">
            推荐理由：{{ item.reasons.join("、") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/css/home.css");
</style>

