<script>
export default {
  name: "Image",
  data() {
    return {
      imageUrl: "",
      analyzing: false,

      // 模拟模型识别结果
      visionResult: {
        category: "轻薄笔记本",
        style: ["商务", "简约"],
        attributes: ["14英寸", "银色", "金属机身"]
      },

      // 用户确认后的语义
      userConfirm: {
        forStudent: true,
        forOffice: true,
        priceRange: "4000-6000"
      },

      // 推荐结果
      recommendList: []
    }
  },
  methods: {
    handleUpload(file) {
      // 本地预览（不上传）
      this.imageUrl = URL.createObjectURL(file.raw)
      this.analyzing = true

      // 模拟视觉模型分析
      setTimeout(() => {
        this.analyzing = false
      }, 1200)
    },

    doRecommend() {
      // 模拟推荐结果
      this.recommendList = [
        {
          id: 1,
          name: "ThinkBook 14 2024",
          price: 4899,
          reason: "与图像特征和用户需求高度匹配"
        },
        {
          id: 2,
          name: "RedmiBook Pro 14",
          price: 5299,
          reason: "同属轻薄本品类，价格略高但性能更优"
        },
        {
          id: 3,
          name: "MateBook D14",
          price: 4999,
          reason: "办公与学生用户常选型号"
        }
      ]
    }
  }
}
</script>
<template>
  <div class="image-search-page">
    <el-card class="block">
      <h2>图片搜索商品</h2>
      <p class="sub">
        上传商品图片，系统将自动解析视觉语义并结合知识图谱进行推荐
      </p>

      <!-- 上传 -->
      <el-upload
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleUpload"
      >
        <el-button type="primary" icon="el-icon-upload">
          上传图片
        </el-button>
      </el-upload>

      <!-- 图片预览 -->
      <div v-if="imageUrl" class="preview">
        <img :src="imageUrl" />
      </div>
    </el-card>

    <!-- 视觉语义解析 -->
    <el-card v-if="imageUrl" class="block">
      <h3>视觉语义解析结果</h3>

      <div v-if="analyzing" class="loading">
        正在分析图片中的商品特征...
      </div>

      <div v-else>
        <p>
          识别类别：
          <el-tag type="success">{{ visionResult.category }}</el-tag>
        </p>

        <p>
          风格特征：
          <el-tag
            v-for="(s,i) in visionResult.style"
            :key="i"
            type="info"
          >
            {{ s }}
          </el-tag>
        </p>

        <p>
          关键属性：
          <el-tag
            v-for="(a,i) in visionResult.attributes"
            :key="i"
            type="warning"
          >
            {{ a }}
          </el-tag>
        </p>
      </div>
    </el-card>

    <!-- 用户语义确认 -->
    <el-card v-if="!analyzing && imageUrl" class="block">
      <h3>需求再次确认</h3>

      <el-form label-width="100px">
        <el-form-item label="适用人群">
          <el-checkbox v-model="userConfirm.forStudent">学生</el-checkbox>
          <el-checkbox v-model="userConfirm.forOffice">办公</el-checkbox>
        </el-form-item>

        <el-form-item label="价格区间">
          <el-select v-model="userConfirm.priceRange" placeholder="请选择">
            <el-option label="3000-4000" value="3000-4000" />
            <el-option label="4000-6000" value="4000-6000" />
            <el-option label="6000-8000" value="6000-8000" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="doRecommend"
      >
        基于语义进行推荐
      </el-button>
    </el-card>

    <!-- 推荐结果 -->
    <el-card v-if="recommendList.length" class="block">
      <h3>推荐结果</h3>

      <el-row :gutter="20">
        <el-col
          v-for="item in recommendList"
          :key="item.id"
          :span="8"
        >
          <el-card shadow="hover" class="product-card">
            <img src="http://localhost:8080/static/image/img2.png" />
            <h4>{{ item.name }}</h4>
            <p class="price">¥{{ item.price }}</p>
            <p class="reason">推荐理由：{{ item.reason }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<style scoped>
@import "../../assets/css/image.css";
</style>
