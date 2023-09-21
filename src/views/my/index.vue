<template>
  <div>
    <div style="background-color: #345dc2; overflow: hidden">
      <div class="cy-my-top" @click="$router.push('/pages/my/user')" v-if="store.userList">
        <div style="display: flex; align-items: center">
          <span class="cy-my-top-img"
            ><img style="width: 100%; height: 100%" :src="store.userList?.userInfo.imageUrl" alt=""
          /></span>
          <span style="margin-left: 0.8rem">
            <h3>{{ store.userList?.userInfo.nickName }}</h3>
            <p style="color: #959da5">用户名: {{ store.userList?.userInfo.username }}</p>
          </span>
        </div>
        <div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="cy-my-top" @click="$router.push('/pages/auth/login')" v-else>
        <div style="display: flex; align-items: center">
          <span class="cy-my-top-img"
            ><img
              style="width: 100%; height: 100%"
              src="http://m.mengxuegu.com/static/logo.png
"
              alt=""
          /></span>
          <span style="margin-left: 0.8rem">
            <h3>请登录</h3>
          </span>
        </div>
        <div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="cy-my-content"></div>

    <van-cell is-link to="/pages/order/order">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #title>
        <img class="cy-my-svg" src="../../assets/1.svg" alt="" />
        <span>我的订单</span>
      </template>
    </van-cell>
    <van-cell is-link @click="$router.push('/pages/order/my-balance')">
      <template #title>
        <img class="cy-my-svg" src="../../assets/2.svg" alt="" />
        <span>我的余额</span>
      </template>
    </van-cell>
    <van-cell is-link @click="$router.push('/pages/my/study')">
      <template #title>
        <img class="cy-my-svg" src="../../assets/3.svg" alt="" />
        <span>我的学习</span>
      </template>
    </van-cell>

    <div class="cy-my-content"></div>

    <van-cell is-link @click="$router.push('/pages/my/setting')">
      <template #title>
        <img class="cy-my-svg" src="../../assets/4.svg" alt="" />
        <span>设置</span>
      </template>
    </van-cell>
    <van-cell is-link @click="$router.push('/pages/my/feedback')">
      <template #title>
        <img class="cy-my-svg" src="../../assets/5.svg" alt="" />
        <span>意见反馈</span>
      </template>
    </van-cell>

    <div class="cy-my-content"></div>

    <van-cell is-link @click="$router.push('/pages/my/about')">
      <template #title>
        <img class="cy-my-svg" src="../../assets/6.svg" alt="" />
        <span>关于我们</span>
      </template>
    </van-cell>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
</script>

<style lang="scss" scoped>
.cy-my-top {
  margin-top: 45px;
  padding: 25px 19px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 15px 15px 0 0;
  &-img {
    overflow: hidden;
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
}

.cy-my-content {
  height: 10px;
  background-color: #f8f9fb;
}

.cy-my-svg {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

::v-deep() {
  .van-cell {
    border-bottom: 1px solid #efeff4;
  }
  .van-cell__title {
    display: flex;
  }
}
</style>
