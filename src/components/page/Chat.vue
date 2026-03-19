<script>
import {marked} from "marked"
import DOMPurify from "dompurify";

export default {
  name: "Chat",
  data() {
    return {
      userInput: "", // 用户输入
      loading: false, // 加载中
      stopSend: false, // 禁用发送按钮
      userAvatar: "http://localhost:8080/static/avatar/2.png", // 默认头像
      assistantAvatar: "http://localhost:8080/static/avatar/1.png", // AI头像
      historyList: [
        {
          id: -1,
          title: "欢迎来到智能商品推荐助手",
          messages: []
        }
      ], // 历史记录
      activeHistoryIndex: -1, // 当前选中的历史记录索引
      quickMessages: [  // 快捷消息
        "推荐几款高性能、性价比高的手机",
        "和 iPhone 15 Pro 类似的商品有哪些？",
        "推荐几款与 iPhone 15 Pro 在核心属性上相似的商品"
      ],
      // messages: [   // 对话消息
      //   {
      //     role: "assistant",
      //     type: "text",
      //     content: "您好，我是智能商品语义推荐助手，请告诉我您的购物需求ღ( ´･ᴗ･` )"
      //   }
      // ]
    }
  },
  computed:{
    currentChat(){ // 查找聊天
      console.log("查找聊天")
      return this.historyList.find(item => item.id === this.activeHistoryIndex) || {messages: []}
    }
  },
  methods: {
    isOpen(){ // 判断输入框是否为空
      if (this.userInput.trim()) {
        this.stopSend = false
      } else {
        this.stopSend = true
      }
    },
    // 发送消息
    sendMessage() {
      if (!this.userInput.trim()) return // 判断输入为空
      // 添加消息
      const query = this.userInput
      // 用户消息
      this.currentChat.messages.push({
        role: "user",
        type: "text",
        content: query
      });
      // 更新标题
      console.log(this.currentChat)
      this.currentChat.title = this.currentChat.messages[0].content.substring(0, 10)
      this.userInput = ""
      this.loading = true
      let _this = this
      const user_id = localStorage.getItem("user_id");
      const ps = {"user_id": user_id, "question": query}
      // ===== 模拟后端 =====
      setTimeout(() => {
        const mockSemantic = {
          category: "笔记本电脑",
          attributes: ["轻薄", "学生", "性价比", "办公"]
        }
        const mockProducts = [
          {
            id: 1,
            name: "ThinkBook 14 轻薄本",
            price: 4899,
            image: "https://picsum.photos/id/6/300/300",
            reasons: ["轻薄", "学生用户常选", "性价比高"]
          },
          {
            id: 2,
            name: "RedmiBook Pro 14",
            price: 5299,
            image: "http://localhost:8080/static/image/img1.png",
            reasons: ["办公性能均衡", "高续航"]
          },
          {
            id: 3,
            name: "MateBook D14",
            price: 4999,
            image: "http://localhost:8080/static/image/img2.png",
            reasons: ["便携", "学生推荐"]
          }
        ]

        // 语义解析结果
        this.currentChat.messages.push({
          role: "assistant",
          type: "semantic",
          semantic: mockSemantic
        })

        // 推荐商品结果
        this.currentChat.messages.push({
          role: "assistant",
          type: "product",
          products: mockProducts
        })
        this.$http.post("http://localhost:8000/chat", ps)
          .then(function (res) {
            // 关闭AI加载中
            _this.loading = false
            if (res.data.code === 200) {
              // 流式输出答案''
              _this.streamReply(res.data.data);
              // 清空输入框
              _this.userInput = ""
              // 禁用发送按钮
              _this.stopSend = true;
            }
          })
      }, 800)
    },
    // 流式输出答案
    streamReply(fullText) {
      let i = 0;
      const reply = {
        role: "assistant",
        type: "text",
        content: ""
      };
      // 添加回复
      this.currentChat.messages.push(reply);
      // 定时器模拟流式输出
      const interval = setInterval(() => {
        // 输出一个字符
        if (i < fullText.length) {
          reply.content += fullText[i];
          i++;
          this.$forceUpdate();
          this.scrollToBottom();
        } else {
          clearInterval(interval);
        }
      }, 100);
    },
    scrollToBottom() {
      // 滚动到底部
      this.$nextTick(() => {
        const container =
          (this.$refs.chatContainer && this.$refs.chatContainer.$el) ||
          this.$refs.chatContainer;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
      })
    },
    // 格式化Markdown
    formatMessage(content) {
      // 使用marked 解析Markdown并净化 HTML
      return DOMPurify.sanitize(marked.parse(content || ""))
    },
    // 加载历史会话

    loadHistory(id) {
      this.activeHistoryIndex = id;
      console.log(this.currentChat)
      // console.log(this.historyList)
    },
    // 新建会话
    newConversation() {
      const id = Date.now() // 获取当前时间戳作为会话ID
      this.historyList.unshift({
        id,
        title: "新会话",
        messages: []
      })
      this.userInput = ""
      this.activeHistoryIndex = id
    },
    // 快捷消息
    sendQuick(msg) {
      this.userInput = msg
      this.sendMessage(msg)
    },

  }
}
</script>


