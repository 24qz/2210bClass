<template>
  <div style="padding-bottom: 3rem">
    <div style="background-color: #345dc2"><cy-searchinp></cy-searchinp></div>
    <van-tabs v-model:active="tapactive" sticky @click-tab="onClickTab">
      <van-tab v-for="(item, index) in tapList" :key="index" :title="item.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <CyItem
              v-for="(item, index) in list"
              :key="index"
              :list="item"
              @click="$router.push(`/pages/article/details?id=${item.id}`)"
            ></CyItem>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { getArticleData } from '@/servers/home'
import type { articleData, articleItem } from '@/types/home'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const tapactive = ref(0)
const tapList = [
  { id: 0, name: '推荐' },
  { id: 1, name: 'Java' },
  { id: 2, name: '前端' },
  { id: 3, name: '云计算' },
  { id: 4, name: '运维' },
  { id: 5, name: 'UI设计' },
  { id: 6, name: '人工智能' },
  { id: 7, name: '大数据' },
  { id: 8, name: 'Python' }
]

const page = ref({
  categoryId: 0,
  current: 1,
  size: 10
})
const list = ref<articleItem[]>([])

const getdata = async () => {
  let res = await getArticleData(page.value)
  // console.log(res)
  list.value = res.data.records
}
getdata()

const onClickTab = (event: any) => {
  // console.log(event.name)
  page.value.categoryId = event.name
  getdata()
}

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = async () => {
  let res = await getArticleData(page.value)
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }

  list.value.push(...res.data.records)

  if (list.value.length >= res.data.total) {
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
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-tab--active {
    color: #007aff;
  }
}
</style>
