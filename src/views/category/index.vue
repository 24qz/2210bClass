<template>
  <div>
    <van-nav-bar title="分类">
      <template #right>
        <van-icon
          name="search"
          size="24"
          color="white"
          @click="$router.push('/pages/search/search')"
        />
      </template>
    </van-nav-bar>

    <div>
      <div style="display: flex; height: calc(100vh - 96px)">
        <van-sidebar v-model="labelactive">
          <van-sidebar-item v-for="(item, index) in labelList" :key="index" :title="item.name" />
        </van-sidebar>

        <div style="margin-top: 1rem">
          <div
            class="cy-cateitem"
            v-for="(item, index) in childList"
            :key="index"
            @click="$router.push(`/pages/search/search?id=${item.id}`)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLabelList } from '@/servers/home'
import type { getlabel } from '@/types/home'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const labelactive = ref(0)
const labelList = ref<getlabel[]>([])
const getLabel = async () => {
  let res = await getLabelList()

  labelList.value = res.data
}
getLabel()
console.log(labelactive.value)

const childList = computed(() => {
  return labelList.value[labelactive.value]?.labelList
})
console.log(childList.value)
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    background: #345dc2;
  }
  .van-nav-bar__title {
    color: white;
  }
  .van-sidebar-item {
    height: 74px;
    line-height: 35px;
  }
  .van-sidebar {
    box-sizing: border-box;
    width: 200px;
    text-align: center;
  }
  .van-sidebar-item--select {
    color: #345dc2;
  }
}
.cy-cateitem {
  float: left;
  font-size: 12px;
  line-height: 30px;
  border: 1px solid #999;
  border-radius: 15px;
  min-width: 80px;
  text-align: center;
  padding: 0 2px;
  margin: 7px 2px;
}
</style>
