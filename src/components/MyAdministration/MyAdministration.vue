<template>
  <div>
    <div class="line1">
      <div
        class="zxc"
        v-for="(item, index) in topicClass"
        :key="index"
        :class="selectedIndex == index ? 'active' : ''"
        @click="getTopic(index, item.topicClassId)"
      >
        {{item}}
      </div>
    </div>
    <div v-if="selectedIndex == 1">
      <brand-management />
    </div>
    <div v-if="selectedIndex == 5">
      <wallet-management />
    </div>
  </div>
</template>

<script>
import WalletManagement from "./optins/WalletManagement.vue"
import BrandManagement from "./optins/BrandManagement.vue"
export default {
  components: { WalletManagement,BrandManagement },
  data() {
    return {
      topicClass: [
        "订单管理",
        "品牌管理",
        "众筹管理",
        "活动管理",
        "帖子管理",
        "钱包管理",
      ],
      selectedIndex: "1",
    };
  },
  methods: {
    getTopic(index, id) {
      this.selectedIndex = index
    },
  },
};
</script>


<style lang="less" scoped>
.line1 {
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: center;
  padding-top: 30px;

  .zxc {
    width: 160px;
    height: 60px;
    cursor: pointer;
    padding-top: 18px;
    font-size: 16px;
font-weight: 400;
color: #333333;
  }
  .zxc.active {
    width: 160px;
    height: 60px;
    background: #f5f5f5;
    border-radius: 6px 6px 0px 0px;
  }
}
</style>