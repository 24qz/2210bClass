<template>
  <div>
    <div style="padding: 0.6rem; width: 100%; box-sizing: border-box">
      <div style="display: flex; align-items: center">
        <div>
          <van-image
            round
            width="3rem"
            height="3rem"
            :src="
              list.userImage == null ? 'http://m.mengxuegu.com/static/logo.png' : list.userImage
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
            <span>{{ list.nickName }}</span>
            <span>{{ formTime(list.createDate) }}</span>
          </div>
          <div>
            {{ list.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Comment } from '@/types/course'
import dayjs from 'dayjs'
const formTime = (time: string) => {
  return dayjs(time).format(`YYYY年MM月DD日`)
}
const props = defineProps<{
  list: Comment
}>()
</script>

<style lang="scss" scoped></style>
