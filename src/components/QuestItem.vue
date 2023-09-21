<template>
  <div class="questitem-page" @click="$router.push(`/pages/question/details?id=${list.id}`)">
    <p style="font-weight: 700">{{ list.title }}</p>
    <div class="questitem">
      <span>
        {{ list.reply }} 回答 · <span>{{ list.viewCount }} 浏览</span>
      </span>
      <span
        ><span>{{ list.nickName }}</span> · {{ formTime(list.updateDate) }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { questDetail } from '@/types/home'
import dayjs from 'dayjs'
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const formTime = (time: string) => {
  return dayjs(time).format(`YYYY年MM月DD日`)
}
const props = defineProps<{
  list: questDetail
}>()
</script>

<style lang="scss" scoped>
.questitem-page {
  padding: 15px 10px;
  border-bottom: 1px solid #eeeaea;
}
.questitem {
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
}
</style>
