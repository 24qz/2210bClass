<template>
  <div>
    <cy-tap title="订单支付"></cy-tap>
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

    <div class="card">
      <span> 实付金额 </span>
      <span style="color: red"> ￥ {{ $route.query.price }} </span>
    </div>

    <van-button
      :loading="flag"
      loading-text="立即支付"
      :disabled="flag"
      @click="flag = true"
      type="primary"
      :class="flag ? 'cy-btnpay' : ''"
      style="background-color: #345dc2; width: 94%; margin: 1.5rem 0.6rem; border: 0"
      round
      >立即支付</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const checked = ref('1')
const flag = ref(false)
</script>

<style lang="scss" scoped>
.cy-orderpay-img {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
}
.custom-title {
  margin-left: 10px;
}
.cy-payitem {
  margin: 0 15px;
  padding: 10px 10px;
  background-color: #fff;
  margin-top: 15px;
  box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
::v-deep() {
  .van-cell {
    padding: 0;
  }
  .van-cell-group--inset {
    margin: 0;
  }
}

.card {
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
  padding: 0 10px;
  background-color: #fff;
  margin-top: 15px;
  box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  line-height: 45px;
  font-size: 15px;
}
.cy-btnpay {
  background-color: #ebeaea !important;
  color: rgba(0, 0, 0, 0.3) !important;
}
</style>
