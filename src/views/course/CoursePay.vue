<template>
  <div>
    <cy-video :videourl="videourl"></cy-video>
    <div
      @click="$router.push(`/pages/course/course-details?id=${id}`)"
      style="font-weight: 700; display: flex; justify-content: space-between; padding: 1rem 0.3rem"
    >
      <div style="width: 15rem">
        {{ titlelist.title }}
      </div>
      <div style="font-size: 14px">详情 <van-icon name="arrow" /></div>
    </div>
    <hr color="#ccc" size="1px" />

    <div v-for="(item, index) in list" :key="index" style="padding: 0 0.5rem">
      <h4 style="display: inline-block; margin: 5px 0">第{{ index + 1 }}章 {{ item.name }}</h4>

      <van-cell
        :class="active == it.id ? 'sel' : ''"
        v-for="(it, ind) in item.sectionList"
        :key="ind"
        @click="onVideo(it.videoUrl, it.id)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span><van-icon name="play-circle" /> {{ index + 1 }}-{{ ind + 1 }} &nbsp;</span>
          <span class="custom-title">{{ it.name }}</span>
        </template>
        <template #right>
          <van-icon name="search" class="search-icon" />
        </template>
      </van-cell>
    </div>

    <div class="cy-pay-bot" @click="show = true">
      <van-icon name="records" size="20px" style="margin-top: 0.3rem" />
      <p style="font-size: 14px">评价</p>
    </div>

    <van-popup v-model:show="show" :style="{ width: '90%', height: '20%' }" round>
      <div class="popup">
        <van-rate
          v-model="rateValue"
          :size="25"
          color="#007aff"
          void-icon="star"
          void-color="#eee"
          @change="onChange"
        />
        <p style="display: block; margin-top: 0.3rem">{{ textValue }}</p>
        <div class="cy-poup">
          <input
            type="text"
            v-model="Evaluate"
            name=""
            id=""
            class="poup-text"
            placeholder="请输入评价内容·····"
          />
          <span style="color: #4478f2; width: 5rem" @click="onEvaluate">提交</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { buyList } from '@/types/course'
import { getBuyList, getEvaluate } from '@/servers/course'
import { getstudyDetails, getstudyList } from '@/servers/order'
import { showToast } from 'vant'

const route = useRoute()
const list = ref<buyList[]>()
const titlelist = ref()
const videourl = ref('')
const active = ref()
const show = ref(false)
const rateValue = ref(5)
const textValue = ref('推荐，课程非常棒。')
const score = ref(5)
const Evaluate = ref('')
const id = route.query.id as string
const gettitle = async () => {
  let res = await getstudyDetails(route.query.id as string)
  titlelist.value = res.data
}
gettitle()

const getData = async () => {
  let res = await getBuyList(route.query.id as string)
  console.log(res)
  list.value = res.data
}
getData()

const onVideo = (video: string, ind: number) => {
  videourl.value = video
  active.value = ind
}

const onChange = (value: number) => {
  console.log(value)
  score.value = value
  if (value == 1) {
    textValue.value = '极差,课程很糟糕，我要吐槽。'
  } else if (value == 2) {
    textValue.value = '差,我对课程不满意。'
  } else if (value == 3) {
    textValue.value = '中评,课程一般。'
  } else if (value == 4) {
    textValue.value = '良好,课程还可以。'
  } else if (value == 5) {
    textValue.value = '推荐，课程非常棒。'
  }
}

const onEvaluate = () => {
  const obj = {
    content: Evaluate.value,
    courseId: route.query.id as string,
    nickName: 'xxx梦',
    score: score.value,
    userId: 1,
    userImage: 'xxx.png'
  }
  getEvaluate(obj)
  showToast('评论成功')
  Evaluate.value = ''
  show.value = false
}
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-cell {
    padding: 10px 0 !important;
  }
}
.sel {
  color: #1989fa;
}

.cy-pay-bot {
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  width: 100%;
  color: #959da5;
  height: 50px;
  text-align: center;
}
.popup {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  text-align: center;
}

.cy-poup {
  margin-top: 20px;
  width: 100%;
  height: 51px;
  background-color: #f8f9fb;
  overflow: hidden;
}
.poup-text {
  width: 271px;

  height: 40px;
}
</style>
