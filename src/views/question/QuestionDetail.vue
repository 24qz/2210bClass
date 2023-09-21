<template>
  <div>
    <cy-tap></cy-tap>
    <div style="padding: 3rem 1rem 0 1rem">
      <div style="width: 100%; height: 2rem">
        <cy-pageItem
          v-for="(item, index) in list?.labelList"
          :key="index"
          :list="item"
        ></cy-pageItem>
      </div>

      <h3>{{ list?.title }}</h3>

      <div class="cy-quest-detail">
        <van-image round width="1.5rem" height="1.5rem" :src="list?.userImage" />
        <span>{{ list?.nickName }}</span>
        <span>·</span>
        <span style="font-size: 12px; color: #999">{{ formTime(list?.createDate!) }}</span>
      </div>

      <div style="overflow: hidden" v-html="list?.htmlContent"></div>
    </div>
    <div style="height: 0.5rem; background-color: #f1f1f1"></div>

    <div>
      <div style="display: flex; align-items: center; padding-top: 0.5rem">
        <div class="comtag"></div>

        <div style="font-size: 14px; font-weight: 600">{{ list?.reply }} 个回答</div>
      </div>
      <div
        v-for="(item, index) in CommentList"
        :key="index"
        style="padding: 0.6rem; width: 100%; box-sizing: border-box"
      >
        <div style="display: flex; align-items: center">
          <div>
            <van-image
              round
              width="2rem"
              height="2rem"
              :src="
                item.userImage == null ? 'http://m.mengxuegu.com/static/logo.png' : item.userImage
              "
            />
          </div>
          <div style="margin-left: 0.3rem">
            <div
              style="
                color: #999;
                font-size: 13px;
                width: 23em;
                display: flex;
                justify-content: space-between;
              "
            >
              <span>{{ item.nickName }}</span>
              <span>{{ formTime(item.createDate) }}</span>
            </div>
            <div>
              {{ item.mdContent }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cy-questDetail-bot">
      <div
        v-if="flag"
        @click="onChangeStatus(list?.id!)"
        :class="list?.status == 1 ? 'argy' : ''"
        class="bot-one"
      >
        <van-icon v-show="list?.status == 2" name="like-o" />{{
          list?.status == 1 ? '已关注问题' : '关注问题'
        }}
      </div>
      <div v-else @click="onChangeStatus(list?.id!)" class="bot-one argy">已关注问题</div>
      <div class="bot-two" @click="showBottom = true"><van-icon name="records" />回答问题</div>
    </div>

    <!-- 底部弹出 -->
    <van-popup v-model:show="showBottom" position="bottom" round :style="{ height: '40%' }">
      <div class="cy-quest-popup">
        <span @click="showBottom = false"><van-icon name="cross" color="#1989fa" /></span>
        <span style="font-weight: 700">回答问题</span>
        <span
          ><van-button type="primary" size="small" :disabled="message == ''" @click="onanswer"
            >提交</van-button
          ></span
        >
      </div>

      <div style="padding: 10px">
        <van-field
          v-model="message"
          label-class="botinp"
          rows="7"
          autosize
          type="textarea"
          placeholder="有何高见,展开讲讲……"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import {
  getQuestAnswer,
  getQuestDetail,
  getQuestDetailCommot,
  getQuestStatus
} from '@/servers/home'
import type { articleDetail, questDetail, qusetComment } from '@/types/home'
import dayjs from 'dayjs'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const showBottom = ref(false)
const flag = ref(true)
const message = ref('')
const btnflag = ref(true)

const formTime = (time: string) => {
  return dayjs(time).format(`YYYY年MM月DD日`)
}
const route = useRoute()
const list = ref<questDetail>()
const CommentList = ref<qusetComment[]>()

const getdata = async () => {
  let res = await getQuestDetail(route.query.id as string)
  console.log(res)
  list.value = res.data
}
getdata()

const getquestDetailCom = async () => {
  let res = await getQuestDetailCommot(route.query.id as string)
  console.log(res)
  CommentList.value = res.data
}
getquestDetailCom()

const onChangeStatus = (id: string) => {
  getQuestStatus(id)
  flag.value = !flag.value
  console.log(flag.value)
}

const onanswer = async () => {
  let data = { htmlContent: message.value, mdContent: message.value, questionId: list.value?.id! }
  await getQuestAnswer(data)
  message.value = ''
  showBottom.value = false
  getdata()
}
</script>

<style lang="scss" scoped>
.cy-quest-detail {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.cy-questDetail-bot {
  display: flex;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  color: #007aff;
  font-size: 15px;
  font-weight: 700;
  background-color: #f8f9fb;
  .bot-one {
    border-right: 1px solid #ccc;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .argy {
    color: #999;
  }
  .bot-two {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
}

.cy-quest-popup {
  box-sizing: border-box;
  padding: 15px 10px 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

::v-deep() {
  .van-cell {
    padding: 10px;
    box-sizing: border-box;
  }
  .van-field {
    background: #f8f9fb !important;
  }
}
</style>
