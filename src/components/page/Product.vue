<script>
export default {
  name: "Product",
  data() {
    return {
      product: {
        name: "ThinkBook 14 轻薄笔记本",
        price: 4899,
        brand: "Lenovo",
        image: "https://picsum.photos/400/300",
        description: "适合学生与办公人群的高性价比轻薄本",
        attributes: ["轻薄", "学生", "办公", "性价比"],
        reasons: [
          "属于【轻薄本】品类",
          "适合【学生用户】使用",
          "与当前搜索需求语义高度匹配"
        ]
      },
      similarProducts: [
        { id: 1, name: "RedmiBook Pro 14", price: 5299 },
        { id: 2, name: "MateBook D14", price: 4999 }
      ]
    }
  },
  methods: {
    goToGraph() {
      this.$router.push("/knowledge")
    }
  }
}
</script>

<template>
  <div class="detail-container">
    <el-row :gutter="30">
      <!-- 左侧图片 -->
      <el-col :span="10">
        <el-card>
          <img :src="product.image" class="product-img" />
        </el-card>
      </el-col>

      <!-- 右侧信息 -->
      <el-col :span="14">
        <h2>{{ product.name }}</h2>
        <p class="price">￥{{ product.price }}</p>

        <p class="desc">{{ product.description }}</p>

        <div class="attr">
          <span>标签：</span>
          <el-tag
            v-for="(a,i) in product.attributes"
            :key="i"
            type="success"
          >
            {{ a }}
          </el-tag>
        </div>

        <el-divider></el-divider>

        <div class="reason">
          <h4>推荐理由（知识图谱推理）</h4>
          <ul>
            <li v-for="(r,i) in product.reasons" :key="i">
              ✔ {{ r }}
            </li>
          </ul>
        </div>

        <el-button
          type="primary"
          icon="el-icon-share"
          @click="goToGraph"
        >
          查看商品知识图谱
        </el-button>
      </el-col>
    </el-row>

    <el-divider></el-divider>

    <!-- 相似商品 -->
    <h3>相似商品推荐</h3>
    <el-row :gutter="20">
      <el-col
        v-for="item in similarProducts"
        :key="item.id"
        :span="6"
      >
        <el-card shadow="hover">
          <h4>{{ item.name }}</h4>
          <p class="price">￥{{ item.price }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 30px;
  background: #f5f7fa;
}

.product-img {
  width: 100%;
  border-radius: 10px;
}

.price {
  color: #f56c6c;
  font-size: 22px;
  font-weight: bold;
  margin: 10px 0;
}

.desc {
  color: #666;
  margin-bottom: 15px;
}

.attr .el-tag {
  margin-right: 6px;
}

.reason ul {
  padding-left: 20px;
  color: #555;
}
</style>
