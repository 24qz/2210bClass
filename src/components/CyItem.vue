<template>
  <div class="article-item">
    <div style="padding: 0.5rem; box-sizing: border-box; display: flex">
      <div class="item-left">
        <p style="font-weight: 700; font-size: 17px">{{ list.title }}</p>
        <van-text-ellipsis :content="list.summary" />
      </div>

      <div class="item-right" v-if="list.imageUrl">
        <img
          style="width: 100%; height: 100%"
          :src="
            list.imageUrl.indexOf('http') == -1
              ? 'http://m.mengxuegu.com/' + list.imageUrl
              : list.imageUrl
          "
          alt=""
        />
      </div>
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
      <span>{{ list.nickName }}</span>
      <span>·</span>
      <span style="color: #999">{{ formTime(list.updateDate) }}</span>
      <span>·</span>
      <span style="color: #999">{{ list.thumhup }} 赞</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { articleItem } from '@/types/home'
import dayjs from 'dayjs'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{
  list: articleItem
}>()
const formTime = (time: string) => {
  return dayjs(time).format(`YYYY年MM月DD日`)
}
</script>

<style lang="scss" scoped>
.item-left {
  min-width: 70%;
}
.item-right {
  width: 130px;
  height: 70px;
  border-radius: 5px;
  overflow: hidden;
}
.van-text-ellipsis {
  font-size: 13px;
  color: #999;
}
.article-item {
  padding: 10px;
  border-bottom: 1px solid #e6e4e4;
}
</style>