<template>
    <div class="layout">
    <!-- 左侧历史会话 -->
    <div class="sidebar">
      <h3>搜索历史</h3>
      <el-button
        type="primary"
        size="mini"
        style="margin-bottom:10px;width:100%;"
        @click="newConversation">
        新建会话
      </el-button>
    <!-- 历史会话-->
      <ul class="history-list">
        <li
          v-for="(item) in historyList"
          :key="item.id"
          :class="{active: item.id === activeHistoryIndex }"
          @click="loadHistory(item.id)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>

    <!-- 主区域 -->
    <div class="main">
      <!-- 快捷消息 -->
      <div class="quick-bar">
        <span>快捷消息：</span>
        <el-tag
          v-for="(msg, i) in quickMessages"
          :key="i"
          type="info"
          style="margin-right:6px;cursor:pointer;"
          @click="sendQuick(msg)"
        >
          {{ msg }}
        </el-tag>
      </div>
      <!-- 对话区 -->
      <div class="chat-window">
        <div
          v-for="(msg, index) in currentChat.messages"
          :key="index"
          :class="['chat-row', msg.role]"
        >
          <el-avatar :src="msg.role === 'user' ? userAvatar : assistantAvatar" class="avatar"></el-avatar>
          <!-- 文本消息 -->
          <div v-if="msg.type === 'text'" class="bubble" v-html="formatMessage(msg.content)">
          </div>

          <!-- 语义解析 -->
          <div v-if="msg.type === 'semantic'" class="semantic-box">
            <!-- <div v-html="formatMessage(msg.content)"></div>-->
            <h4>需求语义解析</h4>
            <p>商品类别：<el-tag type="success">{{ msg.semantic.category }}</el-tag></p>
            <p>
              需求属性：
              <el-tag
                v-for="(a, i) in msg.semantic.attributes"
                :key="i"
                type="info"
              >
                {{ a }}
              </el-tag>
            </p>
          </div>

          <!-- 商品推荐 -->
          <div v-if="msg.type === 'product'" class="product-list">
            <el-row :gutter="16">
              <el-col
                v-for="item in msg.products"
                :key="item.id"
                :span="6"
              >
                <el-card shadow="hover" class="product-card">
                  <img :src="item.image" />
                  <h4>{{ item.name }}</h4>
                  <p class="price">￥{{ item.price }}</p>
                  <div class="reason">
                    <el-tag
                      v-for="(r, i) in item.reasons"
                      :key="i"
                      size="mini"
                      type="warning"
                    >
                      {{ r }}
                    </el-tag>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>

        <div v-if="loading" class="chat-row assistant">
          <div class="bubble loading">正在进行语义理解与推荐</div>
        </div>
      </div>

      <!-- 输入区 -->
      <div class="input-area">
        <el-input
          v-model="userInput"
          placeholder="例如：性价比高、适合学生的轻薄笔记本"
          @keyup.enter.native="sendMessage"
          @input="isOpen"
        >
          <el-button
            slot="append"
            type="primary"
            icon="el-icon-s-promotion"
            @click="sendMessage"
            :disabled="stopSend">
            发送
          </el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/chat.css";
</style>
