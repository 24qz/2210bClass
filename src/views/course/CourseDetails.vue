<template>
  <div>
    <div>
      <van-nav-bar fixed :title="list?.title" left-arrow @click-left="callback" />
      <span class="cy-details-callback" @click="callback"
        ><van-icon name="arrow-left" size="20px" color="white"
      /></span>
      <img style="width: 100%" :src="list?.mainImage" alt="" />
      <img
        v-if="!list?.mainImage"
        style="width: 100%"
        src="https://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLL…icMiczYSFpAz3Eu17nibpDe0VgSCswPhIOLGQnO7K1hp4/510"
        alt=""
      />
    </div>

    <div style="height: 0.5rem; background-color: #f8f9fb"></div>
    <div class="cy-details-nav">
      <p>
        <span style="font-size: 23px; color: red">￥{{ list?.priceDiscount }} &nbsp;</span>
        <span style="color: #b6bbbf; font-size: 15px; text-decoration: line-through"
          >￥{{ list?.priceOriginal }}</span
        >
        <span class="price">优惠价</span>
      </p>

      <h4>{{ list?.title }}</h4>

      <div style="margin-top: 0.3rem">
        <span class="flow">
          <i class="iconfont flower"></i>
          {{ list?.goodRate }}好评
        </span>
        <span class="flow">
          <i class="iconfont my"></i>
          {{ list?.studyTotal }}人在学
        </span>
      </div>
    </div>

    <div style="height: 0.5rem; background-color: #f8f9fb"></div>

    <van-tabs v-model:active="active" sticky>
      <van-tab title="详情">
        <img style="width: 100%" :src="list?.detailUrls[0]" alt="" />
      </van-tab>

      <van-tab title="章节">
        <van-popup
          v-model:show="show"
          :style="{ width: '100%', height: '50%', background: 'transparent' }"
          round
        >
          <div style="text-align: center">
            <h4 style="color: white; display: inline-block; margin: 1rem auto">免费试看 x</h4>
          </div>
          <div class="popup">
            <cy-video></cy-video>
          </div>
        </van-popup>

        <div v-for="(item, index) in chapterlist" :key="index" style="padding: 0 0.5rem">
          <h4 style="display: inline-block; margin: 5px 0">第{{ index + 1 }}章 {{ item.name }}</h4>

          <van-cell
            v-for="(it, ind) in item.sectionList"
            :key="ind"
            @click="chapteronVideo(it.isFree)"
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span><van-icon name="play-circle" /> {{ index + 1 }}-{{ ind + 1 }} &nbsp;</span>
              <span class="custom-title">{{ it.name }}</span>
            </template>
            <template #right-icon v-if="it.isFree == 1">
              <span style="color: #007aff">试看</span>
            </template>
          </van-cell>
        </div>
      </van-tab>

      <van-tab title="评论">
        <div v-for="(item, index) in CommentList" :key="index" style="padding: 0.6rem">
          <div class="cy-comment-item">
            <div style="display: flex; align-items: center">
              <van-image
                round
                width="3rem"
                height="3rem"
                :src="
                  item.userImage == null
                    ? 'http://m.mengxuegu.com/static/tab/my.png'
                    : item.userImage
                "
              />
              <div style="margin-left: 0.5rem">
                <h4>{{ item.nickName }}</h4>
                <small>{{ formTime(item.createDate) }}</small>
              </div>
            </div>
            <div>
              <i v-if="item.isGood == 0" style="font-size: 20px" class="iconfont flower"></i>
              <i v-else class="iconfont flower" style="color: red; font-size: 20px"></i>
            </div>
          </div>

          <p>{{ item.content }}</p>

          <div class="cy-detail-child" v-if="item.children?.content">
            {{ item.children?.content }}
          </div>
        </div>
      </van-tab>

      <van-tab title="套餐">
        <div v-for="(item, index) in packList" :key="index" class="cy-details-pack">
          <p style="display: inline-block; padding: 0.2rem">{{ item.title }}</p>
          <cy-orderItem
            v-for="(value, key) in item.list"
            :key="key"
            :list="value"
            :flag="false"
          ></cy-orderItem>
          <div class="bot">
            <div>
              <span style="color: red">￥{{ item.groupPrice }}</span>
              <span style="color: #bbbcbd; text-decoration: line-through"
                >￥{{ item.totalPrice }}</span
              >
            </div>
            <div
              style="color: red"
              @click="$router.push(`/pages/order/confirm-buy?courseGroup=${JSON.stringify(item)}`)"
            >
              购买套餐
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-action-bar>
      <van-action-bar-button
        style="background-color: #345dc2; color: white"
        text="立即观看"
        @click="$router.push(`/pages/course/course-play?id=null`)"
      />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { getBuyList, getComment, getPackage } from '@/servers/course'
import { getstudyDetails } from '@/servers/order'
import type { buyList, Comment, getPackagelist } from '@/types/course'
import type { studyDetails } from '@/types/user'
import { showToast } from 'vant'
import dayjs from 'dayjs'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const list = ref<studyDetails>()
const CommentList = ref<Comment[]>()
const chapterlist = ref<buyList[]>()
const packList = ref<getPackagelist[]>()
const route = useRoute()
const active = ref(0)
const show = ref(false)

const formTime = (time: string) => {
  return dayjs(time).format(`YYYY年MM月DD日`)
}

const callback = () => {
  history.back()
}

const gettitle = async () => {
  let res = await getstudyDetails(route.query.id as string)
  list.value = res.data
}
gettitle()

const getData = async () => {
  let res = await getBuyList(route.query.id as string)
  console.log(res)
  chapterlist.value = res.data
}
getData()

const chapteronVideo = (isFree: number) => {
  if (isFree == 0) showToast('请先购买')
  if (isFree == 1) {
    show.value = true
  }
}

const getCommentList = async () => {
  let res = await getComment()
  console.log(res)
  CommentList.value = res.data
}
getCommentList()

const getPack = async () => {
  let res = await getPackage()
  console.log(res)
  packList.value = res.data
}
getPack()
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont'; /* Project id 2590034 */
  src:
    url('//at.alicdn.com/t/c/font_2590034_umkbfeknmcf.woff2?t=1694765133926') format('woff2'),
    url('//at.alicdn.com/t/c/font_2590034_umkbfeknmcf.woff?t=1694765133926') format('woff'),
    url('//at.alicdn.com/t/c/font_2590034_umkbfeknmcf.ttf?t=1694765133926') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 10px;
  font-style: normal;
}
.flower::before {
  content: '\e62c';
}
.my::before {
  content: '\e608';
}
.cy-details-nav {
  padding: 15px;
  .price {
    margin-left: 5px;
    font-size: 10px;
    color: #fa140e;
    border: 1px solid #fa140e;
    border-radius: 5px;
    padding: 0 1px;
  }
  .flow {
    margin-right: 7px;
    font-size: 10px;
    color: #7d828f;
    background-color: #f8f9fb;
    padding: 7px;
    border-radius: 15px;
  }
}

.popup {
  width: 100%;
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

.cy-details-pack {
  margin: 18px 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 0 10px 30px;
  .bot {
    display: flex;
    justify-content: space-between;

    font-size: 15px;
    line-height: 40px;
    font-weight: 700;
  }
}

.cy-details-callback {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  line-height: 36px;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 5px;
  left: 10px;
}
</style>
