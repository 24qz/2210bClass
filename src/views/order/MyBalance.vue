<template>
  <div class="cy-banlance">
    <van-nav-bar title="我的余额" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div style="font-size: 14px; margin-top: 2rem">余额：</div>
      <div>{{ price }}币</div>
    </div>

    <div style="padding: 0.5rem">
      <div style="margin-bottom: 0.5rem">充值</div>
      <div
        class="cy-navitem"
        @click="sel(index)"
        :class="flag === index ? 'active' : ''"
        v-for="(item, index) in list"
        :key="index"
      >
        <p style="color: red">{{ item.content }}</p>
        <p style="font-size: 14px; color: #aaa9a9">￥{{ item.price }}</p>
      </div>
    </div>

    <div class="desc">
      <div style="padding: 1rem 0">充值说明</div>
      1.在IOS设备的APP要进行充值后，使用虚拟币消费。<br />
      2.充值后不能在非IOS设备使用，与安卓版和网站余额不通用。<br />
      3.充值后没有使用期限，但不可提现、退换、转让和申请发票。<br />
      4.如遇无法充值、充值失败等问题，可关注[梦学谷]公众号，联系我们解决。
    </div>
    <van-action-bar>
      <van-action-bar-button type="danger" style="background: #345dc2" text="立即充值" />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MyBalance } from '@/servers/order'
const router = useRouter()
const price = ref()
const flag = ref(0)
const list = [
  { content: '0币', price: 0 },
  { content: '30币', price: 30 },
  { content: '60币', price: 60 },
  { content: '90币', price: 90 },
  { content: '120币', price: 120 },
  { content: '150币', price: 150 }
]

const onClickLeft = () => {
  router.push('/pages/my/my')
}

const sel = (index: number) => {
  flag.value = index
}

const getdata = async () => {
  let res = await MyBalance()
  price.value = res.data
}
getdata()
</script>

<style lang="scss" scoped>
.cy-banlance {
  overflow: hidden;
  ::v-deep() {
    .van-nav-bar {
      background: #345dc2;
    }
    .van-nav-bar__title {
      color: white;
    }
    .van-nav-bar .van-icon {
      color: white;
    }
    .van-hairline--bottom:after {
      border: 0;
    }
  }
  .top {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 144px;
    background-color: #345dc2;
    color: #fff;
    font-size: 44px;
  }
  .cy-navitem {
    text-align: center;
    float: left;
    width: 112px;
    border: 1px solid #f8f9fb;
    border-radius: 5px;
    background-color: #fff;
    margin-right: 5px;
    margin-bottom: 7px;
    padding: 10px 0;
  }
  .active {
    box-shadow: 0 0 0 0.5px #fa140e;
  }
  .desc {
    clear: both;
    margin: 0 10px;
    font-size: 15px;
    line-height: 22px;
    color: #6e6d70;
  }
}
</style>
