<template>
  <div style="padding-bottom: 5rem">
    <div :class="selindex == 0 ? 'c' : selindex == 1 ? 'a' : 'b'">
      <searchinp></searchinp>

      <div style="padding: 1rem 1rem 0; border-radius: 0.2rem; overflow: hidden">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
          <van-swipe-item v-for="(item, index) in swiptList" :key="index">
            <img
              style="width: 100%"
              :src="'http://m.mengxuegu.com' + item.imageUrl"
              alt=""
              @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="cy-home-item">
      <div
        class="item"
        v-for="(item, index) in homeList"
        :key="index"
        @click="$router.push(`/pages/search/search?id=${item.id}`)"
      >
        {{ item.name }}
      </div>
    </div>

    <div>
      <div>
        <van-cell value="全部" is-link @click="$router.push(`/pages/search/search?id=`)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title" style="font-size: 19px">热门推荐</span>
            <span class="itemcon">HOT</span>
          </template>
        </van-cell>
      </div>

      <div style="padding: 0 1rem">
        <van-swipe-cell style="height: 33rem">
          <template #left>
            <cy-orderItem
              class="left"
              :flag="false"
              @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
              v-for="(item, index) in hotList?.records.slice(0, 5)"
              :key="index"
              :list="item"
            ></cy-orderItem>
          </template>
          <template #right>
            <cy-orderItem
              @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
              class="right"
              :flag="false"
              :key="index"
              v-for="(item, index) in hotList?.records.slice(5)"
              :list="item"
            ></cy-orderItem>
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <div>
      <div>
        <van-cell value="全部" is-link @click="$router.push(`/pages/search/search?id=`)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title" style="font-size: 19px">近期上新</span>
            <span class="itemcon">NEW</span>
          </template>
        </van-cell>
      </div>

      <div class="newdata">
        <cy-orderItem
          class="newitem"
          @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
          v-for="(item, index) in hotList?.records"
          :key="index"
          :list="item"
          :flag="true"
        ></cy-orderItem>
      </div>
    </div>

    <div>
      <div>
        <van-cell value="全部" is-link @click="$router.push(`/pages/search/search?id=`)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title" style="font-size: 19px">免费精选</span>
            <span class="itemcon">FREE</span>
          </template>
        </van-cell>
      </div>

      <div style="padding: 0 1rem">
        <van-swipe-cell style="height: 33rem">
          <template #left>
            <cy-orderItem
              class="left"
              :flag="false"
              @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
              v-for="(item, index) in hotList?.records.slice(0, 5)"
              :key="index"
              :list="item"
            ></cy-orderItem>
          </template>
          <template #right>
            <cy-orderItem
              class="right"
              :flag="false"
              :key="index"
              v-for="(item, index) in hotList?.records.slice(5)"
              :list="item"
              @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
            ></cy-orderItem>
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <div>
      <div>
        <van-cell value="全部" is-link @click="$router.push(`/pages/search/search?id=`)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title" style="font-size: 19px">付费精品</span>
            <span class="itemcon">NICE</span>
          </template>
        </van-cell>
      </div>
      <div style="padding: 0 1rem">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <cy-orderItem
            v-for="(item, index) in list"
            :key="index"
            :list="item"
            :flag="false"
            @click="$router.push(`/pages/course/course-details?id=${item.id}`)"
          ></cy-orderItem>
        </van-list>
      </div>
    </div>
    <van-back-top right="5vw" bottom="15vh" style="background-color: #0b131a47" class="custom" />
  </div>
</template>

<script setup lang="ts">
// import orderitem from '@/components/cy-orderItem.vue'
import searchinp from '@/components/cy-searchinp.vue'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getHomeData, getswipt } from '@/servers/home'
import type { gethomeHotData, getrecords, swipt } from '@/types/home'

const homeList = [
  { id: '1', name: 'Java' },
  { id: '2', name: '前端' },
  { id: '3', name: '云计算' },
  { id: '4', name: '运维' },
  { id: '5', name: '测试' },
  { id: '6', name: 'UI设计' },
  { id: '7', name: '人工智能' },
  { id: '0', name: '全部分类' }
]
const selindex = ref(0)
const swiptList = ref<swipt[]>()
const hotList = ref<gethomeHotData>()
const page = ref({
  current: 1,
  isFree: 0,
  size: 10
})

const onChange = (index: number) => {
  // console.log(index)
  selindex.value = index
}
const getSwipt = async () => {
  let res = await getswipt()
  // console.log(res)
  swiptList.value = res.data
}
getSwipt()

const gethot = async () => {
  let res = await getHomeData({ current: 1, size: 8, sort: 'hot' })
  console.log(res)
  hotList.value = res.data
}
gethot()

const list = ref<getrecords[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  let res = await getHomeData(page.value)
  list.value?.push(...res.data.records)
  console.log(list.value)

  // 数据全部加载完成
  if (list.value?.length >= res.data.total) {
    finished.value = true
  } else {
    page.value.current++
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  text-align: center;
  width: 90%;
  height: 200px;
}
.a {
  background-image: linear-gradient(rgb(69, 50, 140) 50%, rgb(255, 255, 255));
}
.b {
  background-image: linear-gradient(rgb(0, 114, 183) 50%, rgb(255, 255, 255));
}
.c {
  background-image: linear-gradient(rgb(0, 108, 0) 50%, rgb(255, 255, 255));
}

.cy-home-item {
  box-sizing: border-box;
  padding: 10px 15px;
  width: 100%;
  height: 95px;
  .item {
    margin-left: 5px;
    float: left;
    width: 80px;
    height: 33px;
    background-color: #f8f9fb;
    text-align: center;
    line-height: 35px;
    font-size: 13px;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 7px;
  }
}

.itemcon {
  margin-left: 5px;
  font-size: 10px;
  background-image: -webkit-linear-gradient(left, #fb6932, #fa140e);
  background-image: linear-gradient(90deg, #fb6932, #fa140e);
  color: #fff;
  padding: 0 5px;
  border-radius: 15px 15px 15px 0;
}

.left {
  width: 350px;
}
.right {
  width: 355px;
}

::v-deep() {
  .van-swipe-cell__left {
    transform: translate3d(0%, 0, 0);
  }
}

.newdata {
  display: flex;
  width: 100%;
  height: 200px;
  overflow: hidden;
  overflow-x: scroll;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  // white-space: nowrap;
}

.van-cell {
  padding: 10px 15px 0 15px;
}
</style>
