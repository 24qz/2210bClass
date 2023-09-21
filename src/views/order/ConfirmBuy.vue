<template>
  <div style="padding-top: 3rem; padding-bottom: 3rem">
    <cy-tap title="确认购买"></cy-tap>
    <div class="cy-buy-page">
      <p>商品信息</p>

      <cy-orderItem
        v-for="(value, key) in list.list"
        :key="key"
        :list="value"
        :flag="false"
      ></cy-orderItem>
    </div>

    <div class="cy-payitem">
      支付方式
      <van-divider />
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell style="padding-bottom: 0.2rem" clickable @click="checked = '1'" :border="false">
            <template #title>
              <div style="display: flex; align-items: center">
                <div class="cy-orderpay-img">
                  <img
                    style="max-width: 100%"
                    src="http://m.mengxuegu.com/static/pay/alipay.png"
                    alt=""
                  />
                </div>
                <div class="custom-title">支付宝</div>
              </div>
            </template>
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell style="padding-top: 0.2rem" clickable @click="checked = '2'">
            <template #title>
              <div style="display: flex; align-items: center">
                <div class="cy-orderpay-img">
                  <img
                    style="max-width: 100%"
                    src="http://m.mengxuegu.com/static/pay/wxpay.png"
                    alt=""
                  />
                </div>
                <div class="custom-title">微信支付</div>
              </div>
            </template>
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

    <div class="cy-payitem">
      <van-cell-group>
        <van-cell style="padding: 1rem 0" title="商品金额" :value="`￥${list.groupPrice}`" />
        <van-cell style="padding: 1rem 0" title="优惠价" :value="`￥${list.totalPrice}`" />
      </van-cell-group>
    </div>
    <van-submit-bar
      :price="list.totalPrice * 100"
      button-text="立即支付"
      :loading="loading"
      button-color="#345dc2"
      text-align="left"
      label="实付金额："
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const checked = ref('1')
const list = JSON.parse(route.query.courseGroup as any)
console.log(list)
const loading = ref(false)
const onSubmit = () => {
  loading.value = true
}
</script>

<style lang="scss" scoped>
.cy-buy-page {
  padding: 15px;
}
.cy-payitem {
  // margin: 0 15px;
  padding: 10px 10px;
  background-color: #fff;
  margin-top: 15px;
  box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
.cy-orderpay-img {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
}
::v-deep() {
  .van-cell {
    padding: 0;
  }
  .van-cell-group--inset {
    margin: 0;
  }
}
</style>
