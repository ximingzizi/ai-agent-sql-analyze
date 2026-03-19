<script>
import * as echarts from "echarts"

export default {
  name: "Knowledge",
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // 示例：从路由或商品页传过来的 product_id
    const productId = this.$route.query.product_id || "P001"
    this.initGraph(productId)
  },
  methods: {
    getProductGraph(productId) {
      return this.$http.post("http://localhost:8000/graph", {"question": productId})
    },
    async initGraph(productId) {
      const res = await this.getProductGraph(productId)
      const graph = res.data

      this.chart = echarts.init(this.$refs.graph)

      this.chart.setOption({
        tooltip: {},
        series: [{
          type: "graph",
          layout: "force",
          roam: true,
          draggable: true,
          label: { show: true },
          force: { repulsion: 400,
            gravity: 0.2,
            edgeLength: [120, 250]
          },

          data: graph.nodes.map(n => ({
            id: n.id,
            name: n.properties.title || n.properties.name,
            category: n.label
          })),

          links: graph.links.map(l => ({
            source: l.source,
            target: l.target,
            label: {
              show: true,
              formatter: l.type
            }
          }))
        }]
      })
    }
  }
}
</script>

<template>
  <div class="kg-page">
    <el-card>
      <h2>商品知识图谱与语义推理关系展示</h2>
      <p class="tip">
        图中展示了商品、品牌、品类、属性与用户需求之间的关系，用于支撑推荐解释。
      </p>
      <div ref="graph" class="graph"></div>
    </el-card>
  </div>
</template>

<style scoped>
.kg-page {
  padding: 30px;
  background: #f4f6f9;
}

.graph {
  width: 100%;
  height: 600px;
}

.tip {
  color: #888;
  margin-bottom: 10px;
}
</style>
