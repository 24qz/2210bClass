<template>
  <div style="padding-bottom: 3rem">
    <cy-tap :title="list?.title"></cy-tap>
    <div style="padding: 0 1rem">
      <div style="display: flex; padding: 1rem 0">
        <div class="tag" v-for="(item, index) in list?.labelList" :key="index">{{ item.name }}</div>
      </div>

      <h3>{{ list?.title }}</h3>

      <div style="display: flex; margin-top: 1rem">
        <div class="detail-img">
          <img
            style="width: 100%; height: 100%"
            src="http://m.mengxuegu.com/static/logo.png"
            alt=""
          />
        </div>
        <div
          style="
            font-size: 13px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 70%;
          "
        >
          <span>{{ list?.nickName }}</span>
          <span>·</span>
          <span style="color: #999">{{ list?.updateDate }}</span>
          <span>·</span>
          <span style="color: #999">{{ list?.thumhup }} 人阅读</span>
        </div>
      </div>

      <div style="overflow: hidden" v-html="list?.htmlContent"></div>
    </div>

    <div style="height: 0.5rem; background-color: #f8f9f9"></div>

    <div style="padding-bottom: 3rem">
      <div style="display: flex; padding-top: 0.5rem; align-items: center">
        <div class="comtag"></div>
        <h4>热门评论</h4>
      </div>
      <cy-common v-for="(item, index) in CommentList" :key="index" :list="item"></cy-common>
    </div>

    <div class="detail-bot">
      <input class="detail-inp" disabled type="text" placeholder="有何高见,展开讲讲……" /><van-button
        style="background-color: #f2f5f6; margin-left: 0.3rem; border: 0; color: #abaaaa"
        type="primary"
        size="small"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDetail, getDetailCommot } from '@/servers/home'
import type { articleDetail } from '@/types/home'
import dayjs from 'dayjs'
import type { Comment } from '@/types/course'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const CommentList = ref<Comment[]>()
const list = ref<articleDetail>()

const getdata = async () => {
  let res = await getDetail(route.query.id as string)
  console.log(res)
  list.value = res.data
}
getdata()

const getcommot = async () => {
  let res = await getDetailCommot(route.query.id as string)
  console.log(res)
  CommentList.value = res.data
}
getcommot()
</script>

<style lang="scss" scoped>
.tag {
  height: 20px;
  padding: 0 8px;
  line-height: 20px;
  font-size: 12px;
  color: #007aff;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #007aff;
  border-radius: 15px;
  margin-right: 6px;
  font-size: 12px;
}
.detail-img {
  width: 22px;
  height: 22px;
  border-radius: 100%;
  margin-right: 5px;
}
.cy-comment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cy-detail-child {
  background-color: #f8f9fb;
  padding: 7px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: #7d828f;
  margin-top: 5px;
}

.detail-bot {
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  border-top: 1px solid #dbd8d8;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  .detail-inp {
    width: 85%;
    height: 35px;
    border-radius: 10px;
    background-color: #f8f9fb;
  }
}
</style>
