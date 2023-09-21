<template>
  <div style="padding-bottom: 3rem">
    <div style="background-color: #345dc2"><cy-searchinp></cy-searchinp></div>

    <van-tabs v-model:active="questionActive">
      <van-tab title="热门回答">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <QuestItem v-for="(item, index) in hotList" :key="index" :list="item"></QuestItem>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="最新问题">
        <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
          <van-list
            v-model:loading="loading1"
            :finished="finished1"
            finished-text="没有更多了"
            @load="onLoad1"
          >
            <QuestItem v-for="(item, index) in newList" :key="index" :list="item"></QuestItem>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="等待回答">
        <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2">
          <van-list
            v-model:loading="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            @load="onLoad2"
          >
            <QuestItem v-for="(item, index) in waitList" :key="index" :list="item"></QuestItem>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-back-top right="5vw" bottom="15vh" style="background-color: #0b131a47" class="custom" />
  </div>
</template>

<script setup lang="ts">
import { getHotQuestData, getNewQuestData, getWaitQuestData } from '@/servers/home'
import type { questDetail } from '@/types/home'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const page = ref({
  current: 1,
  size: 10
})
const questionActive = ref(0)

const hotList = ref<questDetail[]>([])

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  let res = await getHotQuestData(page.value)
  if (refreshing.value) {
    hotList.value = []
    refreshing.value = false
  }
  hotList.value.push(...res.data.records)
  if (hotList.value.length >= res.data.total) {
    finished.value = true
  } else {
    page.value.current++
    loading.value = false
  }
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  page.value.current = 1
  onLoad()
}

const newList = ref<questDetail[]>([])
const loading1 = ref(false)
const finished1 = ref(false)
const refreshing1 = ref(false)

const onLoad1 = async () => {
  let res = await getNewQuestData(page.value)
  if (refreshing1.value) {
    newList.value = []
    refreshing1.value = false
  }
  newList.value.push(...res.data.records)
  if (newList.value.length >= res.data.total) {
    finished1.value = true
  } else {
    page.value.current++
    loading1.value = false
  }
}

const onRefresh1 = () => {
  // 清空列表数据
  finished1.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading1.value = true
  page.value.current = 1
  onLoad1()
}

const waitList = ref<questDetail[]>([])

const loading2 = ref(false)
const finished2 = ref(false)
const refreshing2 = ref(false)

const onLoad2 = async () => {
  let res = await getWaitQuestData(page.value)
  if (refreshing2.value) {
    waitList.value = []
    refreshing2.value = false
  }
  waitList.value.push(...res.data.records)
  if (waitList.value.length >= res.data.total) {
    finished2.value = true
  } else {
    page.value.current++
    loading2.value = false
  }
}

const onRefresh2 = () => {
  // 清空列表数据
  finished2.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading2.value = true
  page.value.current = 1
  onLoad2()
}
</script>

<style lang="scss" scoped></style>
